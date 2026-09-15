import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { buildSquare, clean, charToPair, pairToChar, fractionate, columnarEncrypt, columnarDecrypt, adfgvxEncrypt, adfgvxDecrypt } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('buildSquare is 36 unique letters+digits', () => {
  assert.equal(buildSquare('').length, 36);
  assert.equal(new Set(buildSquare('PRIVACY')).size, 36);
});

check('charToPair uses ADFGVX labels (plain square)', () => {
  const sq = buildSquare('');
  assert.equal(charToPair(sq, 'A'), 'AA'); // index 0 -> row0 col0
  assert.equal(charToPair(sq, 'B'), 'AD'); // index 1 -> row0 col1
  assert.equal(charToPair(sq, 'G'), 'DA'); // index 6 -> row1 col0
  assert.equal(charToPair(sq, '0'), 'VF'); // index 26 -> row4 col2
});

check('charToPair / pairToChar round-trip over all 36 cells', () => {
  const sq = buildSquare('KEY');
  for (let i = 0; i < 36; i++) {
    const ch = sq[i];
    assert.equal(pairToChar(sq, charToPair(sq, ch)), ch);
  }
});

check('fractionation doubles the length', () => {
  assert.equal(fractionate(buildSquare(''), 'HELLO').length, 10);
});

check('columnar transposition round-trips', () => {
  const t = 'ADFGVXADFGVXAD';
  assert.equal(columnarDecrypt(columnarEncrypt(t, 'GERMAN'), 'GERMAN'), t);
});

check('columnar round-trips for ragged lengths', () => {
  for (const s of ['ABCDEFG', 'AB', 'ABCDEFGHIJK', 'A']) {
    assert.equal(columnarDecrypt(columnarEncrypt(s, 'KEY'), 'KEY'), s);
  }
});

check('full ADFGVX encrypt/decrypt round-trips', () => {
  const pt = 'ATTACKATDAWN';
  assert.equal(adfgvxDecrypt(adfgvxEncrypt(pt, 'PRIVACY', 'GERMAN'), 'PRIVACY', 'GERMAN'), pt);
});

check('digits in the plaintext survive a round-trip', () => {
  const pt = clean('attack at 1200');
  assert.equal(adfgvxDecrypt(adfgvxEncrypt(pt, 'CIPHER', 'KEY'), 'CIPHER', 'KEY'), pt);
});

check('ciphertext contains only ADFGVX letters', () => {
  const ct = adfgvxEncrypt('HELLOWORLD', 'PRIVACY', 'GERMAN');
  assert.ok(/^[ADFGVX]+$/.test(ct));
  assert.equal(ct.length, fractionate(buildSquare('PRIVACY'), 'HELLOWORLD').length);
});

check('validation', () => {
  assert.throws(() => adfgvxEncrypt('HELLO', 'KEY', ''), /at least one letter/);
  assert.throws(() => charToPair(buildSquare(''), '!'), /not in square/);
});

console.log(`\n${n} checks passed.`);
