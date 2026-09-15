import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { monthlyPayment, amortize, payoffComparison } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b} (±${eps})`);

check('monthlyPayment matches the amortization formula', () => {
  near(monthlyPayment(300000, 6, 30), 1798.65, 0.02);
});

check('monthlyPayment with 0% is principal / months', () => {
  near(monthlyPayment(120000, 0, 10), 1000, 1e-9);
});

check('amortize reproduces the term for the standard payment', () => {
  const p = monthlyPayment(300000, 6, 30);
  const r = amortize(300000, 6, p);
  assert.ok(r.months >= 359 && r.months <= 360);
});

check('amortize 0% = principal / payment periods', () => {
  const r = amortize(12000, 0, 1000);
  assert.equal(r.months, 12);
  near(r.totalInterest, 0, 1e-9);
});

check('an extra payment shortens the loan', () => {
  const p = payoffComparison(300000, 6, 30, 200);
  assert.ok(p.accelMonths < p.baseMonths);
  assert.ok(p.monthsSaved > 0);
});

check('an extra payment saves interest', () => {
  const p = payoffComparison(300000, 6, 30, 200);
  assert.ok(p.accelInterest < p.baseInterest);
  assert.ok(p.interestSaved > 0);
});

check('zero extra equals the baseline', () => {
  const p = payoffComparison(300000, 6, 30, 0);
  assert.equal(p.accelMonths, p.baseMonths);
  near(p.interestSaved, 0, 0.5);
});

check('a bigger extra pays off sooner', () => {
  const small = payoffComparison(300000, 6, 30, 100);
  const big = payoffComparison(300000, 6, 30, 500);
  assert.ok(big.accelMonths < small.accelMonths);
});

check('the extra payment equals base + extra', () => {
  const p = payoffComparison(300000, 6, 30, 200);
  near(p.extraPayment, p.basePayment + 200, 0.02);
});

check('validation', () => {
  assert.throws(() => monthlyPayment(0, 6, 30), /loan must be positive/);
  assert.throws(() => monthlyPayment(100000, 6, 0), /term must be positive/);
  assert.throws(() => amortize(100000, 6, 100), /too small to cover interest/);
  assert.throws(() => payoffComparison(100000, 6, 30, -1), /non-negative/);
});

console.log(`\n${n} checks passed.`);
