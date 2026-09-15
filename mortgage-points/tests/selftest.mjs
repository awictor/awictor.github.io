import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { monthlyPayment, pointsCost, buydownAnalysis } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b} (±${eps})`);

check('monthlyPayment matches the amortization formula', () => {
  near(monthlyPayment(200000, 6, 30), 1199.10, 0.02);
});

check('monthlyPayment with 0% is principal / months', () => {
  near(monthlyPayment(120000, 0, 10), 1000, 1e-9);
});

check('pointsCost is 1% of the loan per point', () => {
  near(pointsCost(300000, 2), 6000, 1e-9);
  near(pointsCost(400000, 0.5), 2000, 1e-9);
  near(pointsCost(400000, 0), 0, 1e-9);
});

check('a buydown produces positive monthly savings', () => {
  const a = buydownAnalysis(400000, 30, 7, 6.5, 2);
  assert.ok(a.monthlySavings > 0);
  assert.ok(a.payBuy < a.payBase);
});

check('break-even = cost / monthly savings', () => {
  const a = buydownAnalysis(400000, 30, 7, 6.5, 2);
  near(a.breakevenMonths, a.cost / a.monthlySavings, 1e-6);
});

check('no rate reduction means infinite break-even', () => {
  const a = buydownAnalysis(400000, 30, 6.5, 6.5, 2);
  assert.equal(a.breakevenMonths, Infinity);
  assert.ok(a.monthlySavings <= 0);
});

check('net saved over term = monthly savings * months - cost', () => {
  const a = buydownAnalysis(400000, 30, 7, 6.5, 2);
  near(a.totalSaved, a.monthlySavings * 360 - a.cost, 1e-6);
});

check('a bigger rate cut saves more per month', () => {
  const small = buydownAnalysis(400000, 30, 7, 6.75, 1);
  const big = buydownAnalysis(400000, 30, 7, 6, 1);
  assert.ok(big.monthlySavings > small.monthlySavings);
});

check('more points (same rate cut) means a longer break-even', () => {
  const cheap = buydownAnalysis(400000, 30, 7, 6.5, 1);
  const pricey = buydownAnalysis(400000, 30, 7, 6.5, 3);
  assert.ok(pricey.cost > cheap.cost);
  assert.ok(pricey.breakevenMonths > cheap.breakevenMonths);
});

check('validation', () => {
  assert.throws(() => monthlyPayment(100000, 6, 0), /term must be positive/);
  assert.throws(() => pointsCost(100000, -1), /points must be non-negative/);
});

console.log(`\n${n} checks passed.`);
