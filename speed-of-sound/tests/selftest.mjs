import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { speedOfSound, machNumber, machRegime, distanceFromDelay } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, e = 1e-6) => assert.ok(Math.abs(a - b) <= e, `${a} vs ${b}`);

check('speed of sound at 0 °C is 331.3 m/s', () => {
  near(speedOfSound(0), 331.3);
});

check('at 20 °C it is about 343.42 m/s', () => {
  near(speedOfSound(20), 331.3 + 0.606 * 20);
  near(speedOfSound(20), 343.42);
});

check('colder air is slower', () => {
  near(speedOfSound(-10), 331.3 - 6.06);
  assert.ok(speedOfSound(-10) < speedOfSound(0));
});

check('linear in temperature (+0.606 per °C)', () => {
  near(speedOfSound(21) - speedOfSound(20), 0.606);
});

check('Mach number = speed / speed of sound', () => {
  near(machNumber(speedOfSound(20), 20), 1);
  near(machNumber(2 * speedOfSound(20), 20), 2);
});

check('Mach regime classification', () => {
  assert.equal(machRegime(0.5), 'subsonic');
  assert.equal(machRegime(1), 'transonic');
  assert.equal(machRegime(2), 'supersonic');
  assert.equal(machRegime(6), 'hypersonic');
});

check('regime boundaries', () => {
  assert.equal(machRegime(0.79), 'subsonic');
  assert.equal(machRegime(0.8), 'transonic');
  assert.equal(machRegime(1.2), 'transonic');
  assert.equal(machRegime(1.21), 'supersonic');
  assert.equal(machRegime(5), 'supersonic');
});

check('thunder ≈ 1 km per 3 seconds', () => {
  const d = distanceFromDelay(3, 20);
  assert.ok(Math.abs(d - 1030.26) < 0.1);
  assert.ok(Math.abs(d / 1000 - 1) < 0.05);
});

check('distance scales with delay; zero delay = zero distance', () => {
  near(distanceFromDelay(10, 20), 2 * distanceFromDelay(5, 20));
  near(distanceFromDelay(0, 20), 0);
});

check('validation: below absolute zero, non-positive speed, negative delay throw', () => {
  assert.throws(() => speedOfSound(-600), /absolute zero/);
  assert.throws(() => machNumber(0, 20), /speed must be positive/);
  assert.throws(() => distanceFromDelay(-1, 20), /zero or positive/);
  assert.throws(() => machRegime(-1), /zero or positive/);
});

console.log(`\n${n} checks passed.`);
