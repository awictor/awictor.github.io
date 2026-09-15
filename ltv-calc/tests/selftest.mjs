import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { ltv, cltv, equityPercent, pmiRequired, payDownToReach } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b} (±${eps})`);

check('ltv = loan / value * 100', () => {
  near(ltv(240000, 300000), 80, 1e-9);
  near(ltv(150000, 300000), 50, 1e-9);
});

check('cltv sums all loans', () => {
  near(cltv([200000, 40000], 300000), 80, 1e-9);
});

check('cltv of a single loan equals ltv', () => {
  near(cltv([240000], 300000), ltv(240000, 300000), 1e-9);
});

check('equity percent is 100 - ltv', () => {
  near(equityPercent(240000, 300000), 20, 1e-9);
});

check('pmiRequired above the threshold', () => {
  assert.equal(pmiRequired(81, 80), true);
  assert.equal(pmiRequired(80, 80), false);
  assert.equal(pmiRequired(79, 80), false);
});

check('pmiRequired with a custom threshold', () => {
  assert.equal(pmiRequired(76, 75), true);
  assert.equal(pmiRequired(75, 75), false);
});

check('payDownToReach computes principal to hit a target LTV', () => {
  // loan 250k, value 300k, target 80% -> target balance 240k -> pay down 10k
  near(payDownToReach(250000, 300000, 80), 10000, 1e-9);
});

check('payDownToReach is 0 when already at or below target', () => {
  near(payDownToReach(200000, 300000, 80), 0, 1e-9);
});

check('a higher loan means a higher LTV', () => {
  assert.ok(ltv(280000, 300000) > ltv(200000, 300000));
});

check('validation', () => {
  assert.throws(() => ltv(240000, 0), /property value must be positive/);
  assert.throws(() => ltv(-1, 300000), /non-negative/);
  assert.throws(() => cltv('nope', 300000), /must be an array/);
});

console.log(`\n${n} checks passed.`);
