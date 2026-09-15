import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { dropLength, dropsPerRoll, dropsNeeded, rollsNeeded, totalRunLength } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b} (±${eps})`);

check('dropLength adds the pattern repeat to the wall height', () => {
  near(dropLength(2.4, 0), 2.4, 1e-9);
  near(dropLength(2.4, 0.5), 2.9, 1e-9);
});

check('dropsPerRoll floors roll length / drop length', () => {
  assert.equal(dropsPerRoll(10, 2.4, 0), 4);   // floor(10 / 2.4) = 4
  assert.equal(dropsPerRoll(10, 2.4, 0.5), 3); // floor(10 / 2.9) = 3
});

check('a bigger pattern repeat yields fewer (or equal) drops per roll', () => {
  assert.ok(dropsPerRoll(10, 2.4, 0.8) <= dropsPerRoll(10, 2.4, 0));
});

check('dropsNeeded ceils perimeter / roll width', () => {
  assert.equal(dropsNeeded(10.6, 0.53), 20);   // exactly 20
  assert.equal(dropsNeeded(10.61, 0.53), 21);  // rounds up
  assert.equal(dropsNeeded(4, 0.5), 8);
});

check('rollsNeeded — plain paper worked example', () => {
  // perimeter 10, height 2.4, roll 0.5 wide x 10 long, no repeat
  // drops = ceil(10/0.5)=20; perRoll = floor(10/2.4)=4; rolls = ceil(20/4)=5
  assert.equal(rollsNeeded(10, 2.4, 0.5, 10, 0), 5);
});

check('rollsNeeded — patterned paper worked example', () => {
  // perimeter 10.6, height 2.4, roll 0.53x10, repeat 0.5
  // drops = ceil(10.6/0.53)=20; perRoll = floor(10/2.9)=3; rolls = ceil(20/3)=7
  assert.equal(rollsNeeded(10.6, 2.4, 0.53, 10, 0.5), 7);
});

check('more perimeter never needs fewer rolls', () => {
  const a = rollsNeeded(10, 2.4, 0.53, 10, 0.5);
  const b = rollsNeeded(20, 2.4, 0.53, 10, 0.5);
  assert.ok(b >= a);
});

check('totalRunLength sums wall widths into a perimeter', () => {
  near(totalRunLength([3, 4, 3, 4]), 14, 1e-9);
  near(totalRunLength([]), 0, 1e-9);
});

check('a taller wall needs at least as many rolls', () => {
  const shortW = rollsNeeded(10, 2.0, 0.53, 10, 0.5);
  const tallW = rollsNeeded(10, 2.8, 0.53, 10, 0.5);
  assert.ok(tallW >= shortW);
});

check('validation', () => {
  assert.throws(() => dropLength(0, 0.5), /height must be positive/);
  assert.throws(() => dropLength(2.4, -1), /non-negative/);
  assert.throws(() => dropsPerRoll(2, 2.4, 0.5), /too short/); // roll shorter than a drop
  assert.throws(() => dropsNeeded(10, 0), /roll width must be positive/);
  assert.throws(() => totalRunLength('nope'), /array/);
});

console.log(`\n${n} checks passed.`);
