import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { MAX_N, catalan, sequence, isCatalan } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('the first Catalan numbers', () => {
  assert.deepEqual([0, 1, 2, 3, 4, 5, 6].map(catalan), [1, 1, 2, 5, 14, 42, 132]);
});

check('C(10) = 16796', () => {
  assert.equal(catalan(10), 16796);
});

check('C(15) and C(20)', () => {
  assert.equal(catalan(15), 9694845);
  assert.equal(catalan(20), 6564120420);
});

check('sequence lists the first N terms', () => {
  assert.deepEqual(sequence(6), [1, 1, 2, 5, 14, 42]);
  assert.deepEqual(sequence(1), [1]);
  assert.deepEqual(sequence(0), []);
});

check('matches the binomial formula C(2n,n)/(n+1)', () => {
  const comb = (a, b) => { b = Math.min(b, a - b); let c = 1; for (let i = 0; i < b; i++) c = c * (a - i) / (i + 1); return Math.round(c); };
  for (let i = 0; i <= 25; i++) assert.equal(catalan(i), comb(2 * i, i) / (i + 1));
});

check('satisfies the recurrence C(n+1) = C(n)*2*(2n+1)/(n+2)', () => {
  for (let i = 0; i < 25; i++) assert.equal(catalan(i + 1), Math.round(catalan(i) * 2 * (2 * i + 1) / (i + 2)));
});

check('isCatalan recognizes members', () => {
  for (const x of [1, 2, 5, 14, 42, 132, 429, 16796]) assert.equal(isCatalan(x), true);
});

check('isCatalan rejects non-members', () => {
  for (const x of [3, 4, 6, 13, 43, 100]) assert.equal(isCatalan(x), false);
});

check('C(30) is exact and the max supported', () => {
  assert.equal(catalan(30), 3814986502092304);
  assert.ok(catalan(30) <= Number.MAX_SAFE_INTEGER);
  assert.equal(MAX_N, 30);
});

check('validation: bad index/count and over-max throw', () => {
  assert.throws(() => catalan(-1), /non-negative integer/);
  assert.throws(() => catalan(2.5), /non-negative integer/);
  assert.throws(() => catalan(31), /too large/);
  assert.equal(isCatalan(2.5), false);
});

console.log(`\n${n} checks passed.`);
