import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { MAX_N, fib, sequence, isFibonacci } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('base cases and known terms', () => {
  assert.equal(fib(0), 0);
  assert.equal(fib(1), 1);
  assert.equal(fib(2), 1);
  assert.equal(fib(10), 55);
  assert.equal(fib(20), 6765);
});

check('the recurrence holds', () => {
  for (let i = 2; i <= 40; i++) assert.equal(fib(i), fib(i - 1) + fib(i - 2));
});

check('sequence lists the first N terms', () => {
  assert.deepEqual(sequence(8), [0, 1, 1, 2, 3, 5, 8, 13]);
  assert.deepEqual(sequence(1), [0]);
  assert.deepEqual(sequence(0), []);
});

check('F(78) is exact and the max supported', () => {
  assert.equal(fib(78), 8944394323791464);
  assert.ok(fib(78) <= Number.MAX_SAFE_INTEGER);
  assert.equal(MAX_N, 78);
});

check('isFibonacci recognizes members', () => {
  for (const x of [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 6765]) assert.equal(isFibonacci(x), true);
});

check('isFibonacci rejects non-members', () => {
  for (const x of [4, 6, 7, 9, 10, 100, 145]) assert.equal(isFibonacci(x), false);
});

check('every generated term is a Fibonacci number', () => {
  for (const x of sequence(30)) assert.equal(isFibonacci(x), true);
});

check('golden-ratio convergence of consecutive terms', () => {
  const phi = (1 + Math.sqrt(5)) / 2;
  assert.ok(Math.abs(fib(30) / fib(29) - phi) < 1e-6);
});

check('isFibonacci handles non-integers and negatives gracefully', () => {
  assert.equal(isFibonacci(2.5), false);
  assert.equal(isFibonacci(-5), false);
});

check('validation: bad index and over-max throw', () => {
  assert.throws(() => fib(-1), /non-negative integer/);
  assert.throws(() => fib(2.5), /non-negative integer/);
  assert.throws(() => fib(79), /too large/);
});

console.log(`\n${n} checks passed.`);
