import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { CRITERIA, hasBled, hasBledRisk } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('no criteria scores 0', () => {
  assert.equal(hasBled({}), 0);
});

check('each criterion adds one point', () => {
  CRITERIA.forEach(c => assert.equal(hasBled({ [c.key]: true }), 1));
});

check('all nine criteria score the maximum of 9', () => {
  const all = {};
  CRITERIA.forEach(c => { all[c.key] = true; });
  assert.equal(hasBled(all), 9);
});

check('renal and liver each count (up to 2 for A)', () => {
  assert.equal(hasBled({ renal: true, liver: true }), 2);
});

check('drugs and alcohol each count (up to 2 for D)', () => {
  assert.equal(hasBled({ drugs: true, alcohol: true }), 2);
});

check('risk bands: 0-1 low, 2 moderate, >=3 high', () => {
  assert.equal(hasBledRisk(0), 'low');
  assert.equal(hasBledRisk(1), 'low');
  assert.equal(hasBledRisk(2), 'moderate');
  assert.equal(hasBledRisk(3), 'high');
  assert.equal(hasBledRisk(9), 'high');
});

check('the criteria set has the nine HAS-BLED items', () => {
  assert.equal(CRITERIA.length, 9);
  assert.deepEqual(CRITERIA.map(c => c.key), ['hypertension', 'renal', 'liver', 'stroke', 'bleeding', 'labileINR', 'elderly', 'drugs', 'alcohol']);
});

check('unknown keys are ignored', () => {
  assert.equal(hasBled({ smoker: true, stroke: true }), 1);
});

check('score always lands in 0..9', () => {
  const all = {}; CRITERIA.forEach(c => { all[c.key] = true; });
  const s = hasBled(all);
  assert.ok(s >= 0 && s <= 9);
});

check('validation', () => {
  assert.throws(() => hasBled(null), /must be an object/);
  assert.throws(() => hasBled('x'), /must be an object/);
  assert.throws(() => hasBledRisk('x'), /must be a number/);
});

console.log(`\n${n} checks passed.`);
