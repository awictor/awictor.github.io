import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { monthlyPayment, remainingBalance, leaseTotal, buyNetCost, compareLeaseBuy } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b} (±${eps})`);

const BASE = {
  leasePayment: 400, leaseMonths: 36, leaseDown: 2500, dispositionFee: 395,
  price: 32000, buyDown: 4000, apr: 6.5, loanTermMonths: 60, resaleValue: 19000
};

check('monthlyPayment over months (0% is principal/months)', () => {
  near(monthlyPayment(20000, 0, 60), 333.333, 0.01);
});

check('monthlyPayment with interest is above the 0% amount', () => {
  assert.ok(monthlyPayment(20000, 6, 60) > monthlyPayment(20000, 0, 60));
});

check('remainingBalance: full at 0, zero at term', () => {
  near(remainingBalance(20000, 6, 60, 0), 20000, 1e-6);
  near(remainingBalance(20000, 6, 60, 60), 0, 1e-6);
});

check('leaseTotal sums payments, down and disposition', () => {
  near(leaseTotal(400, 36, 2500, 395), 400 * 36 + 2500 + 395, 1e-9);
});

check('buyNetCost subtracts resale value', () => {
  const withResale = buyNetCost(32000, 4000, 6.5, 60, 36, 19000);
  const noResale = buyNetCost(32000, 4000, 6.5, 60, 36, 0);
  near(noResale - withResale, 19000, 1e-6);
});

check('compareLeaseBuy returns numbers and a verdict', () => {
  const r = compareLeaseBuy(BASE);
  assert.ok(Number.isFinite(r.lease) && Number.isFinite(r.buy));
  assert.ok(r.verdict === 'buy' || r.verdict === 'lease');
  near(r.difference, Math.abs(r.lease - r.buy), 1e-6);
});

check('higher resale makes buying cheaper', () => {
  const low = compareLeaseBuy({ ...BASE, resaleValue: 12000 });
  const high = compareLeaseBuy({ ...BASE, resaleValue: 24000 });
  assert.ok(high.buy < low.buy);
});

check('a higher lease payment makes leasing worse', () => {
  const cheap = compareLeaseBuy({ ...BASE, leasePayment: 300 });
  const dear = compareLeaseBuy({ ...BASE, leasePayment: 600 });
  assert.ok(dear.lease > cheap.lease);
});

check('holding past the loan term leaves zero balance', () => {
  // hold 72 > loan 60 -> balance 0, all payments made
  const net = buyNetCost(32000, 4000, 6.5, 60, 72, 15000);
  const pay = monthlyPayment(32000 - 4000, 6.5, 60);
  near(net, 4000 + pay * 60 + 0 - 15000, 1e-6);
});

check('validation', () => {
  assert.throws(() => monthlyPayment(20000, 6, 0), /months must be positive/);
  assert.throws(() => monthlyPayment(-1, 6, 60), /non-negative/);
});

console.log(`\n${n} checks passed.`);
