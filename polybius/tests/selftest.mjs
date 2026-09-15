import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { buildSquare, encode, decode } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('default square is A–Z without J', () => {
  assert.equal(buildSquare(''), 'ABCDEFGHIKLMNOPQRSTUVWXYZ');
  assert.equal(buildSquare('').length, 25);
});

check('standard coordinates: A=11, E=15, F=21, Z=55', () => {
  assert.equal(encode('A'), '11');
  assert.equal(encode('E'), '15');
  assert.equal(encode('F'), '21');
  assert.equal(encode('Z'), '55');
  assert.equal(encode('H'), '23');
});

check('canonical HELLO encoding', () => {
  assert.equal(encode('HELLO'), '2315313134');
});

check('decode inverts encode', () => {
  assert.equal(decode('2315313134'), 'HELLO');
  assert.equal(decode(encode('POLYBIUS')), 'POLYBIUS');
});

check('I and J share cell 24; J decodes as I', () => {
  assert.equal(encode('I'), '24');
  assert.equal(encode('J'), '24');
  assert.equal(decode('24'), 'I');
  assert.equal(decode(encode('JELLO')), 'IELLO');
});

check('non-letters are ignored; digits grouped/ungrouped both decode', () => {
  assert.equal(encode('A B'), '1112');
  assert.equal(decode('23 15 31 31 34'), 'HELLO');
});

check('keyword scrambles the square (Playfair-style fill)', () => {
  assert.equal(buildSquare('playfair example'), 'PLAYFIREXMBCDGHKNOQSTUVWZ');
  // P is at index 0 → row1 col1 = 11
  assert.equal(encode('P', 'playfair example'), '11');
  // A is at index 2 → row1 col3 = 13
  assert.equal(encode('A', 'playfair example'), '13');
});

check('keyword round-trip', () => {
  assert.equal(decode(encode('ATTACKATDAWN', 'secret'), 'secret'), 'ATTACKATDAWN');
});

check('decode drops an incomplete trailing digit', () => {
  assert.equal(decode('231'), 'H');   // 23 → H, leftover 1 ignored
});

check('empty and edge inputs', () => {
  assert.equal(encode(''), '');
  assert.equal(decode(''), '');
  assert.equal(encode('123!@#'), '');   // no letters
});

console.log(`\n${n} checks passed.`);
