import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { sharedProbability, peopleForProbability } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b} (±${eps})`);

check('the famous 23 → ~50.7%', () => {
  near(sharedProbability(23), 0.5073, 0.001);
});

check('small groups', () => {
  assert.equal(sharedProbability(0), 0);
  assert.equal(sharedProbability(1), 0);
  near(sharedProbability(2), 1 / 365, 1e-9);
});

check('large groups approach certainty', () => {
  near(sharedProbability(70), 0.99916, 0.001);
  assert.equal(sharedProbability(366), 1);   // pigeonhole
  assert.equal(sharedProbability(500), 1);
});

check('probability increases with group size', () => {
  let prev = -1;
  for(let k = 0; k <= 60; k++){ const p = sharedProbability(k); assert.ok(p >= prev - 1e-12); prev = p; }
});

check('inverse: 50% needs 23 people', () => {
  assert.equal(peopleForProbability(0.5), 23);
});

check('inverse: 99% needs 57 people', () => {
  assert.equal(peopleForProbability(0.99), 57);
});

check('inverse and forward are consistent', () => {
  const nNeed = peopleForProbability(0.7);
  assert.ok(sharedProbability(nNeed) >= 0.7);
  assert.ok(sharedProbability(nNeed - 1) < 0.7);
});

check('custom number of days (e.g. 100)', () => {
  near(sharedProbability(2, 100), 1 / 100, 1e-9);
  assert.equal(sharedProbability(101, 100), 1);
});

check('target 0 needs 1 person', () => {
  assert.equal(peopleForProbability(0), 1);
});

check('validation', () => {
  assert.throws(() => sharedProbability(-1), /non-negative integer/);
  assert.throws(() => sharedProbability(2.5), /integer/);
  assert.throws(() => sharedProbability(5, 0), /days/);
  assert.throws(() => peopleForProbability(1.5), /between 0 and 1/);
});

console.log(`\n${n} checks passed.`);
