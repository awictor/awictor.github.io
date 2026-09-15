import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { normalize, reverse, isPalindrome, findPalindromicWords } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('normalize keeps lowercase alphanumerics only', () => {
  assert.equal(normalize('A man, a Plan!'), 'amanaplan');
  assert.equal(normalize('12.3!'), '123');
});

check('reverse reverses a string', () => {
  assert.equal(reverse('abc'), 'cba');
});

check('classic phrase palindrome (ignores case/punctuation/spaces)', () => {
  assert.equal(isPalindrome('A man, a plan, a canal: Panama'), true);
});

check('simple words', () => {
  assert.equal(isPalindrome('racecar'), true);
  assert.equal(isPalindrome('hello'), false);
});

check('single character is a palindrome; empty is not', () => {
  assert.equal(isPalindrome('a'), true);
  assert.equal(isPalindrome(''), false);
  assert.equal(isPalindrome('  ,. '), false); // normalizes to empty
});

check('numeric palindromes work', () => {
  assert.equal(isPalindrome('12321'), true);
  assert.equal(isPalindrome('12345'), false);
});

check('findPalindromicWords picks palindromic tokens', () => {
  assert.deepEqual(findPalindromicWords('level noon kayak apple', 3), ['level', 'noon', 'kayak']);
});

check('findPalindromicWords respects minLength and dedupes', () => {
  assert.deepEqual(findPalindromicWords('mom dad wow level level', 4), ['level']);
  assert.deepEqual(findPalindromicWords('mom dad wow', 3), ['mom', 'dad', 'wow']);
});

check('case-insensitive word detection', () => {
  assert.deepEqual(findPalindromicWords('Level NOON', 3), ['level', 'noon']);
});

check('non-palindrome words are excluded; empty text yields none', () => {
  assert.deepEqual(findPalindromicWords('the quick brown fox', 3), []);
  assert.deepEqual(findPalindromicWords('', 3), []);
});

console.log(`\n${n} checks passed.`);
