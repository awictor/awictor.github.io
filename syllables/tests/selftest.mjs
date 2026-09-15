import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { syllables, words, countText, lineSyllables, isHaiku } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('short words are one syllable', () => {
  assert.equal(syllables('the'), 1);
  assert.equal(syllables('cat'), 1);
  assert.equal(syllables('a'), 1);
});

check('common multi-syllable words', () => {
  assert.equal(syllables('hello'), 2);
  assert.equal(syllables('banana'), 3);
  assert.equal(syllables('table'), 2);
});

check('silent-e words count correctly', () => {
  assert.equal(syllables('cake'), 1);
  assert.equal(syllables('code'), 1);
});

check('empty / non-alphabetic returns 0', () => {
  assert.equal(syllables(''), 0);
  assert.equal(syllables('123'), 0);
});

check('words() extracts word tokens including apostrophes', () => {
  assert.deepEqual(words("don't stop now"), ["don't", 'stop', 'now']);
  assert.equal(words('').length, 0);
});

check('countText sums word syllables', () => {
  assert.equal(countText('hello world'), 3); // 2 + 1
  assert.equal(countText('cat dog cat'), 3);
});

check('lineSyllables reports one count per line', () => {
  assert.deepEqual(lineSyllables('cat dog\ncat'), [2, 1]);
});

check('isHaiku accepts a 5-7-5 poem', () => {
  const poem = 'cat dog cat dog cat\ncat dog cat dog cat dog cat\ncat dog cat dog cat';
  assert.deepEqual(lineSyllables(poem), [5, 7, 5]);
  assert.equal(isHaiku(poem), true);
});

check('isHaiku rejects non-5-7-5', () => {
  assert.equal(isHaiku('cat dog\ncat'), false);
  assert.equal(isHaiku('cat dog cat dog cat\ncat dog cat\ncat dog cat dog cat'), false);
});

check('isHaiku ignores blank lines around the poem', () => {
  const poem = '\ncat dog cat dog cat\ncat dog cat dog cat dog cat\ncat dog cat dog cat\n';
  assert.equal(isHaiku(poem), true);
});

console.log(`\n${n} checks passed.`);
