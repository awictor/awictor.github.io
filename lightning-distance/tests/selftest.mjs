import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { speedOfSound, distanceMeters, distanceKm, distanceMiles } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b} (±${eps})`);

check('speed of sound (Cramer approximation)', () => {
  near(speedOfSound(20), 331.3 + 0.606 * 20, 1e-9);   // 343.42
  near(speedOfSound(0), 331.3, 1e-9);
});

check('distance in metres = speed × seconds', () => {
  near(distanceMeters(3, 20), speedOfSound(20) * 3, 1e-9);   // ≈ 1030 m
});

check('~3 seconds ≈ 1 km rule of thumb', () => {
  const km = distanceKm(3, 20);
  assert.ok(km > 0.95 && km < 1.1);
});

check('~5 seconds ≈ 1 mile rule of thumb', () => {
  const mi = distanceMiles(5, 20);
  assert.ok(mi > 0.95 && mi < 1.1);
});

check('km and miles are consistent', () => {
  near(distanceKm(10, 20) * 1000 / 1609.344, distanceMiles(10, 20), 1e-9);
});

check('zero delay = zero distance', () => {
  assert.equal(distanceMeters(0, 20), 0);
});

check('colder air → slower sound → shorter distance', () => {
  assert.ok(distanceMeters(5, -10) < distanceMeters(5, 30));
});

check('distance scales linearly with seconds', () => {
  near(distanceMeters(10, 20), 2 * distanceMeters(5, 20), 1e-9);
});

check('hotter air speeds sound up', () => {
  assert.ok(speedOfSound(35) > speedOfSound(15));
});

check('validation', () => {
  assert.throws(() => distanceMeters(-1, 20), /non-negative/);
  assert.throws(() => speedOfSound('x'), /numbers/);
});

console.log(`\n${n} checks passed.`);
