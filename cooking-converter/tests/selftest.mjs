import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { FACTORS, toMl, fromMl, convert, all } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, tol = 1e-6) => assert.ok(Math.abs(a - b) <= tol * Math.max(1, Math.abs(b)), `${a} not near ${b}`);

check('base factors', () => {
  assert.equal(FACTORS.ml, 1);
  assert.equal(FACTORS.l, 1000);
  near(FACTORS.cup, 236.5882365);
});

check('1 tbsp = 3 tsp', () => {
  near(convert(1, 'tbsp', 'tsp'), 3);
});

check('1 fl oz = 2 tbsp', () => {
  near(convert(1, 'floz', 'tbsp'), 2);
});

check('1 cup = 16 tbsp = 48 tsp = 8 fl oz', () => {
  near(convert(1, 'cup', 'tbsp'), 16);
  near(convert(1, 'cup', 'tsp'), 48);
  near(convert(1, 'cup', 'floz'), 8);
});

check('1 cup ≈ 236.59 ml', () => {
  near(convert(1, 'cup', 'ml'), 236.5882365);
});

check('1 L = 1000 ml', () => {
  assert.equal(convert(1, 'l', 'ml'), 1000);
});

check('same-unit conversion is identity', () => {
  for (const u of Object.keys(FACTORS)) near(convert(42, u, u), 42, 1e-12);
});

check('conversions round-trip', () => {
  for (const [a, b] of [['cup', 'ml'], ['tsp', 'floz'], ['l', 'cup'], ['tbsp', 'tsp']]) {
    near(convert(convert(2.5, a, b), b, a), 2.5, 1e-9);
  }
});

check('all() returns every unit with the source preserved', () => {
  const r = all(1, 'cup');
  assert.deepEqual(Object.keys(r).sort(), Object.keys(FACTORS).sort());
  assert.equal(r.cup, 1);
  near(r.ml, 236.5882365);
});

check('validation: unknown unit and non-number throw', () => {
  assert.throws(() => convert(1, 'cup', 'gallon'), /unknown unit/);
  assert.throws(() => convert(NaN, 'cup', 'ml'), /finite number/);
});

console.log(`\n${n} checks passed.`);
