import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { letterToCoords, coordsToLetter, encode, decode, toTaps } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('corner and edge letters map correctly', () => {
  assert.deepEqual(letterToCoords('A'), [1, 1]);
  assert.deepEqual(letterToCoords('E'), [1, 5]);
  assert.deepEqual(letterToCoords('F'), [2, 1]);
  assert.deepEqual(letterToCoords('Z'), [5, 5]);
});

check('K shares C (both map to row 1, col 3)', () => {
  assert.deepEqual(letterToCoords('C'), [1, 3]);
  assert.deepEqual(letterToCoords('K'), [1, 3]);
});

check('coordsToLetter is the inverse', () => {
  assert.equal(coordsToLetter(1, 1), 'A');
  assert.equal(coordsToLetter(5, 5), 'Z');
  assert.equal(coordsToLetter(1, 3), 'C');
  assert.equal(coordsToLetter(4, 4), 'T');
});

check('every non-K letter round-trips through coords', () => {
  for (const ch of 'ABCDEFGHIJLMNOPQRSTUVWXYZ') {
    const [r, c] = letterToCoords(ch);
    assert.equal(coordsToLetter(r, c), ch);
  }
});

check('encode WATER', () => {
  assert.deepEqual(encode('WATER'), [[5, 2], [1, 1], [4, 4], [1, 5], [4, 2]]);
});

check('encode is case-insensitive and skips non-letters', () => {
  assert.deepEqual(encode('a b!'), [[1, 1], [1, 2]]);
  assert.deepEqual(encode('Hi, 42!'), encode('HI'));
});

check('decode inverts encode for K-free text', () => {
  for (const t of ['HELLO', 'WORLD', 'ATTACKATDAWN'.replace(/K/g, 'C'), 'POLYBIUS']) {
    assert.equal(decode(encode(t)), t);
  }
});

check('K decodes to C (lossy, as designed)', () => {
  assert.equal(decode(encode('KEY')), 'CEY');
});

check('toTaps renders dot groups', () => {
  assert.equal(toTaps([1, 1]), '• •');
  assert.equal(toTaps([5, 5]), '••••• •••••');
  assert.equal(toTaps([1, 3]), '• •••');
});

check('validation: bad letters and out-of-range coords throw', () => {
  assert.throws(() => letterToCoords('1'), /not a letter/);
  assert.throws(() => letterToCoords('AB'), /single letter/);
  assert.throws(() => coordsToLetter(0, 1), /1-5/);
  assert.throws(() => coordsToLetter(6, 1), /1-5/);
  assert.throws(() => encode(42), /must be a string/);
});

console.log(`\n${n} checks passed.`);
