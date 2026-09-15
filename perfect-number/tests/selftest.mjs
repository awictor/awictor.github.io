import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { properDivisors, divisorSum, classify, isPerfect, perfectUpTo } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('proper divisors', () => {
  assert.deepEqual(properDivisors(6), [1, 2, 3]);
  assert.deepEqual(properDivisors(28), [1, 2, 4, 7, 14]);
  assert.deepEqual(properDivisors(12), [1, 2, 3, 4, 6]);
  assert.deepEqual(properDivisors(1), []);
});

check('proper divisors of a prime is just [1]', () => {
  assert.deepEqual(properDivisors(13), [1]);
  assert.deepEqual(properDivisors(97), [1]);
});

check('divisor sum', () => {
  assert.equal(divisorSum(6), 6);
  assert.equal(divisorSum(28), 28);
  assert.equal(divisorSum(12), 16);
  assert.equal(divisorSum(8), 7);
});

check('6 and 28 are perfect', () => {
  assert.equal(isPerfect(6), true);
  assert.equal(isPerfect(28), true);
});

check('496 and 8128 are perfect', () => {
  assert.equal(isPerfect(496), true);
  assert.equal(isPerfect(8128), true);
});

check('classify: abundant and deficient', () => {
  assert.equal(classify(12), 'abundant');
  assert.equal(classify(18), 'abundant');
  assert.equal(classify(8), 'deficient');
  assert.equal(classify(1), 'deficient');
});

check('classify: perfect', () => {
  for (const p of [6, 28, 496, 8128]) assert.equal(classify(p), 'perfect');
});

check('perfectUpTo lists the known small perfect numbers', () => {
  assert.deepEqual(perfectUpTo(10000), [6, 28, 496, 8128]);
});

check('divisor sum equals sum of properDivisors', () => {
  for (const x of [1, 6, 12, 28, 100, 496]) {
    assert.equal(divisorSum(x), properDivisors(x).reduce((s, d) => s + d, 0));
  }
});

check('validation: values below 1 and non-integers throw', () => {
  assert.throws(() => properDivisors(0), /1 or more/);
  assert.throws(() => classify(-5), /1 or more/);
  assert.throws(() => divisorSum(2.5), /1 or more/);
});

console.log(`\n${n} checks passed.`);
