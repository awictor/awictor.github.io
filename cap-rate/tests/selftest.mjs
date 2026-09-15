import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { noi, capRate, grossRentMultiplier, cashOnCash } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b} (±${eps})`);

check('NOI = income - expenses', () => {
  near(noi(36000, 12000), 24000, 1e-9);
});

check('cap rate = NOI / price * 100', () => {
  near(capRate(24000, 300000), 8, 1e-9);
  near(capRate(30000, 300000), 10, 1e-9);
});

check('higher NOI gives a higher cap rate', () => {
  assert.ok(capRate(30000, 300000) > capRate(24000, 300000));
});

check('gross rent multiplier = price / rent', () => {
  near(grossRentMultiplier(300000, 30000), 10, 1e-9);
  near(grossRentMultiplier(300000, 36000), 300000 / 36000, 1e-9);
});

check('cash-on-cash = cash flow / cash invested * 100', () => {
  near(cashOnCash(6000, 60000), 10, 1e-9);
  near(cashOnCash(7500, 75000), 10, 1e-9);
});

check('NOI can be negative when expenses exceed income', () => {
  near(noi(10000, 15000), -5000, 1e-9);
  assert.ok(capRate(noi(10000, 15000), 200000) < 0);
});

check('cash-on-cash is negative with negative cash flow', () => {
  assert.ok(cashOnCash(-3000, 60000) < 0);
});

check('a lower GRM means cheaper per rent dollar', () => {
  assert.ok(grossRentMultiplier(300000, 40000) < grossRentMultiplier(300000, 30000));
});

check('end-to-end example', () => {
  const n = noi(36000, 12000);            // 24000
  near(capRate(n, 300000), 8, 1e-9);      // 8%
  const cashFlow = n - 14000;             // 10000
  near(cashOnCash(cashFlow, 75000), 10000 / 75000 * 100, 1e-9);
});

check('validation', () => {
  assert.throws(() => capRate(24000, 0), /price must be positive/);
  assert.throws(() => grossRentMultiplier(300000, 0), /rent must be positive/);
  assert.throws(() => cashOnCash(6000, 0), /cash invested must be positive/);
  assert.throws(() => noi(-1, 100), /non-negative/);
});

console.log(`\n${n} checks passed.`);
