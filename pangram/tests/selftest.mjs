import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { lettersUsed, missingLetters, isPangram, letterCounts, isPerfectPangram } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('lettersUsed collects distinct lowercase letters', () => {
  const u = lettersUsed('AaBb!1');
  assert.deepEqual(Object.keys(u).sort(), ['a', 'b']);
});

check('the classic sentence is a pangram', () => {
  assert.equal(isPangram('The quick brown fox jumps over the lazy dog'), true);
  assert.deepEqual(missingLetters('The quick brown fox jumps over the lazy dog'), []);
});

check('a non-pangram reports the missing letters, sorted', () => {
  assert.equal(isPangram('hello world'), false);
  const miss = missingLetters('hello world');
  assert.ok(miss.includes('a') && miss.includes('z') && !miss.includes('h'));
  const sorted = [...miss].sort();
  assert.deepEqual(miss, sorted);
});

check('the full alphabet is a perfect pangram', () => {
  assert.equal(isPerfectPangram('abcdefghijklmnopqrstuvwxyz'), true);
  assert.equal(isPerfectPangram('ABCDEFGHIJKLMNOPQRSTUVWXYZ'), true);
});

check('a normal pangram is not perfect (has repeats)', () => {
  assert.equal(isPangram('The quick brown fox jumps over the lazy dog'), true);
  assert.equal(isPerfectPangram('The quick brown fox jumps over the lazy dog'), false);
});

check('letterCounts counts each letter, zero for unused', () => {
  const c = letterCounts('aabbc');
  assert.equal(c.a, 2);
  assert.equal(c.b, 2);
  assert.equal(c.c, 1);
  assert.equal(c.z, 0);
});

check('checks are case-insensitive', () => {
  assert.equal(isPangram('the QUICK Brown FOX jumps OVER the LAZY dog'), true);
});

check('non-letters are ignored', () => {
  assert.deepEqual(Object.keys(lettersUsed('123 !@# ...')).sort(), []);
});

check('empty text is not a pangram and misses all 26', () => {
  assert.equal(isPangram(''), false);
  assert.equal(missingLetters('').length, 26);
  assert.equal(isPerfectPangram(''), false);
});

check('a missing single letter is caught', () => {
  // pangram minus the letter s
  const almost = 'the quick brown fox jump over the lazy dog'; // "jumps" -> "jump" drops the s
  assert.equal(isPangram(almost), false);
  assert.deepEqual(missingLetters(almost), ['s']);
});

console.log(`\n${n} checks passed.`);
