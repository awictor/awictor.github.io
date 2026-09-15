import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { findWordy, tighten, summarize, PHRASES } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('finds a simple wordy phrase with suggestion', () => {
  const f = findWordy('We did it in order to win.');
  assert.equal(f.length, 1);
  assert.equal(f[0].phrase, 'in order to');
  assert.equal(f[0].suggestion, 'to');
});

check('case-insensitive matching', () => {
  assert.equal(findWordy('In Order To win').length, 1);
  assert.equal(findWordy('DUE TO THE FACT THAT it rained')[0].suggestion, 'because');
});

check('tighten replaces phrases', () => {
  assert.equal(tighten('due to the fact that it rained'), 'because it rained');
  assert.equal(tighten('We utilize tools'), 'We use tools');
});

check('tighten preserves leading capitalization', () => {
  assert.equal(tighten('In order to win'), 'To win');
  assert.equal(tighten('Due to the fact that we lost'), 'Because we lost');
});

check('longer phrases take priority over shorter overlaps', () => {
  // "in spite of the fact that" should map to "although", not partial-match something shorter
  assert.equal(tighten('in spite of the fact that it works'), 'although it works');
});

check('word boundaries: does not match inside longer words', () => {
  assert.equal(findWordy('utilized').length, 0);   // "utilize" shouldn't match "utilized"
  assert.equal(findWordy('utilize').length, 1);
});

check('handles multiple spaces between words', () => {
  assert.equal(findWordy('in  order   to').length, 1);
});

check('summarize counts occurrences per phrase', () => {
  const s = summarize('in order to A, in order to B, prior to C');
  assert.equal(s.total, 3);
  const io = s.items.find(i => i.phrase === 'in order to');
  assert.equal(io.count, 2);
  assert.ok(s.items.some(i => i.phrase === 'prior to' && i.suggestion === 'before'));
});

check('clean text yields nothing', () => {
  assert.deepEqual(findWordy('The cat sat on the mat.'), []);
  assert.equal(tighten('The cat sat.'), 'The cat sat.');
});

check('phrase list is non-trivial and well-formed', () => {
  assert.ok(PHRASES.length >= 25);
  assert.ok(PHRASES.every(p => Array.isArray(p) && p.length === 2 && p[1].length < p[0].length));
});

console.log(`\n${n} checks passed.`);
