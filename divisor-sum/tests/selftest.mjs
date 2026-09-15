import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { divisors, divisorCount, divisorSum, aliquotSum, classify } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('divisors are listed in order', () => {
  assert.deepEqual(divisors(12), [1, 2, 3, 4, 6, 12]);
  assert.deepEqual(divisors(28), [1, 2, 4, 7, 14, 28]);
  assert.deepEqual(divisors(1), [1]);
});

check('perfect squares have an odd number of divisors', () => {
  assert.equal(divisorCount(36), 9);   // 1,2,3,4,6,9,12,18,36
  assert.equal(divisorCount(16), 5);
  assert.equal(divisorCount(12), 6);
});

check('divisor sum σ(n)', () => {
  assert.equal(divisorSum(12), 28);
  assert.equal(divisorSum(28), 56);
  assert.equal(divisorSum(1), 1);
});

check('σ is multiplicative for coprime factors', () => {
  assert.equal(divisorSum(12), divisorSum(4) * divisorSum(3)); // 7 * 4
  assert.equal(divisorSum(15), divisorSum(3) * divisorSum(5)); // 4 * 6
});

check('σ(prime) = prime + 1', () => {
  for (const p of [2, 3, 7, 13, 101]) assert.equal(divisorSum(p), p + 1);
});

check('aliquot sum = σ(n) − n', () => {
  assert.equal(aliquotSum(12), 16);
  assert.equal(aliquotSum(6), 6);
  assert.equal(aliquotSum(7), 1);
  assert.equal(aliquotSum(1), 0);
});

check('perfect numbers', () => {
  for (const p of [6, 28, 496, 8128]) assert.equal(classify(p), 'perfect');
});

check('abundant and deficient classification', () => {
  assert.equal(classify(12), 'abundant');
  assert.equal(classify(18), 'abundant');
  assert.equal(classify(7), 'deficient');
  assert.equal(classify(1), 'deficient');
});

check('every prime is deficient; powers of two are deficient', () => {
  for (const p of [2, 5, 11, 97]) assert.equal(classify(p), 'deficient');
  for (const k of [2, 4, 8, 16, 32]) assert.equal(classify(k), 'deficient');
});

check('validation: non-positive and non-integer throw', () => {
  assert.throws(() => divisors(0), /positive integer/);
  assert.throws(() => divisorSum(-5), /positive integer/);
  assert.throws(() => classify(2.5), /positive integer/);
});

console.log(`\n${n} checks passed.`);
