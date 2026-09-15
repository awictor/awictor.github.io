import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { CAL_PER_UNIT, weeksToGoal, dailyDeficit, weeklyRateFromDeficit, projectDate } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps = 1e-9) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b}`);

check('weeksToGoal for weight loss', () => {
  assert.equal(weeksToGoal(80, 72, 0.5), 16);
});

check('weeksToGoal is symmetric (gain works too)', () => {
  assert.equal(weeksToGoal(72, 80, 0.5), 16);
});

check('weeksToGoal is 0 when already at goal', () => {
  assert.equal(weeksToGoal(75, 75, 0.5), 0);
});

check('weeksToGoal rejects non-positive rate', () => {
  assert.throws(() => weeksToGoal(80, 72, 0), /positive/);
  assert.throws(() => weeksToGoal(80, 72, -1), /positive/);
});

check('dailyDeficit uses 7700 kcal/kg', () => {
  near(dailyDeficit(0.5, 'kg'), 0.5 * 7700 / 7); // 550
  assert.equal(dailyDeficit(0.5, 'kg'), 550);
});

check('dailyDeficit uses 3500 kcal/lb', () => {
  assert.equal(dailyDeficit(1, 'lb'), 500);
});

check('weeklyRateFromDeficit inverts dailyDeficit', () => {
  near(weeklyRateFromDeficit(550, 'kg'), 0.5);
  near(weeklyRateFromDeficit(dailyDeficit(0.8, 'lb'), 'lb'), 0.8);
});

check('unit validation', () => {
  assert.throws(() => dailyDeficit(0.5, 'stone'), /kg or lb/);
  assert.throws(() => weeklyRateFromDeficit(500, 'x'), /kg or lb/);
  assert.equal(CAL_PER_UNIT.kg, 7700);
  assert.equal(CAL_PER_UNIT.lb, 3500);
});

check('projectDate advances by weeks of days', () => {
  assert.equal(projectDate(0, 16), 16 * 7 * 86400000);
  assert.equal(projectDate(0, 0), 0);
});

check('a faster rate reaches the goal sooner', () => {
  assert.ok(weeksToGoal(90, 80, 1) < weeksToGoal(90, 80, 0.5));
});

console.log(`\n${n} checks passed.`);
