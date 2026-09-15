import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { FACTORS, toPa, fromPa, convert, all } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, tol = 1e-3) => assert.ok(Math.abs(a - b) <= tol, `${a} not within ${tol} of ${b}`);

check('exact base factors: atm=101325, bar=100000, Pa=1', () => {
  assert.equal(FACTORS.Pa, 1);
  assert.equal(FACTORS.bar, 100000);
  assert.equal(FACTORS.atm, 101325);
});

check('1 atm = 101325 Pa and 1 bar = 100000 Pa', () => {
  assert.equal(convert(1, 'atm', 'Pa'), 101325);
  assert.equal(convert(1, 'bar', 'Pa'), 100000);
});

check('1 atm ~ 760 mmHg (conventional mmHg factor)', () => {
  near(convert(1, 'atm', 'mmHg'), 760, 1e-2);
});

check('1 atm ~ 14.6959 psi', () => {
  near(convert(1, 'atm', 'psi'), 14.6959, 1e-3);
});

check('1 bar ~ 14.5038 psi', () => {
  near(convert(1, 'bar', 'psi'), 14.5038, 1e-3);
});

check('1 atm = 101.325 kPa = 1.01325 bar', () => {
  near(convert(1, 'atm', 'kPa'), 101.325);
  near(convert(1, 'atm', 'bar'), 1.01325);
});

check('same-unit conversion is identity', () => {
  for (const u of Object.keys(FACTORS)) near(convert(42, u, u), 42, 1e-9);
});

check('conversions round-trip', () => {
  const pairs = [['atm', 'psi'], ['bar', 'mmHg'], ['psi', 'kPa'], ['inHg', 'Pa']];
  for (const [a, b] of pairs) near(convert(convert(3.5, a, b), b, a), 3.5, 1e-9);
});

check('all() returns every unit, with the source preserved', () => {
  const r = all(1, 'atm');
  assert.deepEqual(Object.keys(r).sort(), Object.keys(FACTORS).sort());
  assert.equal(r.atm, 1);
  assert.equal(r.Pa, 101325);
});

check('validation: unknown unit and non-number throw', () => {
  assert.throws(() => convert(1, 'atm', 'kelvin'), /unknown unit/);
  assert.throws(() => convert(1, 'psia', 'Pa'), /unknown unit/);
  assert.throws(() => convert(NaN, 'atm', 'Pa'), /finite number/);
});

console.log(`\n${n} checks passed.`);
