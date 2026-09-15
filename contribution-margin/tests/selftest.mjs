import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { contributionMargin, cmRatio, totalCM, unitsForProfit, analyze } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b) => assert.ok(Math.abs(a - b) < 1e-9, `${a} != ${b}`);

check('contribution margin per unit = price - variable cost', () => {
  assert.equal(contributionMargin(100, 60), 40);
  assert.equal(contributionMargin(12, 4.5), 7.5);
});

check('CM ratio', () => {
  near(cmRatio(100, 60), 0.4);
  near(cmRatio(200, 50), 0.75);
});

check('total contribution margin over units', () => {
  assert.equal(totalCM(100, 60, 500), 20000);
  assert.equal(totalCM(100, 60, 0), 0);
});

check('units for profit target', () => {
  near(unitsForProfit(10000, 2000, 100, 60), 300); // (10000+2000)/40
});

check('units for zero profit is break-even', () => {
  near(unitsForProfit(10000, 0, 100, 60), 250); // 10000/40
});

check('CM ratio times price recovers CM per unit', () => {
  near(cmRatio(100, 60) * 100, contributionMargin(100, 60));
});

check('analyze bundles everything', () => {
  const r = analyze({ price: 100, vc: 60, units: 500, fixed: 10000, target: 2000 });
  assert.equal(r.cmPerUnit, 40);
  near(r.cmRatio, 0.4);
  assert.equal(r.totalCM, 20000);
  near(r.breakEvenUnits, 250);
  near(r.unitsForTarget, 300);
});

check('higher variable cost lowers CM and raises break-even units', () => {
  assert.ok(contributionMargin(100, 70) < contributionMargin(100, 60));
  assert.ok(unitsForProfit(10000, 0, 100, 70) > unitsForProfit(10000, 0, 100, 60));
});

check('total CM at break-even units equals fixed costs', () => {
  const be = unitsForProfit(10000, 0, 100, 60);
  near(totalCM(100, 60, be), 10000);
});

check('validation: bad price/cost and non-positive CM throw', () => {
  assert.throws(() => contributionMargin(0, 10), /price must be a positive/);
  assert.throws(() => contributionMargin(100, -1), /variable cost must be zero or more/);
  assert.throws(() => unitsForProfit(10000, 0, 50, 60), /contribution margin must be positive/);
});

console.log(`\n${n} checks passed.`);
