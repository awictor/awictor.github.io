import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { sieve, primeCount, isPrime, nthPrime } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('primes up to 30', () => {
  assert.deepEqual(sieve(30), [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]);
});

check('small edge cases', () => {
  assert.deepEqual(sieve(0), []);
  assert.deepEqual(sieve(1), []);
  assert.deepEqual(sieve(2), [2]);
  assert.deepEqual(sieve(3), [2, 3]);
});

check('prime counts π(N)', () => {
  assert.equal(primeCount(10), 4);
  assert.equal(primeCount(100), 25);
  assert.equal(primeCount(1000), 168);
  assert.equal(primeCount(10000), 1229);
});

check('isPrime', () => {
  assert.equal(isPrime(2), true);
  assert.equal(isPrime(97), true);
  assert.equal(isPrime(1), false);
  assert.equal(isPrime(0), false);
  assert.equal(isPrime(100), false);
  assert.equal(isPrime(561), false); // Carmichael number, not prime
});

check('sieve output agrees with isPrime', () => {
  const s = new Set(sieve(200));
  for (let k = 2; k <= 200; k++) assert.equal(s.has(k), isPrime(k), `${k}`);
});

check('nth prime (1-indexed)', () => {
  assert.equal(nthPrime(1), 2);
  assert.equal(nthPrime(2), 3);
  assert.equal(nthPrime(10), 29);
  assert.equal(nthPrime(25), 97);
  assert.equal(nthPrime(100), 541);
  assert.equal(nthPrime(1000), 7919);
});

check('nthPrime is consistent with the sieve order', () => {
  const p = sieve(100);
  for (let k = 1; k <= p.length; k++) assert.equal(nthPrime(k), p[k - 1]);
});

check('every sieved value is actually prime and in range', () => {
  const p = sieve(500);
  p.forEach((x, i) => { assert.ok(isPrime(x)); if (i > 0) assert.ok(x > p[i - 1]); });
  assert.ok(p[p.length - 1] <= 500);
});

check('twin primes appear (11,13), (17,19), (29,31)', () => {
  const s = new Set(sieve(50));
  for (const [a, b] of [[11, 13], [17, 19], [29, 31]]) assert.ok(s.has(a) && s.has(b));
});

check('validation: negative/non-integer N and bad k throw', () => {
  assert.throws(() => sieve(-1), /non-negative integer/);
  assert.throws(() => sieve(2.5), /non-negative integer/);
  assert.throws(() => nthPrime(0), /at least 1/);
  assert.throws(() => sieve(1e9), /too large/);
});

console.log(`\n${n} checks passed.`);
