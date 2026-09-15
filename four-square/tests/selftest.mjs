import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { buildSquare, clean, posIn, at, fourSquareEncrypt, fourSquareDecrypt } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('buildSquare with no keyword is the J-less alphabet', () => {
  assert.equal(buildSquare(''), 'ABCDEFGHIKLMNOPQRSTUVWXYZ');
  assert.equal(buildSquare('').length, 25);
});

check('buildSquare seeds a keyword, dedupes, folds J into I', () => {
  const sq = buildSquare('EXAMPLE');
  assert.ok(sq.startsWith('EXAMPL'));
  assert.equal(sq.length, 25);
  assert.equal(new Set(sq).size, 25);
  assert.ok(!sq.includes('J'));
});

check('posIn / at round-trip over all 25 cells', () => {
  const sq = buildSquare('');
  for (let i = 0; i < 25; i++) {
    const [r, c] = posIn(sq, sq[i]);
    assert.equal(at(sq, r, c), sq[i]);
    assert.equal(r * 5 + c, i);
  }
});

check('clean folds J to I and drops non-letters', () => {
  assert.equal(clean('Jazz, 4!'), 'IAZZ');
});

check('with empty keys the cipher swaps each digraph', () => {
  // all four squares are the plain alphabet -> encrypt swaps the pair
  assert.equal(fourSquareEncrypt('HI', '', ''), 'IH');
  assert.equal(fourSquareEncrypt('ABCD', '', ''), 'BADC');
});

check('canonical first digraph HE -> FY (EXAMPLE / KEYWORD)', () => {
  assert.ok(fourSquareEncrypt('HELPMEOBIWANKENOBI', 'EXAMPLE', 'KEYWORD').startsWith('FY'));
});

check('encrypt then decrypt round-trips', () => {
  const pt = 'HELPMEOBIWANKENOBI';
  assert.equal(fourSquareDecrypt(fourSquareEncrypt(pt, 'EXAMPLE', 'KEYWORD'), 'EXAMPLE', 'KEYWORD'), pt);
});

check('round-trips with various keys (even-length inputs)', () => {
  for (const [pt, k1, k2] of [['ATTACKATDAWN', 'FORT', 'CASTLE'], ['MEETME', 'A', 'Z'], ['CIPHERTEXT', '', 'KEY']]) {
    assert.equal(fourSquareDecrypt(fourSquareEncrypt(pt, k1, k2), k1, k2), pt);
  }
});

check('odd-length input is padded with X (recovered on decrypt)', () => {
  const ct = fourSquareEncrypt('HELLO', 'EXAMPLE', 'KEYWORD');
  assert.equal(ct.length, 6); // 5 -> padded to 6
  assert.equal(fourSquareDecrypt(ct, 'EXAMPLE', 'KEYWORD'), 'HELLOX');
});

check('validation and edges', () => {
  assert.equal(fourSquareEncrypt('', 'A', 'B'), '');
  assert.throws(() => posIn(buildSquare(''), 'J'), /not in square/);
});

console.log(`\n${n} checks passed.`);
