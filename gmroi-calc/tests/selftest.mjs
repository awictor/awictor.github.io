import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { grossProfit, grossMarginPct, gmroi, verdict, analyze } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b) => assert.ok(Math.abs(a - b) < 1e-9, `${a} != ${b}`);

check('gross profit = revenue - COGS', () => {
  assert.equal(grossProfit(100000, 60000), 40000);
});

check('gross margin percent', () => {
  near(grossMarginPct(100000, 60000), 0.4);
  near(grossMarginPct(200, 50), 0.75);
});

check('GMROI = gross profit / avg inventory cost', () => {
  near(gmroi(100000, 60000, 30000), 40000 / 30000); // 1.333...
});

check('GMROI equals margin% * (revenue / avg inventory)', () => {
  const rev = 100000, cogs = 60000, inv = 30000;
  near(gmroi(rev, cogs, inv), grossMarginPct(rev, cogs) * (rev / inv));
});

check('GMROI of exactly 1 at break-even inventory', () => {
  // gross profit 40000, avg inv 40000 -> GMROI 1
  near(gmroi(100000, 60000, 40000), 1);
});

check('verdict bands', () => {
  assert.equal(verdict(1.5), 'Profitable (above 1.0)');
  assert.equal(verdict(1), 'Break-even (1.0)');
  assert.equal(verdict(0.8), 'Losing money (below 1.0)');
});

check('lower inventory raises GMROI', () => {
  assert.ok(gmroi(100000, 60000, 20000) > gmroi(100000, 60000, 40000));
});

check('higher margin raises GMROI', () => {
  assert.ok(gmroi(100000, 50000, 30000) > gmroi(100000, 70000, 30000));
});

check('analyze bundles all outputs', () => {
  const r = analyze(100000, 60000, 30000);
  assert.equal(r.grossProfit, 40000);
  near(r.grossMarginPct, 0.4);
  near(r.gmroi, 40000 / 30000);
  assert.equal(r.verdict, 'Profitable (above 1.0)');
});

check('validation: non-positive revenue/inventory throw', () => {
  assert.throws(() => grossMarginPct(0, 10), /revenue must be a positive/);
  assert.throws(() => gmroi(100000, 60000, 0), /average inventory cost must be a positive/);
  assert.throws(() => verdict('x'), /GMROI must be a number/);
});

console.log(`\n${n} checks passed.`);
