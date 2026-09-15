import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { gcd, lcm, gcdAll, lcmAll, parseNumbers } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('gcd basics', () => {
  assert.equal(gcd(12, 18), 6);
  assert.equal(gcd(48, 36), 12);
  assert.equal(gcd(1071, 462), 21); // Euclid's example
});

check('gcd with zero returns the other value', () => {
  assert.equal(gcd(0, 5), 5);
  assert.equal(gcd(7, 0), 7);
  assert.equal(gcd(0, 0), 0);
});

check('coprime numbers have gcd 1', () => {
  assert.equal(gcd(17, 5), 1);
  assert.equal(gcd(9, 28), 1);
});

check('lcm basics', () => {
  assert.equal(lcm(4, 6), 12);
  assert.equal(lcm(21, 6), 42);
  assert.equal(lcm(3, 5), 15);
});

check('gcd is symmetric', () => {
  assert.equal(gcd(18, 12), gcd(12, 18));
  assert.equal(lcm(6, 4), lcm(4, 6));
});

check('gcd(a,b) * lcm(a,b) = a * b', () => {
  for (const [a, b] of [[12, 18], [21, 6], [100, 80], [7, 13]]) {
    assert.equal(gcd(a, b) * lcm(a, b), a * b);
  }
});

check('gcdAll over multiple numbers', () => {
  assert.equal(gcdAll([12, 18, 24]), 6);
  assert.equal(gcdAll([100, 80, 60]), 20);
});

check('lcmAll over multiple numbers', () => {
  assert.equal(lcmAll([4, 6, 8]), 24);
  assert.equal(lcmAll([2, 3, 4, 5]), 60);
});

check('single-element arrays return that element', () => {
  assert.equal(gcdAll([42]), 42);
  assert.equal(lcmAll([42]), 42);
  assert.equal(parseNumbers('12, 18  24').length, 3);
});

check('validation: negatives, non-integers, empty, and lcm-with-zero throw', () => {
  assert.throws(() => gcd(-4, 8), /non-negative integer/);
  assert.throws(() => gcd(2.5, 8), /non-negative integer/);
  assert.throws(() => lcm(0, 5), /positive integers/);
  assert.throws(() => gcdAll([]), /at least one/);
});

console.log(`\n${n} checks passed.`);
