import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { cubicFeet, cubicYards, cubicMeters, bagsNeeded } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b} (±${eps})`);

check('cubic feet = area × depth(in)/12', () => {
  near(cubicFeet(100, 3), 25, 1e-9);       // 100 sqft × 0.25 ft
  near(cubicFeet(50, 12), 50, 1e-9);       // 12in = 1ft
});

check('cubic yards = cubic feet / 27', () => {
  near(cubicYards(108, 3), 1, 1e-9);       // 108×0.25 = 27 ft³ = 1 yd³
  near(cubicYards(100, 3), 25 / 27, 1e-9);
});

check('one cubic yard covers ~100 sqft at ~3.24 in', () => {
  near(cubicYards(100, 3.24), 27 / 27 * (3.24 / 3) * (100 / 108) , 0.02); // sanity: close to 1
  assert.ok(cubicYards(100, 3.24) > 0.99 && cubicYards(100, 3.24) < 1.01);
});

check('cubic metres = area(m²) × depth(cm)/100', () => {
  near(cubicMeters(10, 5), 0.5, 1e-9);
  near(cubicMeters(18, 8), 18 * 0.08, 1e-9);
});

check('bags needed rounds up', () => {
  assert.equal(bagsNeeded(25, 2), 13);     // ceil(12.5)
  assert.equal(bagsNeeded(24, 2), 12);
  assert.equal(bagsNeeded(2, 2), 1);
});

check('zero volume needs no bags', () => {
  assert.equal(bagsNeeded(0, 2), 0);
});

check('deeper needs more material', () => {
  assert.ok(cubicFeet(100, 6) > cubicFeet(100, 3));
  near(cubicFeet(100, 6), 2 * cubicFeet(100, 3), 1e-9);
});

check('larger area scales linearly', () => {
  near(cubicFeet(200, 3), 2 * cubicFeet(100, 3), 1e-9);
});

check('bag-size choice changes count', () => {
  assert.ok(bagsNeeded(50, 1.5) > bagsNeeded(50, 3));
});

check('validation', () => {
  assert.throws(() => bagsNeeded(25, 0), /positive/);
  assert.throws(() => cubicFeet('x', 3), /numbers/);
});

console.log(`\n${n} checks passed.`);
