import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { FACTOR, mgdlToMmol, mmolToMgdl, fastingCategory } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps = 0.01) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b}`);

check('mg/dL → mmol/L divides by 18.0182', () => {
  near(mgdlToMmol(180), 180 / 18.0182); // ≈ 9.99
  near(mgdlToMmol(90), 90 / 18.0182);   // ≈ 4.99
  near(mgdlToMmol(100), 5.55);
});

check('mmol/L → mg/dL multiplies by 18.0182', () => {
  near(mmolToMgdl(10), 180.182);
  near(mmolToMgdl(5.5), 99.1);
});

check('conversions round-trip', () => {
  near(mmolToMgdl(mgdlToMmol(126)), 126, 1e-9);
  near(mgdlToMmol(mmolToMgdl(7)), 7, 1e-9);
});

check('fasting categories at ADA thresholds', () => {
  assert.equal(fastingCategory(60), 'Low');
  assert.equal(fastingCategory(69), 'Low');
  assert.equal(fastingCategory(70), 'Normal');
  assert.equal(fastingCategory(99), 'Normal');
  assert.equal(fastingCategory(100), 'Prediabetes');
  assert.equal(fastingCategory(125), 'Prediabetes');
  assert.equal(fastingCategory(126), 'Diabetes');
  assert.equal(fastingCategory(300), 'Diabetes');
});

check('FACTOR is the glucose molar mass ratio', () => {
  near(FACTOR, 18.0182);
});

check('rejects negative values', () => {
  assert.throws(() => mgdlToMmol(-1), /non-negative/);
  assert.throws(() => mmolToMgdl(-1), /non-negative/);
  assert.throws(() => fastingCategory(-5), /non-negative/);
});

check('zero is valid', () => {
  assert.equal(mgdlToMmol(0), 0);
  assert.equal(mmolToMgdl(0), 0);
  assert.equal(fastingCategory(0), 'Low');
});

check('a normal fasting reading (90 mg/dL) categorizes Normal', () => {
  assert.equal(fastingCategory(90), 'Normal');
});

check('7.0 mmol/L is diabetic (≈126 mg/dL)', () => {
  const mgdl = mmolToMgdl(7.0);
  assert.ok(mgdl >= 126);
  assert.equal(fastingCategory(mgdl), 'Diabetes');
});

check('5.5 mmol/L (~99 mg/dL) is Normal', () => {
  assert.equal(fastingCategory(mmolToMgdl(5.5)), 'Normal');
});

console.log(`\n${n} checks passed.`);
