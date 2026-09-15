import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { monthsCovered, targetFund, gap, monthlyToReach, fundStatus } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b} (±${eps})`);

check('months covered = savings / monthly expenses', () => {
  near(monthsCovered(9000, 3000), 3, 1e-9);
  near(monthsCovered(15000, 2500), 6, 1e-9);
});

check('target fund = monthly expenses × months', () => {
  near(targetFund(3000, 6), 18000, 1e-9);
  near(targetFund(2000, 3), 6000, 1e-9);
});

check('gap is target minus savings, floored at 0', () => {
  near(gap(9000, 3000, 6), 9000, 1e-9);   // 18000 - 9000
  near(gap(20000, 3000, 6), 0, 1e-9);     // already over target
});

check('monthly to reach = gap / months', () => {
  near(monthlyToReach(9000, 12), 750, 1e-9);
  near(monthlyToReach(6000, 6), 1000, 1e-9);
});

check('fund status tiers', () => {
  assert.equal(fundStatus(0.5), 'Critical');
  assert.equal(fundStatus(2), 'Starter');
  assert.equal(fundStatus(4), 'Solid');
  assert.equal(fundStatus(6), 'Well-funded');
  assert.equal(fundStatus(9), 'Well-funded');
});

check('status boundaries at 1, 3, 6', () => {
  assert.equal(fundStatus(0.99), 'Critical');
  assert.equal(fundStatus(1), 'Starter');
  assert.equal(fundStatus(3), 'Solid');
  assert.equal(fundStatus(5.99), 'Solid');
});

check('more savings covers more months', () => {
  assert.ok(monthsCovered(12000, 3000) > monthsCovered(6000, 3000));
});

check('higher expenses cover fewer months', () => {
  assert.ok(monthsCovered(9000, 4500) < monthsCovered(9000, 3000));
});

check('zero savings → 0 months, full gap', () => {
  near(monthsCovered(0, 3000), 0, 1e-9);
  near(gap(0, 3000, 6), 18000, 1e-9);
});

check('validation', () => {
  assert.throws(() => monthsCovered(9000, 0), /positive/);
  assert.throws(() => monthlyToReach(9000, 0), /positive/);
  assert.throws(() => monthsCovered('x', 3000), /numbers/);
});

console.log(`\n${n} checks passed.`);
