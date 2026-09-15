import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { averageCost, profitLoss, sharesToReach } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps = 1e-9) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b}`);

check('averageCost weights by share count', () => {
  const r = averageCost([{ price: 10, shares: 10 }, { price: 20, shares: 10 }]);
  assert.equal(r.totalShares, 20);
  assert.equal(r.totalCost, 300);
  assert.equal(r.avgPrice, 15);
});

check('averageCost with unequal lots', () => {
  const r = averageCost([{ price: 100, shares: 1 }, { price: 50, shares: 3 }]);
  assert.equal(r.totalShares, 4);
  assert.equal(r.totalCost, 250);
  assert.equal(r.avgPrice, 62.5);
});

check('averageCost rejects empty and invalid lots', () => {
  assert.throws(() => averageCost([]), /at least one lot/);
  assert.throws(() => averageCost('x'), /at least one lot/);
  assert.throws(() => averageCost([{ price: 10, shares: 0 }]), /positive shares/);
  assert.throws(() => averageCost([{ price: -1, shares: 5 }]), /non-negative price/);
});

check('profitLoss computes gain and percent', () => {
  const r = profitLoss([{ price: 10, shares: 10 }], 15);
  assert.equal(r.cost, 100);
  assert.equal(r.value, 150);
  assert.equal(r.gain, 50);
  assert.equal(r.gainPct, 50);
});

check('profitLoss goes negative below cost', () => {
  const r = profitLoss([{ price: 10, shares: 10 }], 8);
  assert.equal(r.gain, -20);
  assert.equal(r.gainPct, -20);
});

check('sharesToReach solves the averaging-down amount', () => {
  // avg 20 → target 15 by buying at 10: need 10 shares
  const x = sharesToReach(10, 20, 10, 15);
  near(x, 10);
  // verify it actually produces the target average
  const merged = averageCost([{ price: 20, shares: 10 }, { price: 10, shares: x }]);
  near(merged.avgPrice, 15);
});

check('sharesToReach returns negative when the target is unreachable', () => {
  // buying above your average can't lower it toward a target below cost
  const x = sharesToReach(10, 20, 25, 15);
  assert.ok(x < 0);
});

check('sharesToReach rejects target == buy price and non-positive shares', () => {
  assert.throws(() => sharesToReach(10, 20, 15, 15), /cannot equal the buy price/);
  assert.throws(() => sharesToReach(0, 20, 10, 15), /current shares must be positive/);
});

check('a single lot averages to its own price', () => {
  const r = averageCost([{ price: 42.5, shares: 3 }]);
  assert.equal(r.avgPrice, 42.5);
  assert.equal(r.totalShares, 3);
});

check('fractional shares are supported', () => {
  const r = averageCost([{ price: 100, shares: 0.5 }, { price: 200, shares: 0.5 }]);
  assert.equal(r.totalShares, 1);
  assert.equal(r.avgPrice, 150);
});

console.log(`\n${n} checks passed.`);
