import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { UMOL_PER_MGDL, egfr, egfrFrom, stage } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b} (±${eps})`);

check('CKD-EPI 2021 reference: male, 60y, Scr 1.2 ≈ 69.2', () => {
  near(egfr(1.2, 60, 'male'), 69.2, 0.5);
});

check('CKD-EPI 2021 reference: female, 60y, Scr 1.2 ≈ 51.8', () => {
  near(egfr(1.2, 60, 'female'), 51.8, 0.5);
});

check('low creatinine gives high eGFR (female, 40y, Scr 0.6 ≈ 116)', () => {
  near(egfr(0.6, 40, 'female'), 116.3, 0.6);
});

check('sex changes the result at identical inputs', () => {
  assert.notEqual(egfr(1.2, 60, 'male').toFixed(2), egfr(1.2, 60, 'female').toFixed(2));
});

check('eGFR decreases as creatinine rises', () => {
  assert.ok(egfr(1.5, 50, 'male') < egfr(1.0, 50, 'male'));
});

check('eGFR decreases with age', () => {
  assert.ok(egfr(1.0, 70, 'male') < egfr(1.0, 40, 'male'));
});

check('µmol/L input converts correctly', () => {
  // 1.2 mg/dL == 1.2 * 88.42 µmol/L
  near(egfrFrom(1.2 * UMOL_PER_MGDL, 'umol', 60, 'male'), egfr(1.2, 60, 'male'), 1e-6);
  near(egfrFrom(1.2, 'mgdl', 60, 'male'), egfr(1.2, 60, 'male'), 1e-6);
});

check('CKD stage bands', () => {
  assert.equal(stage(95).stage, 'G1');
  assert.equal(stage(75).stage, 'G2');
  assert.equal(stage(50).stage, 'G3a');
  assert.equal(stage(35).stage, 'G3b');
  assert.equal(stage(20).stage, 'G4');
  assert.equal(stage(10).stage, 'G5');
});

check('CKD stage boundaries are inclusive at the floor', () => {
  assert.equal(stage(90).stage, 'G1');
  assert.equal(stage(60).stage, 'G2');
  assert.equal(stage(45).stage, 'G3a');
  assert.equal(stage(30).stage, 'G3b');
  assert.equal(stage(15).stage, 'G4');
  assert.equal(stage(14.9).stage, 'G5');
});

check('validation', () => {
  assert.throws(() => egfr(0, 50, 'male'), /creatinine/);
  assert.throws(() => egfr(1, 0, 'male'), /age/);
  assert.throws(() => egfr(1, 50, 'other'), /sex/);
  assert.throws(() => egfr('x', 50, 'male'), /numbers/);
});

console.log(`\n${n} checks passed.`);
