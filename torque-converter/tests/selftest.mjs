import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { FACTORS, toNm, fromNm, convert, all } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, tol = 1e-5) => assert.ok(Math.abs(a - b) <= tol * Math.max(1, Math.abs(b)), `${a} not near ${b}`);

check('base factors', () => {
  assert.equal(FACTORS.Nm, 1);
  assert.equal(FACTORS.kgfm, 9.80665);
  near(FACTORS.lbfft, 1.3558179483);
});

check('1 lbf·ft ~ 1.35582 N·m', () => {
  near(convert(1, 'lbfft', 'Nm'), 1.3558179483);
});

check('1 kgf·m = 9.80665 N·m', () => {
  assert.equal(convert(1, 'kgfm', 'Nm'), 9.80665);
});

check('1 lbf·ft = 12 lbf·in', () => {
  near(convert(1, 'lbfft', 'lbfin'), 12);
});

check('1 lbf·in = 16 ozf·in', () => {
  near(convert(1, 'lbfin', 'ozfin'), 16);
});

check('100 N·m ~ 73.756 lbf·ft', () => {
  near(convert(100, 'Nm', 'lbfft'), 100 / 1.3558179483);
});

check('kN·m scaling', () => {
  assert.equal(convert(1, 'kNm', 'Nm'), 1000);
});

check('same-unit conversion is identity', () => {
  for (const u of Object.keys(FACTORS)) near(convert(42, u, u), 42, 1e-12);
});

check('conversions round-trip', () => {
  for (const [a, b] of [['Nm', 'lbfft'], ['kgfm', 'lbfin'], ['lbfft', 'ozfin'], ['kNm', 'Nm']]) {
    near(convert(convert(7, a, b), b, a), 7, 1e-9);
  }
});

check('validation: unknown unit and non-number throw', () => {
  assert.throws(() => convert(1, 'Nm', 'joules'), /unknown unit/);
  assert.throws(() => convert(NaN, 'Nm', 'lbfft'), /finite number/);
});

console.log(`\n${n} checks passed.`);
