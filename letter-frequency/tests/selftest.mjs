import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { ENGLISH, letterFrequency, mostCommon } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b} (±${eps})`);

check('counts and total', () => {
  const f = letterFrequency('aaab');
  assert.equal(f.total, 4);
  assert.equal(f.counts.a, 3);
  assert.equal(f.counts.b, 1);
  assert.equal(f.counts.c, 0);
});

check('percentages', () => {
  const f = letterFrequency('aaab');
  const a = f.results.find(r => r.letter === 'a');
  const b = f.results.find(r => r.letter === 'b');
  near(a.pct, 75, 1e-9);
  near(b.pct, 25, 1e-9);
});

check('case-insensitive', () => {
  assert.equal(letterFrequency('Aa').counts.a, 2);
  assert.equal(letterFrequency('ABab').counts.b, 2);
});

check('ignores non-letters', () => {
  const f = letterFrequency('a1 b! c.');
  assert.equal(f.total, 3);
  assert.equal(f.counts.a, 1);
  assert.equal(f.counts.b, 1);
  assert.equal(f.counts.c, 1);
});

check('always reports all 26 letters', () => {
  const f = letterFrequency('abc');
  assert.equal(f.results.length, 26);
  assert.ok(f.results.every(r => typeof r.count === 'number'));
});

check('percentages sum to ~100 when non-empty', () => {
  const f = letterFrequency('the quick brown fox jumps over the lazy dog');
  const sum = f.results.reduce((s, r) => s + r.pct, 0);
  near(sum, 100, 1e-6);
});

check('empty text → total 0, all pct 0', () => {
  const f = letterFrequency('12345 !!!');
  assert.equal(f.total, 0);
  assert.ok(f.results.every(r => r.pct === 0 && r.count === 0));
});

check('most common letter', () => {
  assert.equal(mostCommon('aaabbc'), 'a');
  assert.equal(mostCommon('mississippi'), 'i');   // i=4, s=4 → tie; reduce keeps first max (i before s)
  assert.equal(mostCommon('!!!'), null);
});

check('pangram uses every letter at least once', () => {
  const f = letterFrequency('The quick brown fox jumps over the lazy dog');
  assert.ok(f.results.every(r => r.count >= 1));
});

check('English baseline is attached and ~sums to 100', () => {
  const f = letterFrequency('hello');
  assert.equal(f.results.find(r => r.letter === 'e').english, ENGLISH.e);
  const total = Object.values(ENGLISH).reduce((s, v) => s + v, 0);
  near(total, 100, 1.5);   // standard table ≈ 100
});

console.log(`\n${n} checks passed.`);
