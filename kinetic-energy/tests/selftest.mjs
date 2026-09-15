import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { kineticEnergy, momentum, velocityFromKE, massFromKE } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, e = 1e-9) => assert.ok(Math.abs(a - b) <= e, `${a} vs ${b}`);

check('KE = ½mv²', () => {
  near(kineticEnergy(2, 3), 9);
  near(kineticEnergy(1, 1), 0.5);
});

check('a 1000 kg car at 20 m/s has 200 kJ', () => {
  near(kineticEnergy(1000, 20), 200000);
});

check('momentum = mv', () => {
  near(momentum(2, 3), 6);
  near(momentum(1000, 20), 20000);
});

check('velocityFromKE inverts kineticEnergy', () => {
  near(velocityFromKE(9, 2), 3);
  near(velocityFromKE(kineticEnergy(5, 7), 5), 7);
});

check('massFromKE inverts kineticEnergy', () => {
  near(massFromKE(9, 3), 2);
  near(massFromKE(kineticEnergy(4, 6), 6), 4);
});

check('KE scales with v² (double speed → 4× energy)', () => {
  near(kineticEnergy(10, 4), 4 * kineticEnergy(10, 2));
});

check('KE scales linearly with mass', () => {
  near(kineticEnergy(20, 5), 2 * kineticEnergy(10, 5));
});

check('momentum is linear in mass and velocity', () => {
  near(momentum(20, 5), 2 * momentum(10, 5));
  near(momentum(10, 10), 2 * momentum(10, 5));
});

check('the identity KE = p²/(2m)', () => {
  const m = 12, v = 7;
  near(kineticEnergy(m, v), Math.pow(momentum(m, v), 2) / (2 * m));
});

check('validation: bad mass, KE, and zero velocity throw', () => {
  assert.throws(() => kineticEnergy(0, 5), /mass must be positive/);
  assert.throws(() => kineticEnergy(1, NaN), /finite number/);
  assert.throws(() => velocityFromKE(-1, 2), /zero or positive/);
  assert.throws(() => massFromKE(9, 0), /velocity cannot be zero/);
});

console.log(`\n${n} checks passed.`);
