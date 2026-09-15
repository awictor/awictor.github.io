import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { UMOL_PER_MGDL, cockcroftGault, crclFrom, category } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b} (±${eps})`);

check('reference: 60y, 70kg, Scr 1.0, male ≈ 77.8', () => {
  near(cockcroftGault(60, 70, 1.0, 'male'), 5600 / 72, 1e-6);   // ≈ 77.78
});

check('female multiplier 0.85', () => {
  near(cockcroftGault(60, 70, 1.0, 'female'), (5600 / 72) * 0.85, 1e-6);
});

check('reference: 40y, 80kg, Scr 1.2, male ≈ 92.6', () => {
  near(cockcroftGault(40, 80, 1.2, 'male'), 8000 / 86.4, 1e-6);
});

check('CrCl falls as creatinine rises', () => {
  assert.ok(cockcroftGault(50, 70, 1.5, 'male') < cockcroftGault(50, 70, 1.0, 'male'));
});

check('CrCl falls with age, rises with weight', () => {
  assert.ok(cockcroftGault(80, 70, 1, 'male') < cockcroftGault(40, 70, 1, 'male'));
  assert.ok(cockcroftGault(50, 90, 1, 'male') > cockcroftGault(50, 60, 1, 'male'));
});

check('µmol/L input converts', () => {
  near(crclFrom(60, 70, 1.0 * UMOL_PER_MGDL, 'umol', 'male'), cockcroftGault(60, 70, 1.0, 'male'), 1e-6);
  near(crclFrom(60, 70, 1.0, 'mgdl', 'male'), cockcroftGault(60, 70, 1.0, 'male'), 1e-9);
});

check('category bands', () => {
  assert.equal(category(100).name, 'Normal');
  assert.equal(category(75).name, 'Mildly decreased');
  assert.equal(category(45).name, 'Moderately decreased');
  assert.equal(category(20).name, 'Severely decreased');
  assert.equal(category(10).name, 'Kidney failure');
});

check('category boundaries inclusive at floor', () => {
  assert.equal(category(90).name, 'Normal');
  assert.equal(category(60).name, 'Mildly decreased');
  assert.equal(category(30).name, 'Moderately decreased');
  assert.equal(category(15).name, 'Severely decreased');
});

check('validation', () => {
  assert.throws(() => cockcroftGault(0, 70, 1, 'male'), /age/);
  assert.throws(() => cockcroftGault(60, 0, 1, 'male'), /weight/);
  assert.throws(() => cockcroftGault(60, 70, 0, 'male'), /creatinine/);
  assert.throws(() => cockcroftGault(60, 70, 1, 'other'), /sex/);
});

check('female is always lower than male, same inputs', () => {
  near(cockcroftGault(55, 75, 1.1, 'female') / cockcroftGault(55, 75, 1.1, 'male'), 0.85, 1e-9);
});

console.log(`\n${n} checks passed.`);
