import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { pitchRatio, pitchAngle, slopeFactor, rafterLength, angleToPitch } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b} (±${eps})`);

check('pitchRatio is rise/run * 12', () => {
  near(pitchRatio(6, 12), 6, 1e-9);
  near(pitchRatio(12, 12), 12, 1e-9);
  near(pitchRatio(4, 12), 4, 1e-9);
});

check('pitchAngle: 12:12 is 45 degrees', () => {
  near(pitchAngle(12, 12), 45, 1e-9);
});

check('pitchAngle: 6:12 is about 26.57 degrees', () => {
  near(pitchAngle(6, 12), Math.atan(0.5) * 180 / Math.PI, 1e-9);
  near(pitchAngle(6, 12), 26.565, 0.01);
});

check('slopeFactor: 12:12 is sqrt(2), 6:12 is sqrt(1.25)', () => {
  near(slopeFactor(12, 12), Math.SQRT2, 1e-9);
  near(slopeFactor(6, 12), Math.sqrt(1.25), 1e-9);
});

check('rafterLength is the hypotenuse (3-4-5)', () => {
  near(rafterLength(3, 4), 5, 1e-9);
  near(rafterLength(12, 12), Math.sqrt(288), 1e-9);
});

check('a flat roof: pitch 0, angle 0, slope factor 1, rafter = run', () => {
  near(pitchRatio(0, 12), 0, 1e-9);
  near(pitchAngle(0, 12), 0, 1e-9);
  near(slopeFactor(0, 12), 1, 1e-9);
  near(rafterLength(0, 12), 12, 1e-9);
});

check('angleToPitch inverts pitchAngle', () => {
  near(angleToPitch(45), 12, 1e-9);
  near(angleToPitch(pitchAngle(6, 12)), 6, 1e-9);
});

check('slope factor relates run to rafter length', () => {
  // rafter = run * slopeFactor
  near(rafterLength(6, 12), 12 * slopeFactor(6, 12), 1e-9);
});

check('a steeper roof has a larger angle and slope factor', () => {
  assert.ok(pitchAngle(9, 12) > pitchAngle(4, 12));
  assert.ok(slopeFactor(9, 12) > slopeFactor(4, 12));
});

check('validation', () => {
  assert.throws(() => pitchRatio(6, 0), /run must be positive/);
  assert.throws(() => pitchRatio(-1, 12), /rise must be non-negative/);
  assert.throws(() => angleToPitch(90), /\[0, 90\)/);
  assert.throws(() => angleToPitch(-5), /\[0, 90\)/);
});

console.log(`\n${n} checks passed.`);
