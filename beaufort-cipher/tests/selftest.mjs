import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { clean, beaufort, beaufortEncrypt, beaufortDecrypt } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('clean keeps only letters, upper-cased', () => {
  assert.equal(clean('De fend!23'), 'DEFEND');
});

check('hand-computed vector: HELLO with key KEY -> DANZQ', () => {
  // c = (key - plain) mod 26
  assert.equal(beaufort('HELLO', 'KEY'), 'DANZQ');
});

check('the cipher is self-reciprocal (an involution)', () => {
  assert.equal(beaufort(beaufort('HELLO', 'KEY'), 'KEY'), 'HELLO');
});

check('encrypt and decrypt are the same operation', () => {
  const ct = beaufortEncrypt('ATTACKATDAWN', 'LEMON');
  assert.equal(beaufortDecrypt('ATTACKATDAWN', 'LEMON'), ct);
  assert.equal(beaufortDecrypt(ct, 'LEMON'), 'ATTACKATDAWN');
});

check('round-trips for several messages and keys', () => {
  for (const [pt, key] of [['DEFENDTHEEASTWALL', 'FORTIFICATION'], ['A', 'Z'], ['THEQUICKBROWNFOX', 'KEY'], ['SECRET', 'A']]) {
    assert.equal(beaufort(beaufort(pt, key), key), pt);
  }
});

check('non-letters are stripped before enciphering', () => {
  assert.equal(beaufort('he-llo', 'key'), 'DANZQ');
});

check('keyword is case-insensitive', () => {
  assert.equal(beaufort('HELLO', 'key'), beaufort('HELLO', 'KEY'));
});

check('the keyword repeats over a longer message', () => {
  // key length 1 repeats: with key 'A', out = (0 - p) mod 26 = (-p) mod 26
  assert.equal(beaufort('ABC', 'A'), 'AZY'); // A->A(0), B->(0-1)=25=Z, C->(0-2)=24=Y
});

check('length is preserved', () => {
  assert.equal(beaufort('ATTACKATDAWN', 'LEMON').length, 'ATTACKATDAWN'.length);
});

check('validation: empty keyword throws', () => {
  assert.throws(() => beaufort('HELLO', ''), /at least one letter/);
  assert.throws(() => beaufort('HELLO', '123'), /at least one letter/);
});

console.log(`\n${n} checks passed.`);
