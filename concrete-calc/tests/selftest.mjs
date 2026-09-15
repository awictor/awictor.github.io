import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { cubicFeet, cubicYards, cubicMeters, cubicMetersFromM, bagsNeeded, withWaste } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b} (±${eps})`);

check('cubic feet from L(ft) × W(ft) × T(in)', () => {
  near(cubicFeet(10, 10, 4), 100 * (4 / 12), 1e-9);   // 33.33
  near(cubicFeet(10, 10, 12), 100, 1e-9);             // 12in = 1ft
});

check('cubic yards = cubic feet / 27', () => {
  near(cubicYards(27), 1, 1e-9);
  near(cubicYards(cubicFeet(9, 3, 12)), 1, 1e-9);     // 9×3×1 = 27 ft³ = 1 yd³
});

check('cubic meters conversion', () => {
  near(cubicMeters(1), 0.0283168, 1e-7);
  near(cubicMeters(35.3147), 1, 1e-3);                // ~1 m³
});

check('metric volume from metres', () => {
  near(cubicMetersFromM(3, 3, 10), 3 * 3 * 0.1, 1e-9);   // 0.9 m³ (10 cm)
});

check('bags needed rounds up', () => {
  assert.equal(bagsNeeded(6, 0.6), 10);
  assert.equal(bagsNeeded(33.33, 0.6), 56);           // ceil(55.55)
  assert.equal(bagsNeeded(0.3, 0.3), 1);
});

check('different bag yields', () => {
  assert.equal(bagsNeeded(3, 0.30), 10);
  assert.equal(bagsNeeded(3, 0.45), 7);               // ceil(6.67)
  assert.equal(bagsNeeded(3, 0.60), 5);
});

check('zero volume needs no bags', () => {
  assert.equal(bagsNeeded(0, 0.6), 0);
});

check('waste allowance', () => {
  near(withWaste(100, 10), 110, 1e-9);
  near(withWaste(100, 0), 100, 1e-9);
});

check('volume scales with each dimension', () => {
  near(cubicFeet(20, 10, 4), 2 * cubicFeet(10, 10, 4), 1e-9);
  near(cubicFeet(10, 10, 8), 2 * cubicFeet(10, 10, 4), 1e-9);
});

check('validation', () => {
  assert.throws(() => bagsNeeded(10, 0), /positive/);
  assert.throws(() => cubicFeet('x', 10, 4), /numbers/);
});

console.log(`\n${n} checks passed.`);
