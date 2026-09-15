import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { curlyQuotes, emDashes, ellipses, typographer, straighten } = globalThis.__t;

// curly glyphs
const LD = '“', RD = '”', LS = '‘', RS = '’', EM = '—', EL = '…';

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('curlyQuotes opens and closes double quotes', () => {
  assert.equal(curlyQuotes('He said "hi" there'), `He said ${LD}hi${RD} there`);
  assert.equal(curlyQuotes('"quoted"'), `${LD}quoted${RD}`);
});

check('curlyQuotes handles single quotes and apostrophes', () => {
  assert.equal(curlyQuotes("go 'in' now"), `go ${LS}in${RS} now`);
  assert.equal(curlyQuotes("it's"), `it${RS}s`);         // apostrophe = closing single
  assert.equal(curlyQuotes("don't stop"), `don${RS}t stop`);
});

check('emDashes collapses runs of hyphens', () => {
  assert.equal(emDashes('a--b'), `a${EM}b`);
  assert.equal(emDashes('a---b'), `a${EM}b`);
  assert.equal(emDashes('single-hyphen'), 'single-hyphen'); // untouched
});

check('ellipses collapses three or more dots', () => {
  assert.equal(ellipses('wait...'), `wait${EL}`);
  assert.equal(ellipses('wait....'), `wait${EL}`);
  assert.equal(ellipses('a.b'), 'a.b'); // untouched
});

check('typographer applies all three by default', () => {
  assert.equal(typographer('"Yes--really..."'), `${LD}Yes${EM}really${EL}${RD}`);
});

check('typographer respects disabled options', () => {
  assert.equal(typographer('a--b', { dashes: false }), 'a--b');
  assert.equal(typographer('wait...', { ellipses: false }), 'wait...');
  assert.equal(typographer('"x"', { quotes: false }), '"x"');
});

check('straighten reverses smart punctuation', () => {
  assert.equal(straighten(`${LD}hi${RD}`), '"hi"');
  assert.equal(straighten(`it${RS}s`), "it's");
  assert.equal(straighten(`a${EM}b`), 'a--b');
  assert.equal(straighten(`wait${EL}`), 'wait...');
});

check('straighten then re-smarten round-trips a quote', () => {
  const smart = typographer('The "quick" fox');
  assert.equal(typographer(straighten(smart)), smart);
});

check('opening quote works at string start and after brackets', () => {
  assert.equal(curlyQuotes('("a")'), `(${LD}a${RD})`);
});

check('non-string input is coerced safely', () => {
  assert.equal(typographer(123), '123');
  assert.equal(straighten(null), 'null');
});

console.log(`\n${n} checks passed.`);
