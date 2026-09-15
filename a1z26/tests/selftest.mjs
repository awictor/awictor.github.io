import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { letterToNumber, numberToLetter, encode, decode } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('letters map to their alphabet position', () => {
  assert.equal(letterToNumber('A'), 1);
  assert.equal(letterToNumber('Z'), 26);
  assert.equal(letterToNumber('m'), 13);
});

check('numberToLetter is the inverse', () => {
  assert.equal(numberToLetter(1), 'A');
  assert.equal(numberToLetter(26), 'Z');
  for (let i = 1; i <= 26; i++) assert.equal(letterToNumber(numberToLetter(i)), i);
});

check('encode a single word', () => {
  assert.equal(encode('ABC'), '1-2-3');
  assert.equal(encode('HELLO'), '8-5-12-12-15');
});

check('encode preserves word breaks with a space', () => {
  assert.equal(encode('HELLO WORLD'), '8-5-12-12-15 23-15-18-12-4');
});

check('decode reverses encode', () => {
  assert.equal(decode('8-5-12-12-15 23-15-18-12-4'), 'HELLO WORLD');
  assert.equal(decode('1-2-3'), 'ABC');
});

check('round-trip for letter-only text (uppercased)', () => {
  for (const t of ['HELLO', 'THE QUICK BROWN FOX', 'ATTACK AT DAWN']) {
    assert.equal(decode(encode(t)), t);
  }
});

check('custom separator', () => {
  assert.equal(encode('CAB', '.'), '3.1.2');
  assert.equal(encode('CAB', ' '), '3 1 2');
});

check('decode tolerates any non-digit separators', () => {
  assert.equal(decode('8.5.12.12.15'), 'HELLO');
  assert.equal(decode('8,5,12,12,15'), 'HELLO');
});

check('encode is case-insensitive and drops punctuation', () => {
  assert.equal(encode('Hi!'), '8-9');
  assert.equal(encode('a-b'), '1-2'); // hyphen within word is not a letter
});

check('validation: bad letter and out-of-range number throw', () => {
  assert.throws(() => letterToNumber('1'), /not a letter/);
  assert.throws(() => numberToLetter(0), /1-26/);
  assert.throws(() => numberToLetter(27), /1-26/);
  assert.throws(() => decode('27'), /1-26/);
  assert.throws(() => encode(42), /must be a string/);
});

console.log(`\n${n} checks passed.`);
