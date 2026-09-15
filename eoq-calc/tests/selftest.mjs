import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { eoq, ordersPerYear, cycleDays, annualOrderingCost, annualHoldingCost, totalAnnualCost, reorderPoint, analyze } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, tol = 1e-6) => assert.ok(Math.abs(a - b) <= tol, `${a} not within ${tol} of ${b}`);

check('EOQ textbook vector: D=1000, S=10, H=2 -> 100', () => {
  assert.equal(eoq(1000, 10, 2), 100);
});

check('EOQ of another case', () => {
  near(eoq(2400, 50, 3), Math.sqrt(80000)); // ~282.84
});

check('at the EOQ, ordering cost equals holding cost', () => {
  const q = eoq(1000, 10, 2);
  near(annualOrderingCost(1000, q, 10), annualHoldingCost(q, 2));
  near(annualOrderingCost(1000, q, 10), 100);
});

check('total annual cost at EOQ', () => {
  near(totalAnnualCost(1000, 100, 10, 2), 200);
});

check('EOQ minimizes total cost (lower than nearby quantities)', () => {
  const q = eoq(1000, 10, 2);
  const base = totalAnnualCost(1000, q, 10, 2);
  assert.ok(base < totalAnnualCost(1000, q * 0.8, 10, 2));
  assert.ok(base < totalAnnualCost(1000, q * 1.25, 10, 2));
});

check('orders per year and cycle length', () => {
  assert.equal(ordersPerYear(1000, 100), 10);
  near(cycleDays(1000, 100), 36.5);
});

check('reorder point = daily demand * lead time', () => {
  near(reorderPoint(365, 10), 10);             // 1 unit/day * 10 days
  near(reorderPoint(1000, 7), (1000 / 365) * 7);
});

check('reorder point adds safety stock', () => {
  near(reorderPoint(365, 10, 365, 20), 30);
});

check('analyze bundles every metric', () => {
  const r = analyze(1000, 10, 2, 7, 0);
  assert.equal(r.eoq, 100);
  assert.equal(r.ordersPerYear, 10);
  near(r.totalAnnualCost, 200);
  near(r.reorderPoint, (1000 / 365) * 7);
});

check('validation rejects non-positive inputs', () => {
  assert.throws(() => eoq(0, 10, 2), /demand must be a positive/);
  assert.throws(() => eoq(1000, 0, 2), /ordering cost must be a positive/);
  assert.throws(() => eoq(1000, 10, -1), /holding cost must be a positive/);
  assert.throws(() => reorderPoint(1000, -1), /lead time must be zero or more/);
});

console.log(`\n${n} checks passed.`);
