import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { sellThrough, weeksOfSupply, daysOfSupply, reorderNeeded, analyze } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b) => assert.ok(Math.abs(a - b) < 1e-9, `${a} != ${b}`);

check('sell-through = sold / received', () => {
  near(sellThrough(75, 100), 0.75);
  near(sellThrough(30, 120), 0.25);
});

check('zero sold is 0% sell-through', () => {
  assert.equal(sellThrough(0, 100), 0);
});

check('selling everything is 100%', () => {
  near(sellThrough(100, 100), 1);
});

check('weeks of supply = stock / weekly sales', () => {
  near(weeksOfSupply(200, 50), 4);
  near(weeksOfSupply(60, 20), 3);
});

check('days of supply = weeks * 7', () => {
  near(daysOfSupply(60, 20), 21);
  near(daysOfSupply(300, 70), 30);
});

check('reorder needed when supply <= lead + safety', () => {
  assert.equal(reorderNeeded(60, 20, 2, 2), true);  // 3 weeks <= 4
  assert.equal(reorderNeeded(40, 20, 1, 0), false); // 2 weeks <= 1? no
  assert.equal(reorderNeeded(200, 20, 2, 1), false); // 10 weeks, plenty
});

check('reorder triggers exactly at the threshold', () => {
  // 3 weeks of supply, lead+safety = 3 -> 3 <= 3 -> reorder
  assert.equal(reorderNeeded(60, 20, 2, 1), true);
  assert.equal(reorderNeeded(60, 20, 3, 0), true);
});

check('low stock triggers a reorder', () => {
  assert.equal(reorderNeeded(10, 20, 2, 1), true); // 0.5 weeks
});

check('analyze bundles everything', () => {
  const r = analyze({ sold: 75, received: 100, stock: 60, weekly: 20, lead: 2, safety: 1 });
  near(r.sellThrough, 0.75);
  near(r.weeksOfSupply, 3);
  near(r.daysOfSupply, 21);
  assert.equal(r.reorder, true);
});

check('validation: non-positive received / weekly sales throw', () => {
  assert.throws(() => sellThrough(10, 0), /units received must be a positive/);
  assert.throws(() => weeksOfSupply(100, 0), /weekly sales must be a positive/);
  assert.throws(() => sellThrough(-5, 100), /units sold must be zero or more/);
});

console.log(`\n${n} checks passed.`);
