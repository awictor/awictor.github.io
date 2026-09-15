import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { signature, isAnagram, findAnagrams } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('signature sorts letters', () => {
  assert.equal(signature('listen'), 'eilnst');
  assert.equal(signature('silent'), 'eilnst');
  assert.equal(signature('abc'), 'abc');
});

check('classic anagrams', () => {
  assert.equal(isAnagram('listen', 'silent'), true);
  assert.equal(isAnagram('elbow', 'below'), true);
});

check('ignores case, spaces and punctuation', () => {
  assert.equal(isAnagram('Dormitory', 'Dirty Room'), true);
  assert.equal(isAnagram('The eyes!', 'They see.'), true);
  assert.equal(signature('Dirty Room'), signature('dormitory'));
});

check('non-anagrams', () => {
  assert.equal(isAnagram('hello', 'world'), false);
  assert.equal(isAnagram('cat', 'cats'), false);   // different length
});

check('a word is an anagram of itself', () => {
  assert.equal(isAnagram('cat', 'cat'), true);
  assert.equal(isAnagram('cat', 'act'), true);
});

check('digits count too', () => {
  assert.equal(isAnagram('a1b2', '2b1a'), true);
  assert.equal(signature('a1'), '1a');
});

check('empty / punctuation-only are never anagrams', () => {
  assert.equal(signature(''), '');
  assert.equal(isAnagram('', ''), false);
  assert.equal(isAnagram('...', '!!!'), false);
});

check('findAnagrams returns matching candidates', () => {
  assert.deepEqual(
    findAnagrams('listen', ['silent', 'enlist', 'google', 'tinsel', 'inlets', 'banana']),
    ['silent', 'enlist', 'tinsel', 'inlets']
  );
});

check('findAnagrams with no matches / empty word', () => {
  assert.deepEqual(findAnagrams('xyz', ['abc', 'def']), []);
  assert.deepEqual(findAnagrams('', ['abc']), []);
});

check('signature is order-independent and idempotent', () => {
  assert.equal(signature('abc'), signature('cba'));
  assert.equal(signature(signature('listen')), signature('listen'));
});

console.log(`\n${n} checks passed.`);
