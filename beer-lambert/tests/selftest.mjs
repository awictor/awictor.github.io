import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { absorbance, transmittance, absorbanceFromTransmittance, concentration, pathLength } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, e = 1e-9) => assert.ok(Math.abs(a - b) <= e, `${a} vs ${b}`);

check('A = ε·c·l', () => {
  near(absorbance(1000, 0.001, 1), 1);
  near(absorbance(1000, 0.0005, 1), 0.5);
});

check('transmittance = 10^(-A)', () => {
  near(transmittance(1), 0.1);
  near(transmittance(2), 0.01);
  near(transmittance(0), 1);
});

check('A = 0.5 → T ≈ 0.31623', () => {
  near(transmittance(0.5), Math.pow(10, -0.5));
  assert.ok(Math.abs(transmittance(0.5) - 0.316228) < 1e-5);
});

check('absorbanceFromTransmittance inverts transmittance', () => {
  for (const A of [0, 0.3, 1, 2.5]) near(absorbanceFromTransmittance(transmittance(A)), A);
});

check('absorbance is linear in concentration and path length', () => {
  near(absorbance(1000, 0.002, 1), 2 * absorbance(1000, 0.001, 1));
  near(absorbance(1000, 0.001, 3), 3 * absorbance(1000, 0.001, 1));
});

check('concentration = A/(ε·l) inverts absorbance', () => {
  near(concentration(1, 1000, 1), 0.001);
  const A = absorbance(5000, 0.0004, 2);
  near(concentration(A, 5000, 2), 0.0004);
});

check('path length = A/(ε·c) inverts absorbance', () => {
  near(pathLength(1, 1000, 0.001), 1);
  const A = absorbance(1200, 0.0003, 5);
  near(pathLength(A, 1200, 0.0003), 5);
});

check('zero concentration gives zero absorbance and full transmittance', () => {
  near(absorbance(1000, 0, 1), 0);
  near(transmittance(0), 1);
});

check('%T from a measured concentration workflow', () => {
  const A = absorbance(2000, 0.0005, 1); // 1.0
  near(A, 1);
  near(transmittance(A) * 100, 10);
});

check('validation: negatives, bad transmittance, zero divisors throw', () => {
  assert.throws(() => absorbance(-1, 0.001, 1), /zero or positive/);
  assert.throws(() => transmittance(-0.5), /zero or positive/);
  assert.throws(() => absorbanceFromTransmittance(0), /between 0 and 1/);
  assert.throws(() => absorbanceFromTransmittance(1.5), /between 0 and 1/);
  assert.throws(() => concentration(1, 0, 1), /must be positive/);
});

console.log(`\n${n} checks passed.`);
