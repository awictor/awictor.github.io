import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { monthlyPayment, maxLoan, maxMonthlyPayment, affordability } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b} (±${eps})`);

check('max monthly payment = income × DTI − other debts', () => {
  near(maxMonthlyPayment(8000, 36, 500), 8000 * 0.36 - 500, 1e-9);   // 2380
  near(maxMonthlyPayment(6000, 36, 500), 1660, 1e-9);
});

check('max payment floors at 0', () => {
  near(maxMonthlyPayment(1000, 36, 5000), 0, 1e-9);
});

check('maxLoan is the inverse of monthlyPayment', () => {
  const p = maxLoan(1660, 6, 30);
  near(monthlyPayment(p, 6, 30), 1660, 1e-6);
});

check('zero-rate maxLoan = payment × months', () => {
  near(maxLoan(1000, 0, 30), 1000 * 360, 1e-9);
});

check('affordability composes payment, loan, and price', () => {
  const r = affordability({ income: 8000, dtiPct: 36, otherDebts: 500, ratePct: 6.5, years: 30, downPayment: 60000 });
  near(r.maxPayment, 2380, 1e-9);
  near(r.maxPrice, r.maxLoan + 60000, 1e-9);
  near(monthlyPayment(r.maxLoan, 6.5, 30), r.maxPayment, 1e-6);
});

check('more income → higher affordable price', () => {
  const base = { dtiPct: 36, otherDebts: 500, ratePct: 6, years: 30, downPayment: 50000 };
  assert.ok(affordability({ ...base, income: 10000 }).maxPrice > affordability({ ...base, income: 6000 }).maxPrice);
});

check('higher rate → lower loan', () => {
  assert.ok(maxLoan(1660, 8, 30) < maxLoan(1660, 4, 30));
});

check('more other debt → lower payment room', () => {
  assert.ok(maxMonthlyPayment(8000, 36, 1500) < maxMonthlyPayment(8000, 36, 500));
});

check('down payment adds directly to price', () => {
  const a = affordability({ income: 8000, dtiPct: 36, otherDebts: 500, ratePct: 6, years: 30, downPayment: 0 });
  const b = affordability({ income: 8000, dtiPct: 36, otherDebts: 500, ratePct: 6, years: 30, downPayment: 40000 });
  near(b.maxPrice - a.maxPrice, 40000, 1e-6);
});

check('validation', () => {
  assert.throws(() => monthlyPayment('x', 6, 30), /numbers/);
  assert.throws(() => maxMonthlyPayment('y', 36, 0), /numbers/);
});

console.log(`\n${n} checks passed.`);
