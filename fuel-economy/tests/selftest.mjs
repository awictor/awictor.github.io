import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { US, UK, toL100km, fromL100km, convert, all } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, tol = 1e-3) => assert.ok(Math.abs(a - b) <= tol, `${a} not within ${tol} of ${b}`);

check('constants derive from exact gallon/mile definitions', () => {
  near(US, (3.785411784 * 100) / 1.609344, 1e-4);
  near(UK, (4.54609 * 100) / 1.609344, 1e-4);
});

check('30 US MPG is about 7.84 L/100 km', () => {
  near(convert(30, 'mpg_us', 'l_100km'), 7.8405, 1e-3);
});

check('30 US MPG is about 12.75 km/L', () => {
  near(convert(30, 'mpg_us', 'km_l'), 12.7543, 1e-3);
});

check('US MPG to Imperial MPG uses the ~1.201 gallon ratio', () => {
  near(convert(30, 'mpg_us', 'mpg_uk'), 30 * 1.200950, 1e-2);
});

check('L/100 km and km/L are reciprocals through 100', () => {
  assert.equal(convert(20, 'km_l', 'l_100km'), 5);
  assert.equal(convert(5, 'l_100km', 'km_l'), 20);
});

check('same-unit conversion is identity', () => {
  for (const u of ['mpg_us', 'mpg_uk', 'l_100km', 'km_l']) assert.equal(convert(42, u, u), 42);
});

check('conversions round-trip', () => {
  const pairs = [['mpg_us', 'l_100km'], ['mpg_uk', 'km_l'], ['l_100km', 'mpg_us'], ['km_l', 'mpg_uk']];
  for (const [a, b] of pairs) near(convert(convert(33, a, b), b, a), 33, 1e-6);
});

check('toL100km / fromL100km invert each other', () => {
  near(fromL100km(toL100km(25, 'mpg_us'), 'mpg_us'), 25, 1e-6);
  near(toL100km(fromL100km(6, 'km_l'), 'km_l'), 6, 1e-6);
});

check('all() returns every representation at once', () => {
  const r = all(30, 'mpg_us');
  assert.deepEqual(Object.keys(r).sort(), ['km_l', 'l_100km', 'mpg_uk', 'mpg_us']);
  near(r.l_100km, 7.8405, 1e-3);
  near(r.mpg_us, 30, 1e-9);
});

check('validation: non-positive values and unknown units throw', () => {
  assert.throws(() => convert(0, 'mpg_us', 'km_l'), /positive number/);
  assert.throws(() => convert(-5, 'mpg_us', 'km_l'), /positive number/);
  assert.throws(() => convert(30, 'mpg_us', 'furlongs_per_firkin'), /unknown unit/);
});

console.log(`\n${n} checks passed.`);
