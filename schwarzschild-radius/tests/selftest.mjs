import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { G, C, SOLAR_MASS, EARTH_MASS, schwarzschildRadius, massForRadius } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, e) => assert.ok(Math.abs(a - b) <= e, `${a} vs ${b}`);
const rel = (a, b, p = 1e-6) => assert.ok(Math.abs(a - b) <= Math.abs(b) * p, `${a} vs ${b}`);

check('r = 2GM/c²', () => {
  rel(schwarzschildRadius(1e30), 2 * G * 1e30 / (C * C));
});

check('the Sun is about 2.95 km', () => {
  const r = schwarzschildRadius(SOLAR_MASS);
  assert.ok(r > 2940 && r < 2960, `${r}`);
});

check('the Earth is about 8.9 mm', () => {
  const r = schwarzschildRadius(EARTH_MASS);
  assert.ok(Math.abs(r - 0.00887) < 5e-5, `${r}`);
});

check('radius scales linearly with mass', () => {
  rel(schwarzschildRadius(2e30), 2 * schwarzschildRadius(1e30));
  rel(schwarzschildRadius(10 * SOLAR_MASS), 10 * schwarzschildRadius(SOLAR_MASS));
});

check('massForRadius inverts schwarzschildRadius', () => {
  for (const m of [70, EARTH_MASS, SOLAR_MASS, 4.1e6 * SOLAR_MASS]) {
    rel(massForRadius(schwarzschildRadius(m)), m);
  }
});

check('a 1 m event horizon needs a specific mass', () => {
  rel(massForRadius(1), C * C / (2 * G));
});

check('a 70 kg person has a sub-atomic radius', () => {
  const r = schwarzschildRadius(70);
  assert.ok(r > 0 && r < 1e-24, `${r}`);
});

check('Sagittarius A* (4.1M suns) is on the order of astronomical units', () => {
  const r = schwarzschildRadius(4.1e6 * SOLAR_MASS);
  assert.ok(r > 1e10 && r < 1e11, `${r}`); // ~1.2e10 m
});

check('physical constants are set correctly', () => {
  near(G, 6.67430e-11, 1e-16);
  assert.equal(C, 299792458);
});

check('validation: non-positive mass and radius throw', () => {
  assert.throws(() => schwarzschildRadius(0), /mass must be positive/);
  assert.throws(() => schwarzschildRadius(-5), /mass must be positive/);
  assert.throws(() => massForRadius(0), /radius must be positive/);
});

console.log(`\n${n} checks passed.`);
