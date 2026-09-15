import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { rowsAcross, linearFeet, boardsNeeded, withWaste } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b} (±${eps})`);

check('rowsAcross ceils width / (board + gap)', () => {
  assert.equal(rowsAcross(10, 5.5, 0.5), 20);  // 120 / 6 = 20 exact
  assert.equal(rowsAcross(12, 5.5, 0.25), 26); // 144 / 5.75 = 25.04 -> 26
});

check('linearFeet = rows * length', () => {
  near(linearFeet(20, 16), 320, 1e-9);
  near(linearFeet(26, 16), 416, 1e-9);
});

check('boardsNeeded ceils linear feet / board length', () => {
  assert.equal(boardsNeeded(320, 16), 20);
  assert.equal(boardsNeeded(330, 16), 21); // remainder rounds up
});

check('withWaste adds a percentage and rounds up', () => {
  assert.equal(withWaste(20, 10), 22);   // 22 exactly
  assert.equal(withWaste(20, 12), 23);   // 22.4 -> 23
  assert.equal(withWaste(20, 0), 20);
});

check('a wider deck needs more rows', () => {
  assert.ok(rowsAcross(14, 5.5, 0.25) > rowsAcross(10, 5.5, 0.25));
});

check('a bigger gap needs fewer (or equal) rows', () => {
  assert.ok(rowsAcross(10, 5.5, 1) <= rowsAcross(10, 5.5, 0.25));
});

check('end-to-end 16x10 deck example', () => {
  const rows = rowsAcross(10, 5.5, 0.5);        // 20
  const lf = linearFeet(rows, 16);              // 320
  const base = boardsNeeded(lf, 16);            // 20
  assert.equal(withWaste(base, 10), 22);
});

check('zero-width deck needs no rows', () => {
  assert.equal(rowsAcross(0, 5.5, 0.25), 0);
});

check('a longer board length needs fewer boards', () => {
  assert.ok(boardsNeeded(320, 20) <= boardsNeeded(320, 12));
});

check('validation', () => {
  assert.throws(() => rowsAcross(10, 0, 0), /board width \+ gap must be positive/);
  assert.throws(() => boardsNeeded(100, 0), /board length must be positive/);
  assert.throws(() => withWaste(10, -1), /waste must be non-negative/);
});

console.log(`\n${n} checks passed.`);
