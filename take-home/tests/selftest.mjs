import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { ficaTax, takeHome, perPeriod } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b} (±${eps})`);

check('FICA below the wage base is 7.65%', () => {
  near(ficaTax(100000, 168600), 7650, 1e-6); // 6200 + 1450
  near(ficaTax(50000, 168600), 3825, 1e-6);
});

check('FICA caps the Social Security portion at the wage base', () => {
  // gross 200000: SS on 168600 (=10453.2) + Medicare on 200000 (=2900) = 13353.2
  near(ficaTax(200000, 168600), 168600 * 0.062 + 200000 * 0.0145, 1e-6);
});

check('takeHome basic (no deductions, high wage base so no SS cap)', () => {
  const th = takeHome(100000, { preTaxDeductions: 0, effectiveTaxRatePct: 15, ssWageBase: 1e9 });
  near(th.incomeTax, 15000, 1e-6);
  near(th.fica, 7650, 1e-6);
  near(th.net, 100000 - 15000 - 7650, 1e-6);
});

check('pre-tax deductions reduce taxable pay and net', () => {
  const th = takeHome(100000, { preTaxDeductions: 10000, effectiveTaxRatePct: 15, ssWageBase: 1e9 });
  near(th.taxable, 90000, 1e-6);
  near(th.incomeTax, 13500, 1e-6);
  near(th.net, 100000 - 10000 - 13500 - 7650, 1e-6);
});

check('perPeriod divides the annual amount', () => {
  near(perPeriod(78000, 12), 6500, 1e-9);
  near(perPeriod(78000, 26), 3000, 1e-9);
});

check('a higher tax rate lowers net', () => {
  const a = takeHome(90000, { effectiveTaxRatePct: 10 });
  const b = takeHome(90000, { effectiveTaxRatePct: 25 });
  assert.ok(b.net < a.net);
});

check('zero tax and zero deductions leaves only FICA out', () => {
  const th = takeHome(80000, { preTaxDeductions: 0, effectiveTaxRatePct: 0, ssWageBase: 1e9 });
  near(th.net, 80000 - ficaTax(80000, 1e9), 1e-6);
});

check('income tax applies to pay after pre-tax deductions', () => {
  const th = takeHome(100000, { preTaxDeductions: 20000, effectiveTaxRatePct: 20, ssWageBase: 1e9 });
  near(th.incomeTax, 80000 * 0.20, 1e-6);
});

check('FICA is charged on gross, not on taxable', () => {
  const a = takeHome(100000, { preTaxDeductions: 0, ssWageBase: 1e9 });
  const b = takeHome(100000, { preTaxDeductions: 20000, ssWageBase: 1e9 });
  near(a.fica, b.fica, 1e-9); // same gross -> same FICA
});

check('validation', () => {
  assert.throws(() => takeHome(-1, {}), /gross must be non-negative/);
  assert.throws(() => takeHome(50000, { preTaxDeductions: 60000 }), /between 0 and gross/);
  assert.throws(() => takeHome(50000, { effectiveTaxRatePct: 150 }), /0-100/);
  assert.throws(() => perPeriod(1000, 0), /periods must be positive/);
});

console.log(`\n${n} checks passed.`);
