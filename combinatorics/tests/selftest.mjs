import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { factorial, permutations, combinations } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('factorial basics', () => {
  assert.equal(factorial(0), 1);
  assert.equal(factorial(1), 1);
  assert.equal(factorial(5), 120);
  assert.equal(factorial(10), 3628800);
});

check('permutations: nPr = n!/(n-r)!', () => {
  assert.equal(permutations(5, 2), 20);
  assert.equal(permutations(5, 5), 120);
  assert.equal(permutations(10, 3), 720);
});

check('permutations edge cases', () => {
  assert.equal(permutations(7, 0), 1);
  assert.equal(permutations(0, 0), 1);
});

check('combinations: nCr small cases', () => {
  assert.equal(combinations(5, 2), 10);
  assert.equal(combinations(6, 3), 20);
  assert.equal(combinations(10, 0), 1);
  assert.equal(combinations(10, 10), 1);
});

check('combinations: poker hands and lottery (exact)', () => {
  assert.equal(combinations(52, 5), 2598960);
  assert.equal(combinations(49, 6), 13983816);
});

check('combination symmetry nCr(n,r) = nCr(n,n-r)', () => {
  for (let r = 0; r <= 20; r++) assert.equal(combinations(20, r), combinations(20, 20 - r));
});

check("Pascal's identity", () => {
  const C = (nn, r) => (r > nn ? 0 : combinations(nn, r)); // C(n-1,n) = 0 by convention
  for (let nn = 1; nn <= 25; nn++) for (let r = 1; r <= nn; r++) {
    assert.equal(combinations(nn, r), C(nn - 1, r - 1) + C(nn - 1, r));
  }
});

check('nPr = nCr * r!', () => {
  for (const [nn, r] of [[8, 3], [10, 4], [12, 5]]) {
    assert.equal(permutations(nn, r), combinations(nn, r) * factorial(r));
  }
});

check('combinations equals the factorial formula for small n', () => {
  for (let nn = 0; nn <= 12; nn++) for (let r = 0; r <= nn; r++) {
    assert.equal(combinations(nn, r), factorial(nn) / (factorial(r) * factorial(nn - r)));
  }
});

check('validation: r > n and negatives/non-integers throw', () => {
  assert.throws(() => combinations(3, 5), /r cannot exceed n/);
  assert.throws(() => permutations(3, 5), /r cannot exceed n/);
  assert.throws(() => combinations(-1, 0), /non-negative integer/);
  assert.throws(() => factorial(2.5), /non-negative integer/);
});

console.log(`\n${n} checks passed.`);
