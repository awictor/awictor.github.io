import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { tokenize, splitSentences, wordFrequencies, scoreSentence, summarize } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

// Deterministic worked example.
const TEXT = 'The cat sat on the mat. Dogs are loud. The cat and the dog played. Birds fly high.';

check('tokenize lowercases and splits on non-word chars', () => {
  assert.deepEqual(tokenize('The cat, the CAT!'), ['the', 'cat', 'the', 'cat']);
  assert.deepEqual(tokenize(''), []);
});

check('splitSentences splits on . ! ?', () => {
  assert.deepEqual(splitSentences(TEXT),
    ['The cat sat on the mat.', 'Dogs are loud.', 'The cat and the dog played.', 'Birds fly high.']);
});

check('wordFrequencies excludes stop-words and counts content words', () => {
  const f = wordFrequencies(TEXT);
  assert.equal(f.cat, 2);   // appears in two sentences
  assert.equal(f.sat, 1);
  assert.equal(f.dog, 1);
  assert.equal(f.dogs, 1);  // "dogs" and "dog" are distinct tokens (no stemming)
  assert.ok(!('the' in f));  // stop-word removed
  assert.ok(!('on' in f) && !('are' in f) && !('and' in f));
});

check('scoreSentence sums content-word frequencies', () => {
  const f = wordFrequencies(TEXT);
  // "The cat sat on the mat." -> cat(2)+sat(1)+mat(1) = 4
  assert.equal(scoreSentence('The cat sat on the mat.', f), 4);
  // "Dogs are loud." -> dogs(1)+loud(1) = 2
  assert.equal(scoreSentence('Dogs are loud.', f), 2);
});

check('summarize(n=1) returns the single highest-scoring sentence', () => {
  // S1 and S3 tie at 4; earliest wins -> S1
  assert.equal(summarize(TEXT, 1), 'The cat sat on the mat.');
});

check('summarize(n=2) returns the top two, in original order', () => {
  assert.equal(summarize(TEXT, 2), 'The cat sat on the mat. The cat and the dog played.');
});

check('summary sentences stay in document order (not score order)', () => {
  const out = summarize(TEXT, 2);
  assert.ok(out.indexOf('cat sat') < out.indexOf('dog played'));
});

check('n >= sentence count returns the whole text', () => {
  assert.equal(summarize(TEXT, 99), splitSentences(TEXT).join(' '));
});

check('empty input yields an empty summary', () => {
  assert.equal(summarize('', 3), '');
  assert.equal(summarize('   ', 3), '');
});

check('n is clamped to at least 1', () => {
  assert.equal(summarize(TEXT, 0), 'The cat sat on the mat.');
  assert.equal(summarize(TEXT, -5), 'The cat sat on the mat.');
});

console.log(`\n${n} checks passed.`);
