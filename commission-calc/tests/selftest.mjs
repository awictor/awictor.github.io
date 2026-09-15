import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { flatCommission, tieredCommission, effectiveRate } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b} (±${eps})`);

const TIERS = [{ upTo: 100000, rate: 5 }, { upTo: Infinity, rate: 10 }];

check('flat commission', () => {
  near(flatCommission(10000, 5), 500, 1e-9);
  near(flatCommission(150000, 5), 7500, 1e-9);
});

check('tiered: sales above the first tier', () => {
  // 5% × 100k + 10% × 50k = 5000 + 5000
  near(tieredCommission(150000, TIERS), 10000, 1e-9);
});

check('tiered: sales within the first tier', () => {
  near(tieredCommission(80000, TIERS), 80000 * 0.05, 1e-9);   // 4000
});

check('tiered: exactly at the tier boundary', () => {
  near(tieredCommission(100000, TIERS), 5000, 1e-9);
});

check('effective rate', () => {
  near(effectiveRate(10000, 150000), 10000 / 150000 * 100, 1e-9);   // 6.67%
  near(effectiveRate(500, 10000), 5, 1e-9);
});

check('three tiers', () => {
  const t = [{ upTo: 50000, rate: 3 }, { upTo: 100000, rate: 6 }, { upTo: Infinity, rate: 9 }];
  // 120k: 3%×50k + 6%×50k + 9%×20k = 1500 + 3000 + 1800 = 6300
  near(tieredCommission(120000, t), 6300, 1e-9);
});

check('zero sales → zero commission and 0% effective', () => {
  near(tieredCommission(0, TIERS), 0, 1e-9);
  near(effectiveRate(0, 0), 0, 1e-9);
});

check('accelerator: higher top tier raises effective rate as sales grow', () => {
  const a = effectiveRate(tieredCommission(120000, TIERS), 120000);
  const b = effectiveRate(tieredCommission(300000, TIERS), 300000);
  assert.ok(b > a);   // more sales in the 10% tier
});

check('flat scales linearly', () => {
  near(flatCommission(20000, 5), 2 * flatCommission(10000, 5), 1e-9);
});

check('validation', () => {
  assert.throws(() => flatCommission('x', 5), /numbers/);
  assert.throws(() => tieredCommission('y', TIERS), /numbers/);
});

console.log(`\n${n} checks passed.`);
