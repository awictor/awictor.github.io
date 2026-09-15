import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { minMoves, solve, moveCountForDisk } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

// Simulate a move list and assert every move is legal, ending with all disks on the target.
function isLegal(moves, N, from = 'A', to = 'C', via = 'B') {
  const pegs = { [from]: [], [to]: [], [via]: [] };
  for (let d = N; d >= 1; d--) pegs[from].push(d); // largest at bottom
  for (const [disk, f, t] of moves) {
    if (pegs[f][pegs[f].length - 1] !== disk) return false;
    if (pegs[t].length && pegs[t][pegs[t].length - 1] < disk) return false;
    pegs[f].pop(); pegs[t].push(disk);
  }
  return pegs[to].length === N && pegs[from].length === 0 && pegs[via].length === 0;
}

check('minimum moves = 2ⁿ − 1', () => {
  assert.deepEqual([1, 2, 3, 4, 10].map(minMoves), [1, 3, 7, 15, 1023]);
});

check('solve(1) is a single move', () => {
  assert.deepEqual(solve(1), [[1, 'A', 'C']]);
});

check('solve(2) is the classic 3-move sequence', () => {
  assert.deepEqual(solve(2), [[1, 'A', 'B'], [2, 'A', 'C'], [1, 'B', 'C']]);
});

check('solve(n) length always equals minMoves(n)', () => {
  for (let k = 1; k <= 12; k++) assert.equal(solve(k).length, minMoves(k));
});

check('every generated solution is legal and completes', () => {
  for (let k = 1; k <= 10; k++) assert.ok(isLegal(solve(k), k), `n=${k}`);
});

check('the smallest disk moves 2ⁿ⁻¹ times', () => {
  assert.equal(moveCountForDisk(5, 1), 16);
  assert.equal(moveCountForDisk(10, 1), 512);
});

check('the largest disk moves exactly once', () => {
  for (const k of [1, 3, 8, 20]) assert.equal(moveCountForDisk(k, k), 1);
});

check('per-disk move counts sum to the total', () => {
  for (const N of [3, 5, 8]) {
    let s = 0;
    for (let d = 1; d <= N; d++) s += moveCountForDisk(N, d);
    assert.equal(s, minMoves(N));
  }
});

check('actual move counts in solve match the formula', () => {
  const N = 6, mv = solve(N), counts = {};
  for (const [disk] of mv) counts[disk] = (counts[disk] || 0) + 1;
  for (let d = 1; d <= N; d++) assert.equal(counts[d], moveCountForDisk(N, d));
});

check('validation: bad or oversized disk counts throw', () => {
  assert.throws(() => minMoves(0), /positive integer/);
  assert.throws(() => minMoves(2.5), /positive integer/);
  assert.throws(() => minMoves(54), /max 53/);
  assert.throws(() => solve(16), /max 15/);
  assert.throws(() => moveCountForDisk(3, 5), /exceeds disk count/);
});

console.log(`\n${n} checks passed.`);
