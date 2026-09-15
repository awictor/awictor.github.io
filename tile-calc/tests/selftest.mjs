import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { tileAreaSqft, tileAreaM2, roomArea, tilesNeeded, boxesNeeded } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b} (±${eps})`);

check('tile area in ft² from inches', () => {
  near(tileAreaSqft(12, 12), 1, 1e-9);      // 12"×12" = 1 ft²
  near(tileAreaSqft(6, 6), 0.25, 1e-9);
});

check('tile area in m² from cm', () => {
  near(tileAreaM2(100, 100), 1, 1e-9);       // 1 m × 1 m
  near(tileAreaM2(30, 30), 0.09, 1e-9);
});

check('room area = length × width', () => {
  near(roomArea(10, 12), 120, 1e-9);
});

check('tiles needed, no waste', () => {
  assert.equal(tilesNeeded(120, 1, 0), 120);
  assert.equal(tilesNeeded(100, 0.25, 0), 400);
});

check('waste adds tiles and rounds up', () => {
  assert.equal(tilesNeeded(120, 1, 10), 132);   // 120 × 1.10
  assert.equal(tilesNeeded(100, 1, 15), 115);
});

check('always rounds up to whole tiles', () => {
  assert.equal(tilesNeeded(120.5, 1, 0), 121);
  assert.equal(tilesNeeded(10, 3, 0), 4);       // 10/3 = 3.33 → 4
});

check('zero area needs no tiles', () => {
  assert.equal(tilesNeeded(0, 1, 10), 0);
});

check('boxes rounds up from tiles', () => {
  assert.equal(boxesNeeded(132, 10), 14);
  assert.equal(boxesNeeded(40, 10), 4);
  assert.equal(boxesNeeded(41, 10), 5);
});

check('more waste → same-or-more tiles', () => {
  assert.ok(tilesNeeded(200, 1, 20) >= tilesNeeded(200, 1, 10));
});

check('validation', () => {
  assert.throws(() => tilesNeeded(120, 0, 10), /positive/);
  assert.throws(() => boxesNeeded(100, 0), /positive/);
  assert.throws(() => tileAreaSqft('x', 12), /numbers/);
});

console.log(`\n${n} checks passed.`);
