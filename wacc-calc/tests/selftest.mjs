import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { wacc, analyze } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, tol = 1e-9) => assert.ok(Math.abs(a - b) <= tol, `${a} not within ${tol} of ${b}`);

const base = { equity: 600000, debt: 400000, costEquity: 0.10, costDebt: 0.05, taxRate: 0.30 };

check('classic worked example = 7.4%', () => {
  near(wacc(base), 0.074);
});

check('capital-structure weights sum to 1', () => {
  const r = analyze(base);
  near(r.weightEquity, 0.6);
  near(r.weightDebt, 0.4);
  near(r.weightEquity + r.weightDebt, 1);
});

check('all-equity firm: WACC equals cost of equity', () => {
  near(wacc({ equity: 1000, debt: 0, costEquity: 0.12, costDebt: 0.06, taxRate: 0.3 }), 0.12);
});

check('all-debt firm: WACC equals after-tax cost of debt', () => {
  near(wacc({ equity: 0, debt: 1000, costEquity: 0.12, costDebt: 0.06, taxRate: 0.25 }), 0.06 * 0.75);
});

check('zero tax removes the debt shield', () => {
  near(wacc({ ...base, taxRate: 0 }), 0.6 * 0.10 + 0.4 * 0.05);
});

check('after-tax cost of debt applies (1 - tax)', () => {
  near(analyze(base).afterTaxCostDebt, 0.05 * 0.70);
});

check('a higher cost of equity raises WACC', () => {
  assert.ok(wacc({ ...base, costEquity: 0.15 }) > wacc(base));
});

check('total capital is E + D', () => {
  assert.equal(analyze(base).totalCapital, 1000000);
});

check('analyze reports every field', () => {
  const r = analyze(base);
  assert.deepEqual(Object.keys(r).sort(), ['afterTaxCostDebt', 'totalCapital', 'wacc', 'weightDebt', 'weightEquity']);
  near(r.wacc, 0.074);
});

check('validation: no capital, negatives, and tax out of range throw', () => {
  assert.throws(() => wacc({ equity: 0, debt: 0, costEquity: 0.1, costDebt: 0.05, taxRate: 0.3 }), /total capital/);
  assert.throws(() => wacc({ equity: -1, debt: 100, costEquity: 0.1, costDebt: 0.05, taxRate: 0.3 }), /equity must be zero or more/);
  assert.throws(() => wacc({ ...base, taxRate: 1.5 }), /between 0 and 1/);
});

console.log(`\n${n} checks passed.`);
