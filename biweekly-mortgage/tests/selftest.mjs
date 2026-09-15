import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { monthlyPayment, amortizePeriods, biweeklyPlan } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b} (±${eps})`);

check('monthlyPayment matches the amortization formula', () => {
  near(monthlyPayment(200000, 5, 30), 1073.64, 0.02);
});

check('monthlyPayment with 0% is principal / months', () => {
  near(monthlyPayment(120000, 0, 10), 1000, 1e-9);
});

check('amortizePeriods reproduces the loan term for the standard payment', () => {
  const M = monthlyPayment(300000, 6, 30);
  const r = amortizePeriods(300000, 6 / 100 / 12, M);
  assert.ok(r.periods >= 359 && r.periods <= 360); // lands on the 30-year term
});

check('amortizePeriods 0% = principal / payment periods', () => {
  const r = amortizePeriods(1200, 0, 100);
  assert.equal(r.periods, 12);
  near(r.totalInterest, 0, 1e-9);
});

check('biweekly pays off in fewer equivalent months than monthly', () => {
  const p = biweeklyPlan(300000, 6.5, 30);
  assert.ok(p.biweeklyMonths < p.monthlyMonths);
  assert.ok(p.monthlyMonths >= 359 && p.monthlyMonths <= 360);
});

check('biweekly saves interest at a positive rate', () => {
  const p = biweeklyPlan(300000, 6.5, 30);
  assert.ok(p.interestSaved > 0);
  assert.ok(p.biweeklyInterest < p.monthlyInterest);
});

check('the biweekly payment is half the monthly payment', () => {
  const p = biweeklyPlan(300000, 6.5, 30);
  near(p.biweeklyPayment, p.monthlyPayment / 2, 0.02);
});

check('months saved is positive and consistent', () => {
  const p = biweeklyPlan(250000, 7, 30);
  near(p.monthsSaved, p.monthlyMonths - p.biweeklyMonths, 1e-6);
  assert.ok(p.monthsSaved > 0);
});

check('a larger loan saves more absolute interest', () => {
  const small = biweeklyPlan(100000, 6, 30);
  const big = biweeklyPlan(500000, 6, 30);
  assert.ok(big.interestSaved > small.interestSaved);
});

check('validation', () => {
  assert.throws(() => monthlyPayment(0, 6, 30), /loan amount must be positive/);
  assert.throws(() => monthlyPayment(100000, 6, 0), /term must be positive/);
  assert.throws(() => amortizePeriods(100000, 0.01, 100), /too small to cover interest/);
});

console.log(`\n${n} checks passed.`);
