import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { G, range, maxHeight, timeOfFlight } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, e = 1e-4) => assert.ok(Math.abs(a - b) <= e, `${a} vs ${b}`);

check('v=10, θ=45°: range ≈ 10.1971 m', () => {
  near(range(10, 45), 100 / G); // sin(90)=1
  near(range(10, 45), 10.19716, 1e-4);
});

check('v=10, θ=45°: max height ≈ 2.5493 m', () => {
  near(maxHeight(10, 45), 100 * 0.5 / (2 * G));
  near(maxHeight(10, 45), 2.54929, 1e-4);
});

check('v=10, θ=45°: time of flight ≈ 1.4421 s', () => {
  near(timeOfFlight(10, 45), 20 * Math.sin(Math.PI / 4) / G);
  near(timeOfFlight(10, 45), 1.44210, 1e-4);
});

check('straight up (90°): no range, height = v²/2g, time = 2v/g', () => {
  near(range(10, 90), 0);
  near(maxHeight(10, 90), 100 / (2 * G));
  near(timeOfFlight(10, 90), 20 / G);
});

check('flat launch (0°): everything is zero', () => {
  near(range(10, 0), 0);
  near(maxHeight(10, 0), 0);
  near(timeOfFlight(10, 0), 0);
});

check('complementary angles have equal range (30° = 60°)', () => {
  near(range(20, 30), range(20, 60));
  near(range(15, 20), range(15, 70));
});

check('range is maximized at 45°', () => {
  const r45 = range(12, 45);
  for (const a of [10, 30, 44, 46, 60, 80]) assert.ok(range(12, a) <= r45 + 1e-9, `angle ${a}`);
});

check('range scales with v² (double v → 4× range)', () => {
  near(range(20, 40), 4 * range(10, 40), 1e-3);
});

check('lower gravity increases range (Moon vs Earth)', () => {
  assert.ok(range(10, 45, 1.62) > range(10, 45, 9.80665));
  near(range(10, 45, 1.62), 100 / 1.62, 1e-4);
});

check('validation: bad speed, angle, gravity throw', () => {
  assert.throws(() => range(0, 45), /speed must be positive/);
  assert.throws(() => range(10, 91), /between 0 and 90/);
  assert.throws(() => range(10, -1), /between 0 and 90/);
  assert.throws(() => range(10, 45, 0), /gravity must be positive/);
});

console.log(`\n${n} checks passed.`);
