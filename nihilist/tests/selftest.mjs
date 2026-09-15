import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { buildSquare, coord, letterAt, encrypt, decrypt } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('default square = A–Z without J', () => {
  assert.equal(buildSquare(''), 'ABCDEFGHIKLMNOPQRSTUVWXYZ');
});

check('coordinates (A=11, E=15, H=23, Z=55)', () => {
  const sq = buildSquare('');
  assert.equal(coord(sq, 'A'), 11);
  assert.equal(coord(sq, 'E'), 15);
  assert.equal(coord(sq, 'H'), 23);
  assert.equal(coord(sq, 'Z'), 55);
});

check('letterAt inverts coord', () => {
  const sq = buildSquare('');
  assert.equal(letterAt(sq, 11), 'A');
  assert.equal(letterAt(sq, 23), 'H');
  assert.equal(letterAt(sq, 55), 'Z');
});

check('hand-computed vector: HELLO with key KEY', () => {
  // H23+K25=48, E15+E15=30, L31+Y54=85, L31+K25=56, O34+E15=49
  assert.equal(encrypt('HELLO', 'KEY'), '48 30 85 56 49');
});

check('decrypt inverts encrypt', () => {
  assert.equal(decrypt('48 30 85 56 49', 'KEY'), 'HELLO');
  assert.equal(decrypt(encrypt('ATTACK', 'SPY'), 'SPY'), 'ATTACK');
});

check('J maps to I', () => {
  assert.equal(coord(buildSquare(''), 'J'), coord(buildSquare(''), 'I'));
  assert.equal(decrypt(encrypt('JET', 'KEY'), 'KEY'), 'IET');
});

check('key cycles over the message', () => {
  // ABCD with key AB: A11+A11=22, B12+B12=24, C13+A11=24, D14+B12=26
  assert.equal(encrypt('ABCD', 'AB'), '22 24 24 26');
});

check('square keyword changes the output and round-trips', () => {
  const c = encrypt('SECRET', 'KEY', 'PLAYFAIR');
  assert.notEqual(c, encrypt('SECRET', 'KEY', ''));
  assert.equal(decrypt(c, 'KEY', 'PLAYFAIR'), 'SECRET');
});

check('non-letters are ignored', () => {
  assert.equal(encrypt('H E,L!L.O', 'KEY'), encrypt('HELLO', 'KEY'));
});

check('empty key throws', () => {
  assert.throws(() => encrypt('HELLO', '123'), /letters/);
  assert.throws(() => decrypt('48 30', ''), /letters/);
});

console.log(`\n${n} checks passed.`);
