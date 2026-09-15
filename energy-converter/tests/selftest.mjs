import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { FACTORS, toJoules, fromJoules, convert, all } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, tol = 1e-6) => assert.ok(Math.abs(a - b) <= tol * Math.max(1, Math.abs(b)), `${a} not within of ${b}`);

check('base factors', () => {
  assert.equal(FACTORS.J, 1);
  assert.equal(FACTORS.kWh, 3600000);
  assert.equal(FACTORS.kcal, 4184);
});

check('1 kWh = 3,600,000 J = 3600 kJ', () => {
  assert.equal(convert(1, 'kWh', 'J'), 3600000);
  near(convert(1, 'kWh', 'kJ'), 3600);
});

check('1 kcal = 4184 J = 1000 cal', () => {
  assert.equal(convert(1, 'kcal', 'J'), 4184);
  near(convert(1, 'kcal', 'cal'), 1000);
});

check('1 cal = 4.184 J', () => {
  near(convert(1, 'cal', 'J'), 4.184);
});

check('1 BTU ~ 1055.06 J', () => {
  near(convert(1, 'BTU', 'J'), 1055.05585262);
});

check('1 kWh ~ 860.42 kcal and ~3412.14 BTU', () => {
  near(convert(1, 'kWh', 'kcal'), 3600000 / 4184);
  near(convert(1, 'kWh', 'BTU'), 3600000 / 1055.05585262);
});

check('electronvolt is tiny but round-trips', () => {
  near(convert(1, 'eV', 'J'), 1.602176634e-19);
  near(convert(convert(5, 'J', 'eV'), 'eV', 'J'), 5);
});

check('same-unit conversion is identity', () => {
  for (const u of Object.keys(FACTORS)) near(convert(42, u, u), 42);
});

check('all() returns every unit with the source preserved', () => {
  const r = all(1, 'kWh');
  assert.deepEqual(Object.keys(r).sort(), Object.keys(FACTORS).sort());
  assert.equal(r.kWh, 1);
  assert.equal(r.J, 3600000);
});

check('validation: unknown unit and non-number throw', () => {
  assert.throws(() => convert(1, 'kWh', 'horsepower'), /unknown unit/);
  assert.throws(() => convert(NaN, 'J', 'cal'), /finite number/);
});

console.log(`\n${n} checks passed.`);
