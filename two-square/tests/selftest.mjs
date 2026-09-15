import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { buildSquare, clean, posIn, at, twoSquare, twoSquareEncrypt, twoSquareDecrypt } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('buildSquare with no keyword is the J-less alphabet', () => {
  assert.equal(buildSquare(''), 'ABCDEFGHIKLMNOPQRSTUVWXYZ');
  assert.equal(buildSquare('').length, 25);
});

check('buildSquare seeds a keyword and folds J into I', () => {
  const sq = buildSquare('KEYWORD');
  assert.ok(sq.startsWith('KEYWORD'));
  assert.equal(new Set(sq).size, 25);
  assert.ok(!sq.includes('J'));
});

check('posIn / at round-trip over all cells', () => {
  const sq = buildSquare('');
  for (let i = 0; i < 25; i++) { const [r, c] = posIn(sq, sq[i]); assert.equal(at(sq, r, c), sq[i]); }
});

check('clean folds J and drops non-letters', () => {
  assert.equal(clean('Jazz 9!'), 'IAZZ');
});

check('with empty keys the cipher swaps a different-column digraph', () => {
  // H=(1,2), I=(1,3) -> out = plain[1][3] + plain[1][2] = I H
  assert.equal(twoSquare('HI', '', ''), 'IH');
});

check('same-column letters are left unchanged', () => {
  // A=(0,0), F=(1,0) share column 0 -> unchanged
  assert.equal(twoSquare('AF', '', ''), 'AF');
});

check('the cipher is self-reciprocal (encrypt = decrypt)', () => {
  const ct = twoSquare('HELPMEOBIWANKENOBI', 'EXAMPLE', 'KEYWORD');
  assert.equal(twoSquare(ct, 'EXAMPLE', 'KEYWORD'), 'HELPMEOBIWANKENOBI');
  assert.equal(twoSquareEncrypt('ATTACK', 'A', 'B'), twoSquareDecrypt('ATTACK', 'A', 'B'));
});

check('round-trips with various keys', () => {
  for (const [pt, k1, k2] of [['ATTACKATDAWN', 'FORT', 'CASTLE'], ['MEETME', '', 'KEY'], ['CIPHERTEXT', 'ALPHA', 'BETA']]) {
    assert.equal(twoSquare(twoSquare(pt, k1, k2), k1, k2), pt);
  }
});

check('odd-length input is padded with X', () => {
  const ct = twoSquare('HELLO', 'EXAMPLE', 'KEYWORD');
  assert.equal(ct.length, 6);
  assert.equal(twoSquare(ct, 'EXAMPLE', 'KEYWORD'), 'HELLOX');
});

check('validation and edges', () => {
  assert.equal(twoSquare('', 'A', 'B'), '');
  assert.throws(() => posIn(buildSquare(''), 'J'), /not in square/);
});

console.log(`\n${n} checks passed.`);
