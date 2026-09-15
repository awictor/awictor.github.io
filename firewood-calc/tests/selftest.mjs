import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { stackVolume, cords, faceCords, costOf } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b} (±${eps})`);

check('stackVolume multiplies the three dimensions', () => {
  near(stackVolume(8, 4, 4), 128, 1e-9);
  near(stackVolume(10, 2, 1), 20, 1e-9);
});

check('a 4x4x8 stack is exactly one full cord', () => {
  near(cords(stackVolume(8, 4, 4)), 1, 1e-9);
});

check('cords divides volume by 128', () => {
  near(cords(256), 2, 1e-9);
  near(cords(64), 0.5, 1e-9);
  near(cords(0), 0, 1e-9);
});

check('a full cord = 3 face cords of 16-inch logs', () => {
  near(faceCords(128, 16 / 12), 3, 1e-9);
});

check('a full cord = 2 face cords of 24-inch logs', () => {
  near(faceCords(128, 24 / 12), 2, 1e-9);
});

check('faceCords = volume / (32 * log length)', () => {
  near(faceCords(200, 1.5), 200 / (32 * 1.5), 1e-9);
});

check('costOf multiplies cords by price', () => {
  near(costOf(2, 300), 600, 1e-9);
  near(costOf(0.5, 300), 150, 1e-9);
});

check('doubling depth doubles the volume', () => {
  near(stackVolume(8, 4, 2), 2 * stackVolume(8, 4, 1), 1e-9);
});

check('shorter logs mean more face cords for the same wood', () => {
  assert.ok(faceCords(128, 12 / 12) > faceCords(128, 24 / 12));
});

check('validation', () => {
  assert.throws(() => stackVolume(0, 4, 4), /dimensions must be positive/);
  assert.throws(() => faceCords(128, 0), /log length must be positive/);
  assert.throws(() => costOf(1, -5), /price must be non-negative/);
});

console.log(`\n${n} checks passed.`);
