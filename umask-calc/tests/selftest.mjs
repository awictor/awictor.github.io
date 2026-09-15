import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { parseUmask, resultPerms, toOctal, toSymbolic, fileDefault, dirDefault } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('parseUmask reads octal, tolerates leading zeros', () => {
  assert.equal(parseUmask('022'), 0o022);
  assert.equal(parseUmask('22'), 0o022);
  assert.equal(parseUmask('0022'), 0o022);
  assert.equal(parseUmask('077'), 0o077);
});

check('umask 022 → files 644, dirs 755', () => {
  const u = parseUmask('022');
  assert.equal(toOctal(fileDefault(u)), '644');
  assert.equal(toOctal(dirDefault(u)), '755');
  assert.equal(toSymbolic(fileDefault(u)), 'rw-r--r--');
  assert.equal(toSymbolic(dirDefault(u)), 'rwxr-xr-x');
});

check('umask 077 → files 600, dirs 700', () => {
  const u = parseUmask('077');
  assert.equal(toOctal(fileDefault(u)), '600');
  assert.equal(toOctal(dirDefault(u)), '700');
  assert.equal(toSymbolic(dirDefault(u)), 'rwx------');
});

check('umask 002 → files 664, dirs 775', () => {
  const u = parseUmask('002');
  assert.equal(toOctal(fileDefault(u)), '664');
  assert.equal(toOctal(dirDefault(u)), '775');
});

check('umask 000 → files 666, dirs 777', () => {
  const u = parseUmask('000');
  assert.equal(toOctal(fileDefault(u)), '666');
  assert.equal(toOctal(dirDefault(u)), '777');
});

check('umask 027 → files 640, dirs 750', () => {
  const u = parseUmask('027');
  assert.equal(toOctal(fileDefault(u)), '640');
  assert.equal(toOctal(dirDefault(u)), '750');
});

check('resultPerms = base AND NOT umask', () => {
  assert.equal(resultPerms(0o666, 0o022), 0o644);
  assert.equal(resultPerms(0o777, 0o022), 0o755);
});

check('toSymbolic maps rwx bits', () => {
  assert.equal(toSymbolic(0o755), 'rwxr-xr-x');
  assert.equal(toSymbolic(0o644), 'rw-r--r--');
  assert.equal(toSymbolic(0o000), '---------');
  assert.equal(toSymbolic(0o777), 'rwxrwxrwx');
});

check('result never grants a bit the umask removes', () => {
  const u = parseUmask('027');
  assert.equal(fileDefault(u) & u, 0);
  assert.equal(dirDefault(u) & u, 0);
});

check('validation', () => {
  assert.throws(() => parseUmask('888'), /octal/);
  assert.throws(() => parseUmask('xyz'), /octal/);
  assert.throws(() => parseUmask('1000'), /out of range/); // > 777
  assert.throws(() => parseUmask(''), /octal/);
});

console.log(`\n${n} checks passed.`);
