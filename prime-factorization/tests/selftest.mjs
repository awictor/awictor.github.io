import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { primeFactors, factorList, isPrime, divisorCount, factorString } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('primeFactors of 360 = 2^3 * 3^2 * 5', () => {
  assert.deepEqual(primeFactors(360), [[2, 3], [3, 2], [5, 1]]);
});

check('a prime factors to itself', () => {
  assert.deepEqual(primeFactors(17), [[17, 1]]);
  assert.deepEqual(primeFactors(2), [[2, 1]]);
});

check('factorList expands with multiplicity', () => {
  assert.deepEqual(factorList(360), [2, 2, 2, 3, 3, 5]);
  assert.deepEqual(factorList(12), [2, 2, 3]);
});

check('the product of prime factors reconstructs n', () => {
  for (const x of [2, 12, 100, 360, 999, 1000000, 123456]) {
    assert.equal(factorList(x).reduce((p, f) => p * f, 1), x);
  }
});

check('factorString formats with exponents', () => {
  assert.equal(factorString(360), '2^3 × 3^2 × 5');
  assert.equal(factorString(97), '97');
});

check('1,000,000 = 2^6 * 5^6', () => {
  assert.deepEqual(primeFactors(1000000), [[2, 6], [5, 6]]);
});

check('isPrime basics', () => {
  assert.equal(isPrime(1), false);
  assert.equal(isPrime(2), true);
  assert.equal(isPrime(4), false);
  assert.equal(isPrime(97), true);
  assert.equal(isPrime(100), false);
  assert.equal(isPrime(7919), true); // 1000th prime
});

check('isPrime agrees with a single-pair factorization', () => {
  for (let x = 2; x < 200; x++) {
    const single = primeFactors(x).length === 1 && primeFactors(x)[0][1] === 1;
    assert.equal(single, isPrime(x));
  }
});

check('divisorCount = product of (exponent + 1)', () => {
  assert.equal(divisorCount(360), 24); // (3+1)(2+1)(1+1)
  assert.equal(divisorCount(97), 2);
  assert.equal(divisorCount(12), 6);
});

check('validation: values below 2 and non-integers throw', () => {
  assert.throws(() => primeFactors(1), /2 or more/);
  assert.throws(() => primeFactors(0), /2 or more/);
  assert.throws(() => primeFactors(2.5), /2 or more/);
});

console.log(`\n${n} checks passed.`);
