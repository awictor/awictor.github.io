import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { monthlyPayment, refinance } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b} (±${eps})`);

check('monthly payment (100k, 6%, 30y) ≈ 599.55', () => {
  near(monthlyPayment(100000, 6, 30), 599.55, 0.01);
});

check('zero-rate payment is principal / months', () => {
  near(monthlyPayment(120000, 0, 10), 1000, 1e-9);
});

check('lower rate lowers the payment', () => {
  assert.ok(monthlyPayment(300000, 5, 30) < monthlyPayment(300000, 6.5, 30));
});

check('break-even = closing costs / monthly savings (paid upfront)', () => {
  const r = refinance({ balance: 300000, currentRate: 6.5, currentTermYears: 27, newRate: 5.0, newTermYears: 30, closingCosts: 6000 });
  assert.ok(r.monthlySavings > 0);
  near(r.breakEvenMonths, 6000 / r.monthlySavings, 1e-9);
});

check('monthly savings = current payment − new payment', () => {
  const r = refinance({ balance: 250000, currentRate: 7, currentTermYears: 25, newRate: 5.5, newTermYears: 30, closingCosts: 4000 });
  near(r.monthlySavings, r.currentPayment - r.newPayment, 1e-9);
});

check('no savings when new rate/term equal current → break-even is Infinity', () => {
  const r = refinance({ balance: 200000, currentRate: 6, currentTermYears: 30, newRate: 6, newTermYears: 30, closingCosts: 3000 });
  near(r.monthlySavings, 0, 1e-6);
  assert.equal(r.breakEvenMonths, Infinity);
});

check('higher new rate → negative savings, break-even Infinity', () => {
  const r = refinance({ balance: 200000, currentRate: 5, currentTermYears: 30, newRate: 7, newTermYears: 30, closingCosts: 3000 });
  assert.ok(r.monthlySavings < 0);
  assert.equal(r.breakEvenMonths, Infinity);
});

check('rolling in closing costs raises the new payment', () => {
  const base = { balance: 300000, currentRate: 6.5, currentTermYears: 27, newRate: 5, newTermYears: 30, closingCosts: 6000 };
  const upfront = refinance({ ...base, rollIn: false });
  const rolled = refinance({ ...base, rollIn: true });
  assert.ok(rolled.newPayment > upfront.newPayment);
  assert.equal(rolled.breakEvenMonths, 0); // no upfront cost to recoup when rolled in
});

check('lifetime interest change accounts for closing costs', () => {
  const r = refinance({ balance: 300000, currentRate: 6.5, currentTermYears: 27, newRate: 5, newTermYears: 30, closingCosts: 6000 });
  near(r.lifetimeSavings, r.totalInterestCurrent - (r.totalInterestNew + 6000), 1e-6);
});

check('validation throws on non-numeric input', () => {
  assert.throws(() => monthlyPayment('x', 6, 30), /numbers/);
  assert.throws(() => refinance({ balance: 'y', currentRate: 6, currentTermYears: 30, newRate: 5, newTermYears: 30 }), /numbers/);
});

console.log(`\n${n} checks passed.`);
