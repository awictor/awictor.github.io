import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { G, period, frequency, lengthForPeriod } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, e = 1e-6) => assert.ok(Math.abs(a - b) <= e, `${a} vs ${b}`);

check('period = 2π√(L/g)', () => {
  near(period(1, 9.80665), 2 * Math.PI * Math.sqrt(1 / 9.80665));
});

check('a 1 m pendulum swings in about 2.006 s', () => {
  assert.ok(Math.abs(period(1) - 2.0064) < 1e-3);
});

check('frequency is the reciprocal of the period', () => {
  near(frequency(1), 1 / period(1));
  near(frequency(2, 9.8), 1 / period(2, 9.8));
});

check('period scales with the square root of length', () => {
  near(period(4) / period(1), 2);
  near(period(9) / period(1), 3);
});

check('lengthForPeriod inverts period', () => {
  for (const L of [0.25, 1, 2.5, 10]) near(lengthForPeriod(period(L), G), L, 1e-9);
});

check('a "seconds pendulum" (T=2s) is about 0.994 m', () => {
  assert.ok(Math.abs(lengthForPeriod(2) - 0.9936) < 1e-3);
  near(lengthForPeriod(2), 9.80665 / (Math.PI * Math.PI), 1e-9);
});

check('lower gravity lengthens the period (Moon vs Earth)', () => {
  assert.ok(period(1, 1.62) > period(1, 9.80665));
});

check('default gravity is standard g', () => {
  near(G, 9.80665, 1e-9);
  near(period(1), period(1, 9.80665));
});

check('quadrupling length needs 4× via lengthForPeriod when T doubles', () => {
  const L1 = lengthForPeriod(1), L2 = lengthForPeriod(2);
  near(L2 / L1, 4);
});

check('validation: non-positive length, period, gravity throw', () => {
  assert.throws(() => period(0), /length must be positive/);
  assert.throws(() => period(1, 0), /gravity must be positive/);
  assert.throws(() => lengthForPeriod(-1), /period must be positive/);
  assert.throws(() => frequency(-2), /length must be positive/);
});

console.log(`\n${n} checks passed.`);
