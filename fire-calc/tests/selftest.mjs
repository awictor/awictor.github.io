import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { fireNumber, savingsRate, yearsToFI } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b} (±${eps})`);

check('fireNumber applies the withdrawal rate', () => {
  assert.equal(fireNumber(40000, 4), 1000000);       // 4% rule
  near(fireNumber(40000, 3.5), 1142857.14, 0.5);
  assert.equal(fireNumber(0, 4), 0);
});

check('fireNumber validation', () => {
  assert.throws(() => fireNumber(40000, 0), /withdrawal rate/);
  assert.throws(() => fireNumber(-1, 4), /spending/);
  assert.throws(() => fireNumber('x', 4), /numbers/);
});

check('savingsRate', () => {
  near(savingsRate(100000, 60000), 0.4, 1e-9);
  near(savingsRate(50000, 50000), 0, 1e-9);
  assert.ok(savingsRate(50000, 60000) < 0); // spending more than income
});

check('savingsRate validation', () => {
  assert.throws(() => savingsRate(0, 100), /income/);
  assert.throws(() => savingsRate('x', 100), /numbers/);
});

check('yearsToFI with zero return is linear', () => {
  assert.equal(yearsToFI(0, 20000, 0, 500000), 25);
  assert.equal(yearsToFI(100000, 20000, 0, 500000), 20);
});

check('yearsToFI already at target is 0', () => {
  assert.equal(yearsToFI(1000000, 30000, 5, 1000000), 0);
  assert.equal(yearsToFI(1200000, 0, 5, 1000000), 0);
});

check('yearsToFI with compounding return (annuity solve)', () => {
  // k = 30000/0.05 = 600000; x = (1,000,000+k)/(100,000+k) = 1.6M/700k
  // n = ln(2.2857)/ln(1.05) ≈ 16.94
  near(yearsToFI(100000, 30000, 5, 1000000), 16.94, 0.05);
});

check('yearsToFI pure growth, no contributions', () => {
  // ln(10)/ln(1.05) ≈ 47.19
  near(yearsToFI(100000, 0, 5, 1000000), 47.19, 0.05);
});

check('yearsToFI is Infinity when it can never be reached', () => {
  assert.equal(yearsToFI(0, 0, 0, 500000), Infinity);
  assert.equal(yearsToFI(50000, 0, 0, 500000), Infinity);
});

check('more savings reaches FI sooner (monotonic)', () => {
  const a = yearsToFI(50000, 20000, 5, 1000000);
  const b = yearsToFI(50000, 40000, 5, 1000000);
  assert.ok(b < a);
});

console.log(`\n${n} checks passed.`);
