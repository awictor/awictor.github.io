import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { CRITERIA, curb65, curb65Risk, disposition } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('no criteria scores 0', () => {
  assert.equal(curb65({}), 0);
});

check('each criterion is worth one point', () => {
  CRITERIA.forEach(c => assert.equal(curb65({ [c.key]: true }), 1));
});

check('all five criteria score 5', () => {
  const all = {};
  CRITERIA.forEach(c => { all[c.key] = true; });
  assert.equal(curb65(all), 5);
});

check('a mixed selection sums correctly', () => {
  assert.equal(curb65({ confusion: true, age65: true, respRate: true }), 3);
});

check('risk bands: 0-1 low, 2 moderate, 3-5 severe', () => {
  assert.equal(curb65Risk(0), 'low');
  assert.equal(curb65Risk(1), 'low');
  assert.equal(curb65Risk(2), 'moderate');
  assert.equal(curb65Risk(3), 'severe');
  assert.equal(curb65Risk(5), 'severe');
});

check('disposition text matches the band', () => {
  assert.match(disposition('low'), /outpatient/i);
  assert.match(disposition('moderate'), /consider/i);
  assert.match(disposition('severe'), /[Aa]dmit/);
});

check('the criteria set is exactly the five CURB-65 items', () => {
  assert.equal(CRITERIA.length, 5);
  assert.deepEqual(CRITERIA.map(c => c.key), ['confusion', 'urea', 'respRate', 'bloodPressure', 'age65']);
});

check('score always lands in 0..5', () => {
  const all = {};
  CRITERIA.forEach(c => { all[c.key] = true; });
  const s = curb65(all);
  assert.ok(s >= 0 && s <= 5);
});

check('unknown keys are ignored', () => {
  assert.equal(curb65({ somethingElse: true, urea: true }), 1);
});

check('validation', () => {
  assert.throws(() => curb65(null), /must be an object/);
  assert.throws(() => curb65('nope'), /must be an object/);
  assert.throws(() => curb65Risk('x'), /must be a number/);
});

console.log(`\n${n} checks passed.`);
