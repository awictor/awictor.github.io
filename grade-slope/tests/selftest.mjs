import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { gradePercent, angleFromGrade, gradeFromAngle, riseForRun, slopeDistance } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, e = 1e-9) => assert.ok(Math.abs(a - b) <= e, `${a} vs ${b}`);

check('percent grade = rise / run × 100', () => {
  near(gradePercent(8, 100), 8);
  near(gradePercent(10, 100), 10);
  near(gradePercent(1, 1), 100);
});

check('100% grade is 45° (not vertical)', () => {
  near(angleFromGrade(100), 45);
  near(angleFromGrade(0), 0);
});

check('grade from angle', () => {
  near(gradeFromAngle(45), 100);
  near(gradeFromAngle(0), 0);
});

check('angle and grade conversions are inverse', () => {
  for (const g of [5, 10, 25, 80, 150]) near(gradeFromAngle(angleFromGrade(g)), g, 1e-9);
});

check('rise for a run at a grade', () => {
  near(riseForRun(8, 100), 8);
  near(riseForRun(10, 50), 5);
});

check('slope distance = √(rise² + run²)', () => {
  near(slopeDistance(3, 4), 5);
  near(slopeDistance(0, 10), 10);
});

check('negative rise means downhill (negative grade)', () => {
  near(gradePercent(-8, 100), -8);
  assert.ok(angleFromGrade(-8) < 0);
});

check('a 1:12 ADA ramp is about 8.33% and 4.76°', () => {
  const g = gradePercent(1, 12);
  assert.ok(Math.abs(g - 8.333) < 0.01);
  assert.ok(Math.abs(angleFromGrade(g) - 4.764) < 0.01);
});

check('flat ground: 0% grade, 0°, slope distance = run', () => {
  near(gradePercent(0, 25), 0);
  near(slopeDistance(0, 25), 25);
});

check('validation: non-positive run and out-of-range angle throw', () => {
  assert.throws(() => gradePercent(5, 0), /run must be positive/);
  assert.throws(() => gradePercent(5, -1), /run must be positive/);
  assert.throws(() => gradeFromAngle(90), /between -90 and 90/);
  assert.throws(() => gradeFromAngle(-90), /between -90 and 90/);
});

console.log(`\n${n} checks passed.`);
