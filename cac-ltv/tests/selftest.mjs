import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { cac, avgLifetimeMonths, ltv, ltvCacRatio, paybackMonths, analyze } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, tol = 1e-9) => assert.ok(Math.abs(a - b) <= tol, `${a} not within ${tol} of ${b}`);

const base = { spend: 100000, customers: 500, arpa: 100, grossMargin: 0.8, monthlyChurn: 0.05 };

check('CAC = spend / customers', () => {
  assert.equal(cac(100000, 500), 200);
  assert.equal(cac(50000, 250), 200);
});

check('average lifetime = 1 / churn', () => {
  near(avgLifetimeMonths(0.05), 20);
  near(avgLifetimeMonths(0.1), 10);
});

check('LTV = ARPA * margin / churn', () => {
  near(ltv(100, 0.8, 0.05), 1600);
  near(ltv(50, 0.7, 0.02), 50 * 0.7 / 0.02);
});

check('LTV equals monthly gross profit * lifetime', () => {
  near(ltv(100, 0.8, 0.05), 100 * 0.8 * avgLifetimeMonths(0.05));
});

check('LTV:CAC ratio', () => {
  near(ltvCacRatio(1600, 200), 8);
  near(ltvCacRatio(600, 200), 3);
});

check('CAC payback = CAC / monthly gross profit', () => {
  near(paybackMonths(200, 100, 0.8), 2.5);
});

check('analyze worked example', () => {
  const r = analyze(base);
  assert.equal(r.cac, 200);
  near(r.ltv, 1600);
  near(r.ratio, 8);
  near(r.lifetimeMonths, 20);
  near(r.paybackMonths, 2.5);
});

check('lower churn raises LTV and the ratio', () => {
  assert.ok(ltv(100, 0.8, 0.02) > ltv(100, 0.8, 0.05));
  assert.ok(analyze({ ...base, monthlyChurn: 0.02 }).ratio > analyze(base).ratio);
});

check('higher CAC lowers the ratio and lengthens payback', () => {
  const dear = analyze({ ...base, spend: 300000 });
  assert.ok(dear.ratio < analyze(base).ratio);
  assert.ok(dear.paybackMonths > analyze(base).paybackMonths);
});

check('validation: non-positive and out-of-range rates throw', () => {
  assert.throws(() => cac(0, 500), /spend must be a positive/);
  assert.throws(() => ltv(100, 1.5, 0.05), /gross margin must be between 0 and 1/);
  assert.throws(() => ltv(100, 0.8, 0), /churn must be between 0 and 1/);
  assert.throws(() => avgLifetimeMonths(2), /churn must be between 0 and 1/);
});

console.log(`\n${n} checks passed.`);
