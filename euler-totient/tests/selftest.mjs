import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { gcd, isCoprime, primeFactors, totient } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('small totient values', () => {
  assert.deepEqual([1, 2, 3, 4, 5, 6, 9, 10, 12].map(totient), [1, 1, 2, 2, 4, 2, 6, 4, 4]);
});

check('φ(36) = 12', () => {
  assert.equal(totient(36), 12);
});

check('φ(p) = p − 1 for primes', () => {
  for (const p of [2, 3, 5, 7, 13, 97, 101]) assert.equal(totient(p), p - 1);
});

check('φ(pᵏ) = pᵏ − pᵏ⁻¹ for prime powers', () => {
  assert.equal(totient(8), 4);   // 2^3 - 2^2
  assert.equal(totient(9), 6);   // 3^2 - 3
  assert.equal(totient(16), 8);
  assert.equal(totient(27), 18);
});

check('multiplicative for coprime factors: φ(15) = φ(3)·φ(5)', () => {
  assert.equal(totient(15), totient(3) * totient(5)); // 2*4 = 8
  assert.equal(totient(15), 8);
});

check("Gauss: sum of φ(d) over divisors of n equals n", () => {
  for (const N of [12, 36, 100]) {
    let s = 0;
    for (let d = 1; d <= N; d++) if (N % d === 0) s += totient(d);
    assert.equal(s, N);
  }
});

check('prime factorization', () => {
  assert.deepEqual(primeFactors(360), { 2: 3, 3: 2, 5: 1 });
  assert.deepEqual(primeFactors(97), { 97: 1 });
  assert.deepEqual(primeFactors(1), {});
});

check('gcd and coprimality', () => {
  assert.equal(gcd(12, 8), 4);
  assert.equal(isCoprime(8, 15), true);
  assert.equal(isCoprime(6, 9), false);
  assert.equal(isCoprime(1, 1), true);
});

check('φ(1) = 1', () => {
  assert.equal(totient(1), 1);
});

check('validation: non-positive and non-integer throw', () => {
  assert.throws(() => totient(0), /positive integer/);
  assert.throws(() => totient(-5), /positive integer/);
  assert.throws(() => totient(2.5), /positive integer/);
  assert.throws(() => primeFactors(0), /positive integer/);
});

console.log(`\n${n} checks passed.`);
