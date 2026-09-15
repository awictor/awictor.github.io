import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { FACTORS, toWatts, fromWatts, convert, all } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, tol = 1e-3) => assert.ok(Math.abs(a - b) <= tol * Math.max(1, Math.abs(b)), `${a} not near ${b}`);

check('base factors', () => {
  assert.equal(FACTORS.W, 1);
  assert.equal(FACTORS.kW, 1000);
  near(FACTORS.hp, 745.7);
});

check('1 hp (mechanical) ~ 745.7 W', () => {
  near(convert(1, 'hp', 'W'), 745.6998715822702);
});

check('1 kW ~ 1.34102 hp', () => {
  near(convert(1, 'kW', 'hp'), 1000 / 745.6998715822702);
});

check('1 PS (metric hp) = 735.49875 W', () => {
  near(convert(1, 'PS', 'W'), 735.49875);
});

check('mechanical hp is larger than metric hp', () => {
  assert.ok(convert(1, 'hp', 'W') > convert(1, 'PS', 'W'));
});

check('a 1-ton AC unit: 12000 BTU/h ~ 3.517 kW', () => {
  near(convert(12000, 'BTUh', 'kW'), 3.51685, 1e-2);
});

check('MW scaling', () => {
  assert.equal(convert(1, 'MW', 'kW'), 1000);
  assert.equal(convert(1, 'MW', 'W'), 1000000);
});

check('same-unit conversion is identity', () => {
  for (const u of Object.keys(FACTORS)) near(convert(42, u, u), 42, 1e-12);
});

check('conversions round-trip', () => {
  for (const [a, b] of [['hp', 'kW'], ['PS', 'W'], ['BTUh', 'hp'], ['ftlbs', 'W']]) {
    near(convert(convert(7, a, b), b, a), 7, 1e-9);
  }
});

check('validation: unknown unit and non-number throw', () => {
  assert.throws(() => convert(1, 'W', 'joules'), /unknown unit/);
  assert.throws(() => convert(NaN, 'W', 'kW'), /finite number/);
});

console.log(`\n${n} checks passed.`);
