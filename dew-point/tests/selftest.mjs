import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { dewPoint, relativeHumidity, dewComfort, cToF, fToC } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b} (±${eps})`);

check('dew point 20°C / 50% ≈ 9.26°C', () => {
  near(dewPoint(20, 50), 9.26, 0.05);
});

check('at 100% RH the dew point equals air temperature', () => {
  near(dewPoint(20, 100), 20, 1e-9);
  near(dewPoint(0, 100), 0, 1e-9);
  near(dewPoint(30, 100), 30, 1e-9);
});

check('dew point never exceeds air temperature (RH ≤ 100)', () => {
  assert.ok(dewPoint(25, 40) < 25);
  assert.ok(dewPoint(10, 90) < 10);
});

check('dew point rises with humidity', () => {
  assert.ok(dewPoint(20, 80) > dewPoint(20, 40));
});

check('relativeHumidity inverts dewPoint', () => {
  near(relativeHumidity(20, dewPoint(20, 50)), 50, 1e-6);
  near(relativeHumidity(25, dewPoint(25, 73)), 73, 1e-6);
});

check('RH is 100% when dew point equals temperature', () => {
  near(relativeHumidity(18, 18), 100, 1e-9);
});

check('temperature conversions', () => {
  near(cToF(0), 32, 1e-9);
  near(cToF(100), 212, 1e-9);
  near(fToC(32), 0, 1e-9);
  near(fToC(212), 100, 1e-9);
  near(fToC(cToF(37)), 37, 1e-9);
});

check('comfort tiers by dew point (°C)', () => {
  assert.equal(dewComfort(5), 'Dry');            // 41°F
  assert.equal(dewComfort(11), 'Very comfortable'); // 51.8°F
  assert.equal(dewComfort(14), 'Comfortable');   // 57.2°F
  assert.equal(dewComfort(20), 'Uncomfortable'); // 68°F
  assert.equal(dewComfort(25), 'Miserable');     // 77°F
});

check('comfort boundary at 50°F / 10°C', () => {
  assert.equal(dewComfort(9.9), 'Dry');
  assert.equal(dewComfort(10.1), 'Very comfortable');
});

check('validation throws on non-numeric input', () => {
  assert.throws(() => dewPoint('x', 50), /numbers/);
  assert.throws(() => relativeHumidity(20, 'y'), /numbers/);
});

console.log(`\n${n} checks passed.`);
