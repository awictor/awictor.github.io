import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { G, escapeVelocity, orbitalVelocity } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, e) => assert.ok(Math.abs(a - b) <= e, `${a} vs ${b}`);
const rel = (a, b, p = 1e-9) => assert.ok(Math.abs(a - b) <= Math.abs(b) * p, `${a} vs ${b}`);

const EARTH_M = 5.972e24, EARTH_R = 6.371e6;

check('v = √(2GM/r)', () => {
  rel(escapeVelocity(EARTH_M, EARTH_R), Math.sqrt(2 * G * EARTH_M / EARTH_R));
});

check("Earth's escape velocity ≈ 11.2 km/s", () => {
  const v = escapeVelocity(EARTH_M, EARTH_R);
  assert.ok(v > 11100 && v < 11250, `${v}`);
});

check("the Moon's is ≈ 2.38 km/s", () => {
  const v = escapeVelocity(7.342e22, 1.737e6);
  assert.ok(v > 2350 && v < 2410, `${v}`);
});

check('orbital velocity = escape / √2', () => {
  rel(orbitalVelocity(EARTH_M, EARTH_R), escapeVelocity(EARTH_M, EARTH_R) / Math.SQRT2);
});

check('Earth low-orbit velocity ≈ 7.9 km/s', () => {
  const v = orbitalVelocity(EARTH_M, EARTH_R);
  assert.ok(v > 7800 && v < 7950, `${v}`);
});

check('escape = orbital × √2', () => {
  rel(escapeVelocity(EARTH_M, EARTH_R), orbitalVelocity(EARTH_M, EARTH_R) * Math.SQRT2);
});

check('scales with √M (4× mass → 2× velocity)', () => {
  rel(escapeVelocity(4 * EARTH_M, EARTH_R), 2 * escapeVelocity(EARTH_M, EARTH_R));
});

check('scales with 1/√r (4× radius → half velocity)', () => {
  rel(escapeVelocity(EARTH_M, 4 * EARTH_R), escapeVelocity(EARTH_M, EARTH_R) / 2);
});

check("the Sun's surface escape velocity exceeds 600 km/s", () => {
  const v = escapeVelocity(1.989e30, 6.9634e8);
  assert.ok(v > 600000, `${v}`);
});

check('validation: non-positive mass and radius throw', () => {
  assert.throws(() => escapeVelocity(0, EARTH_R), /mass must be positive/);
  assert.throws(() => escapeVelocity(EARTH_M, 0), /radius must be positive/);
  assert.throws(() => orbitalVelocity(-1, EARTH_R), /mass must be positive/);
});

console.log(`\n${n} checks passed.`);
