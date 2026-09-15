import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { ageComponent, chadsvasc, strokeRisk, recommendation } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('age component: <65 = 0, 65–74 = 1, ≥75 = 2', () => {
  assert.equal(ageComponent(50), 0);
  assert.equal(ageComponent(64), 0);
  assert.equal(ageComponent(65), 1);
  assert.equal(ageComponent(74), 1);
  assert.equal(ageComponent(75), 2);
  assert.equal(ageComponent(90), 2);
});

check('healthy young male scores 0', () => {
  assert.equal(chadsvasc({ age: 50, female: false }), 0);
});

check('female sex adds exactly 1', () => {
  assert.equal(chadsvasc({ age: 50, female: true }), 1);
});

check('each 1-point factor adds 1', () => {
  const base = { age: 50, female: false };
  assert.equal(chadsvasc({ ...base, chf: true }), 1);
  assert.equal(chadsvasc({ ...base, htn: true }), 1);
  assert.equal(chadsvasc({ ...base, diabetes: true }), 1);
  assert.equal(chadsvasc({ ...base, vascular: true }), 1);
});

check('stroke history adds 2', () => {
  assert.equal(chadsvasc({ age: 50, female: false, stroke: true }), 2);
});

check('age contributes 2 (not 1) at ≥75 and does not double count', () => {
  assert.equal(chadsvasc({ age: 80, female: false }), 2);
  assert.equal(chadsvasc({ age: 70, female: false }), 1);
});

check('maximum score is 9', () => {
  assert.equal(chadsvasc({
    age: 80, female: true, chf: true, htn: true, diabetes: true, stroke: true, vascular: true
  }), 9);
});

check('stroke risk table', () => {
  assert.equal(strokeRisk(0), 0);
  assert.equal(strokeRisk(1), 1.3);
  assert.equal(strokeRisk(2), 2.2);
  assert.equal(strokeRisk(9), 15.2);
  assert.equal(strokeRisk(12), 15.2); // clamps to 9
});

check('recommendation by sex-specific thresholds', () => {
  assert.equal(recommendation(0, false).level, 'none');
  assert.equal(recommendation(1, false).level, 'consider');
  assert.equal(recommendation(2, false).level, 'recommended');
  assert.equal(recommendation(1, true).level, 'none');      // female, sex-only = low risk
  assert.equal(recommendation(2, true).level, 'consider');
  assert.equal(recommendation(3, true).level, 'recommended');
});

check('invalid age throws', () => {
  assert.throws(() => ageComponent('x'), /number/);
  assert.throws(() => chadsvasc({ age: 'abc' }), /number/);
});

console.log(`\n${n} checks passed.`);
