import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { mortgagePayment, remainingBalance, futureValue, totalRentCost, compareRentVsBuy } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b} (±${eps})`);

const BASE = {
  price: 400000, downPct: 20, ratePct: 6.5, termYears: 30, closingPct: 3,
  propTaxPct: 1.1, maintPct: 1, insuranceYr: 1500, hoaMo: 0, apprPct: 3, sellCostPct: 6,
  rent: 2000, rentGrowthPct: 3, rentersInsMo: 15, investReturnPct: 6, years: 7
};

check('mortgagePayment matches the amortization formula', () => {
  near(mortgagePayment(100000, 6, 30), 599.55, 0.01);
});

check('mortgagePayment with 0% is principal / months', () => {
  near(mortgagePayment(120000, 0, 10), 1000, 1e-9);
});

check('remainingBalance is full at 0 payments and 0 at term', () => {
  near(remainingBalance(100000, 6, 30, 0), 100000, 1e-6);
  near(remainingBalance(100000, 6, 30, 360), 0, 1e-6);
});

check('remainingBalance decreases over time', () => {
  const b12 = remainingBalance(100000, 6, 30, 12);
  const b120 = remainingBalance(100000, 6, 30, 120);
  assert.ok(b120 < b12 && b12 < 100000);
});

check('futureValue compounds', () => {
  near(futureValue(400000, 3, 7), 400000 * Math.pow(1.03, 7), 1e-6);
});

check('totalRentCost with no growth is rent*12*years', () => {
  near(totalRentCost(2000, 0, 7), 2000 * 12 * 7, 1e-9);
});

check('totalRentCost with growth exceeds no-growth', () => {
  assert.ok(totalRentCost(2000, 3, 7) > totalRentCost(2000, 0, 7));
});

check('compareRentVsBuy returns numbers and a verdict', () => {
  const r = compareRentVsBuy(BASE);
  assert.ok(Number.isFinite(r.buy) && Number.isFinite(r.rent));
  assert.ok(r.verdict === 'buy' || r.verdict === 'rent');
  near(r.difference, Math.abs(r.buy - r.rent), 1e-6);
});

check('higher appreciation makes buying relatively cheaper', () => {
  const low = compareRentVsBuy({ ...BASE, apprPct: 1 });
  const high = compareRentVsBuy({ ...BASE, apprPct: 6 });
  assert.ok(high.buy < low.buy, 'more appreciation should lower net buy cost');
});

check('validation', () => {
  assert.throws(() => mortgagePayment(100000, 6, 0), /term must be positive/);
  assert.throws(() => totalRentCost(-1, 3, 5), /rent must be non-negative/);
  assert.throws(() => compareRentVsBuy({ ...BASE, years: 0 }), /years must be positive/);
});

console.log(`\n${n} checks passed.`);
