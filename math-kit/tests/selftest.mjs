// Headless regression tests for MathKit pure functions.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');

const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)]
  .map(m => m[1]).sort((a, b) => b.length - a.length)[0];

function el(){ return {value:'',textContent:'',innerHTML:'',style:{},className:'',
  appendChild(){},getAttribute(){return null;},setAttribute(){},removeAttribute(){},
  addEventListener(){},querySelectorAll(){return[];}}; }
globalThis.document = {
  getElementById: () => el(), createElement: () => el(),
  querySelectorAll: () => [], documentElement: el()
};
globalThis.localStorage = { getItem:()=>null, setItem(){}, removeItem(){} };
globalThis.matchMedia = () => ({ matches:false });
globalThis.window = { matchMedia: globalThis.matchMedia };

eval(js.replace('if(typeof module !== \'undefined\') module.exports =',
  'globalThis.__t =') );
const { isPrime, primeFactors, gcd, lcm, factorial, nPr, nCr, fib, divisors } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('isPrime', () => {
  assert.equal(isPrime(2), true);
  assert.equal(isPrime(3), true);
  assert.equal(isPrime(4), false);
  assert.equal(isPrime(17), true);
  assert.equal(isPrime(1), false);
  assert.equal(isPrime(0), false);
  assert.equal(isPrime(-7), false);
  assert.equal(isPrime(97), true);
  assert.equal(isPrime(100), false);
  assert.equal(isPrime(7919), true);
  assert.equal(isPrime(2.5), false);
});

check('primeFactors', () => {
  assert.deepEqual(primeFactors(360), [2,2,2,3,3,5]);
  assert.deepEqual(primeFactors(97), [97]);
  assert.deepEqual(primeFactors(1), []);
  assert.deepEqual(primeFactors(12), [2,2,3]);
  assert.deepEqual(primeFactors(1024), [2,2,2,2,2,2,2,2,2,2]);
});

check('gcd / lcm', () => {
  assert.equal(gcd(12, 18), 6);
  assert.equal(gcd(0, 5), 5);
  assert.equal(gcd(17, 5), 1);
  assert.equal(gcd(-12, 18), 6);
  assert.equal(lcm(4, 6), 12);
  assert.equal(lcm(0, 5), 0);
  assert.equal(lcm(21, 6), 42);
});

check('factorial', () => {
  assert.equal(factorial(0), 1);
  assert.equal(factorial(5), 120);
  assert.equal(factorial(10), 3628800);
  assert.equal(factorial(-1), null);
  assert.equal(factorial(1.5), null);
});

check('nPr', () => {
  assert.equal(nPr(5, 2), 20);
  assert.equal(nPr(5, 0), 1);
  assert.equal(nPr(5, 5), 120);
  assert.equal(nPr(5, 6), null);
  assert.equal(nPr(10, 3), 720);
});

check('nCr', () => {
  assert.equal(nCr(5, 2), 10);
  assert.equal(nCr(10, 3), 120);
  assert.equal(nCr(52, 5), 2598960);
  assert.equal(nCr(6, 6), 1);
  assert.equal(nCr(6, 0), 1);
  assert.equal(nCr(5, 6), null);
});

check('fib', () => {
  assert.equal(fib(0), 0);
  assert.equal(fib(1), 1);
  assert.equal(fib(2), 1);
  assert.equal(fib(10), 55);
  assert.equal(fib(20), 6765);
  assert.equal(fib(-1), null);
});

check('divisors', () => {
  assert.deepEqual(divisors(28), [1,2,4,7,14,28]);
  assert.deepEqual(divisors(1), [1]);
  assert.deepEqual(divisors(12), [1,2,3,4,6,12]);
  assert.deepEqual(divisors(13), [1,13]);
  assert.deepEqual(divisors(0), []);
});

check('perfect number 28 = sum of proper divisors', () => {
  const proper = divisors(28).filter(d => d !== 28);
  assert.equal(proper.reduce((a,b)=>a+b,0), 28);
});

console.log(`\n${n} checks passed.`);
