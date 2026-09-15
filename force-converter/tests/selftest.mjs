import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { FACTORS, toNewtons, fromNewtons, convert, all } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, tol = 1e-5) => assert.ok(Math.abs(a - b) <= tol * Math.max(1, Math.abs(b)), `${a} not near ${b}`);

check('base factors', () => {
  assert.equal(FACTORS.N, 1);
  assert.equal(FACTORS.kN, 1000);
  assert.equal(FACTORS.kgf, 9.80665);
});

check('1 kgf = 9.80665 N', () => {
  assert.equal(convert(1, 'kgf', 'N'), 9.80665);
});

check('1 lbf ~ 4.44822 N', () => {
  near(convert(1, 'lbf', 'N'), 4.4482216152605);
});

check('1 N = 100000 dyne', () => {
  near(convert(1, 'N', 'dyne'), 100000);
});

check('1 kgf ~ 2.20462 lbf (mirrors kg->lb)', () => {
  near(convert(1, 'kgf', 'lbf'), 9.80665 / 4.4482216152605); // ~2.20462
});

check('16 ozf = 1 lbf', () => {
  near(convert(16, 'ozf', 'lbf'), 1);
});

check('kN scaling', () => {
  assert.equal(convert(1, 'kN', 'N'), 1000);
  assert.equal(convert(2.5, 'kN', 'N'), 2500);
});

check('same-unit conversion is identity', () => {
  for (const u of Object.keys(FACTORS)) near(convert(42, u, u), 42, 1e-12);
});

check('conversions round-trip', () => {
  for (const [a, b] of [['kgf', 'lbf'], ['N', 'dyne'], ['lbf', 'N'], ['kN', 'kgf']]) {
    near(convert(convert(7, a, b), b, a), 7, 1e-9);
  }
});

check('validation: unknown unit and non-number throw', () => {
  assert.throws(() => convert(1, 'N', 'poundal'), /unknown unit/);
  assert.throws(() => convert(NaN, 'N', 'kgf'), /finite number/);
});

console.log(`\n${n} checks passed.`);
