import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { CRITERIA, qsofa, qsofaRisk } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('no criteria scores 0', () => {
  assert.equal(qsofa({}), 0);
});

check('each criterion adds one point', () => {
  CRITERIA.forEach(c => assert.equal(qsofa({ [c.key]: true }), 1));
});

check('all three criteria score 3', () => {
  assert.equal(qsofa({ respRate: true, mentation: true, sbp: true }), 3);
});

check('a mixed selection sums', () => {
  assert.equal(qsofa({ respRate: true, sbp: true }), 2);
});

check('risk is high at 2 or more', () => {
  assert.equal(qsofaRisk(0), 'low risk');
  assert.equal(qsofaRisk(1), 'low risk');
  assert.equal(qsofaRisk(2), 'high risk');
  assert.equal(qsofaRisk(3), 'high risk');
});

check('the boundary is exactly 2', () => {
  assert.equal(qsofaRisk(1), 'low risk');
  assert.equal(qsofaRisk(2), 'high risk');
});

check('the criteria set is the three qSOFA items', () => {
  assert.equal(CRITERIA.length, 3);
  assert.deepEqual(CRITERIA.map(c => c.key), ['respRate', 'mentation', 'sbp']);
});

check('unknown keys are ignored', () => {
  assert.equal(qsofa({ temperature: true, respRate: true }), 1);
});

check('score always lands in 0..3', () => {
  const all = { respRate: true, mentation: true, sbp: true };
  const s = qsofa(all);
  assert.ok(s >= 0 && s <= 3);
});

check('validation', () => {
  assert.throws(() => qsofa(null), /must be an object/);
  assert.throws(() => qsofa('x'), /must be an object/);
  assert.throws(() => qsofaRisk('x'), /must be a number/);
});

console.log(`\n${n} checks passed.`);
