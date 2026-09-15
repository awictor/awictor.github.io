import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { FACTORS, toMs, fromMs, convert, all } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, tol = 1e-4) => assert.ok(Math.abs(a - b) <= tol, `${a} not within ${tol} of ${b}`);

check('exact base factors (mile, nautical mile, foot)', () => {
  assert.equal(FACTORS.ms, 1);
  near(FACTORS.mph, 1609.344 / 3600);
  near(FACTORS.knot, 1852 / 3600);
  assert.equal(FACTORS.fts, 0.3048);
});

check('1 m/s = 3.6 km/h', () => {
  near(convert(1, 'ms', 'kmh'), 3.6);
});

check('100 km/h to m/s, mph, knots', () => {
  near(convert(100, 'kmh', 'ms'), 27.77778, 1e-3);
  near(convert(100, 'kmh', 'mph'), 62.13712, 1e-3);
  near(convert(100, 'kmh', 'knot'), 53.99568, 1e-3);
});

check('60 mph = 96.56064 km/h', () => {
  near(convert(60, 'mph', 'kmh'), 96.56064);
});

check('1 knot = 1.852 km/h', () => {
  near(convert(1, 'knot', 'kmh'), 1.852);
});

check('ft/s: 100 ft/s = 30.48 m/s', () => {
  near(convert(100, 'fts', 'ms'), 30.48);
});

check('same-unit conversion is identity', () => {
  for (const u of Object.keys(FACTORS)) near(convert(42, u, u), 42, 1e-9);
});

check('conversions round-trip', () => {
  const pairs = [['kmh', 'mph'], ['ms', 'knot'], ['mph', 'fts'], ['knot', 'kmh']];
  for (const [a, b] of pairs) near(convert(convert(55, a, b), b, a), 55, 1e-9);
});

check('all() returns every unit with the source preserved', () => {
  const r = all(100, 'kmh');
  assert.deepEqual(Object.keys(r).sort(), Object.keys(FACTORS).sort());
  assert.equal(r.kmh, 100);
});

check('validation: unknown unit and non-number throw', () => {
  assert.throws(() => convert(1, 'kmh', 'warp'), /unknown unit/);
  assert.throws(() => convert(NaN, 'kmh', 'ms'), /finite number/);
});

console.log(`\n${n} checks passed.`);
