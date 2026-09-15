import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { continuedFraction, convergents, evaluate, toDecimal } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('a simple decimal terminates: 3.25 = [3; 4]', () => {
  assert.deepEqual(continuedFraction(3.25), [3, 4]);
});

check('halves and integers', () => {
  assert.deepEqual(continuedFraction(0.5), [0, 2]);
  assert.deepEqual(continuedFraction(2), [2]);
});

check('415/93 = [4; 2, 6, 7]', () => {
  assert.deepEqual(continuedFraction(415 / 93), [4, 2, 6, 7]);
});

check('π starts [3; 7, 15, 1, 292]', () => {
  assert.deepEqual(continuedFraction(Math.PI, 5), [3, 7, 15, 1, 292]);
});

check("e follows the [2; 1,2,1,1,4,...] pattern", () => {
  assert.deepEqual(continuedFraction(Math.E, 6), [2, 1, 2, 1, 1, 4]);
});

check('convergents of [4; 2, 6, 7] rebuild 415/93', () => {
  assert.deepEqual(convergents([4, 2, 6, 7]), [
    { num: 4, den: 1 }, { num: 9, den: 2 }, { num: 58, den: 13 }, { num: 415, den: 93 }
  ]);
});

check("π's convergents include 22/7 and 355/113", () => {
  const c = convergents([3, 7, 15, 1, 292]);
  assert.deepEqual(c[1], { num: 22, den: 7 });
  assert.deepEqual(c[3], { num: 355, den: 113 });
});

check('evaluate returns the last convergent', () => {
  assert.deepEqual(evaluate([3, 7, 15, 1]), { num: 355, den: 113 });
});

check('355/113 approximates π to six decimals', () => {
  assert.ok(Math.abs(toDecimal([3, 7, 15, 1]) - Math.PI) < 1e-6);
  assert.ok(Math.abs(toDecimal(continuedFraction(3.25)) - 3.25) < 1e-12);
});

check('validation: non-finite value and empty coefficients throw', () => {
  assert.throws(() => continuedFraction(Infinity), /finite number/);
  assert.throws(() => continuedFraction(NaN), /finite number/);
  assert.throws(() => convergents([]), /at least one/);
});

console.log(`\n${n} checks passed.`);
