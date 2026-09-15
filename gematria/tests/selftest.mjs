import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { letterValue, gematria } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('ordinal letter values', () => {
  assert.equal(letterValue('A', 'ordinal'), 1);
  assert.equal(letterValue('Z', 'ordinal'), 26);
  assert.equal(letterValue('m', 'ordinal'), 13);
});

check('reverse letter values', () => {
  assert.equal(letterValue('A', 'reverse'), 26);
  assert.equal(letterValue('Z', 'reverse'), 1);
});

check('reduction (Pythagorean) 1–9', () => {
  assert.equal(letterValue('A', 'reduction'), 1);
  assert.equal(letterValue('I', 'reduction'), 9);
  assert.equal(letterValue('J', 'reduction'), 1);
  assert.equal(letterValue('R', 'reduction'), 9);
  assert.equal(letterValue('Z', 'reduction'), 8);   // (26-1)%9+1
});

check('ordinal word sums', () => {
  assert.equal(gematria('abc', 'ordinal'), 6);
  assert.equal(gematria('hello', 'ordinal'), 8 + 5 + 12 + 12 + 15);   // 52
  assert.equal(gematria('love', 'ordinal'), 12 + 15 + 22 + 5);        // 54
});

check('reverse word sum', () => {
  assert.equal(gematria('abc', 'reverse'), 26 + 25 + 24);   // 75
});

check('reduction word sum', () => {
  assert.equal(gematria('abc', 'reduction'), 6);
});

check('case-insensitive', () => {
  assert.equal(gematria('HELLO', 'ordinal'), gematria('hello', 'ordinal'));
});

check('ignores spaces and punctuation', () => {
  assert.equal(gematria('a b, c!', 'ordinal'), gematria('abc', 'ordinal'));
});

check('empty and non-letter input = 0', () => {
  assert.equal(gematria('', 'ordinal'), 0);
  assert.equal(gematria('123 !@#', 'ordinal'), 0);
});

check('ordinal + reverse of a single letter = 27', () => {
  for (const ch of ['a', 'm', 'z']) {
    assert.equal(letterValue(ch, 'ordinal') + letterValue(ch, 'reverse'), 27);
  }
});

console.log(`\n${n} checks passed.`);
