import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { dropFactor, flowRate, dropsPerMin, dropsPerMinFromRate, infusionTimeHr } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b} (±${eps})`);

check('flowRate = volume / time', () => {
  near(flowRate(1000, 8), 125, 1e-9);   // 1 L over 8 h
  near(flowRate(500, 4), 125, 1e-9);
});

check('dropsPerMin = volume × drop factor / minutes', () => {
  // 1000 mL over 480 min with 15 gtt/mL = 31.25 gtt/min
  near(dropsPerMin(1000, 480, 15), 31.25, 1e-9);
});

check('dropsPerMinFromRate = rate × drop factor / 60', () => {
  near(dropsPerMinFromRate(125, 15), 31.25, 1e-9);
});

check('the two drop-rate paths agree', () => {
  const df = 20, vol = 1000, timeHr = 8;
  const a = dropsPerMin(vol, timeHr * 60, df);
  const b = dropsPerMinFromRate(flowRate(vol, timeHr), df);
  near(a, b, 1e-9);
});

check('microdrip set (60 gtt/mL): gtt/min equals mL/hr', () => {
  // classic identity: with a 60 gtt/mL set, gtt/min = mL/hr
  near(dropsPerMinFromRate(125, 60), 125, 1e-9);
  near(dropsPerMinFromRate(83, 60), 83, 1e-9);
});

check('dropFactor lookup returns the standard sets', () => {
  assert.equal(dropFactor(10), 10);
  assert.equal(dropFactor('15'), 15);
  assert.equal(dropFactor(20), 20);
  assert.equal(dropFactor(60), 60);
});

check('infusionTimeHr = volume / rate', () => {
  near(infusionTimeHr(1000, 125), 8, 1e-9);
  near(infusionTimeHr(250, 100), 2.5, 1e-9);
});

check('doubling the volume doubles the drip rate', () => {
  near(dropsPerMin(2000, 480, 15), 2 * dropsPerMin(1000, 480, 15), 1e-9);
});

check('a shorter infusion time means a faster drip rate', () => {
  assert.ok(dropsPerMin(1000, 240, 15) > dropsPerMin(1000, 480, 15));
});

check('validation', () => {
  assert.throws(() => flowRate(1000, 0), /time must be positive/);
  assert.throws(() => dropsPerMin(1000, 0, 15), /time must be positive/);
  assert.throws(() => dropsPerMin(1000, 480, 0), /drop factor must be positive/);
  assert.throws(() => infusionTimeHr(1000, 0), /rate must be positive/);
  assert.throws(() => dropFactor(25), /unknown IV set/);
});

console.log(`\n${n} checks passed.`);
