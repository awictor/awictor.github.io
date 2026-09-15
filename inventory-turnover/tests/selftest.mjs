import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { averageInventory, turnover, daysSalesOfInventory, analyze } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, tol = 1e-9) => assert.ok(Math.abs(a - b) <= tol, `${a} not within ${tol} of ${b}`);

check('average inventory is the mean of beginning and ending', () => {
  assert.equal(averageInventory(20000, 30000), 25000);
  assert.equal(averageInventory(40000, 60000), 50000);
});

check('turnover = COGS / average inventory', () => {
  assert.equal(turnover(100000, 25000), 4);
  assert.equal(turnover(500000, 50000), 10);
});

check('DSI = period days / turnover', () => {
  near(daysSalesOfInventory(4, 365), 91.25);
  near(daysSalesOfInventory(10, 365), 36.5);
});

check('DSI defaults to a 365-day period', () => {
  assert.equal(daysSalesOfInventory(4), daysSalesOfInventory(4, 365));
});

check('analyze worked example: COGS 500k, 40k/60k inventory', () => {
  const r = analyze({ cogs: 500000, beginning: 40000, ending: 60000, periodDays: 365 });
  assert.equal(r.averageInventory, 50000);
  assert.equal(r.turnover, 10);
  near(r.dsi, 36.5);
});

check('DSI relates to inventory: period * avgInv / COGS', () => {
  const r = analyze({ cogs: 500000, beginning: 40000, ending: 60000, periodDays: 365 });
  near(r.dsi, 365 * r.averageInventory / 500000);
});

check('higher turnover means lower DSI', () => {
  assert.ok(daysSalesOfInventory(12, 365) < daysSalesOfInventory(3, 365));
});

check('custom period (a 90-day quarter)', () => {
  near(daysSalesOfInventory(3, 90), 30);
  const r = analyze({ cogs: 90000, beginning: 10000, ending: 20000, periodDays: 90 });
  assert.equal(r.averageInventory, 15000);
  assert.equal(r.turnover, 6);
  near(r.dsi, 15);
});

check('analyze reports every field', () => {
  const r = analyze({ cogs: 100000, beginning: 20000, ending: 30000 });
  assert.deepEqual(Object.keys(r).sort(), ['averageInventory', 'dsi', 'periodDays', 'turnover']);
  assert.equal(r.periodDays, 365);
});

check('validation: non-positive COGS or zero inventory throws', () => {
  assert.throws(() => turnover(0, 25000), /COGS must be a positive/);
  assert.throws(() => turnover(100000, 0), /average inventory must be a positive/);
  assert.throws(() => analyze({ cogs: 100000, beginning: 0, ending: 0 }), /average inventory must be a positive/);
});

console.log(`\n${n} checks passed.`);
