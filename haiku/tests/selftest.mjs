import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { syllables, lineSyllables, wordCount, analyze } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('syllables: multi-syllable words', () => {
  assert.equal(syllables('hello'), 2);
  assert.equal(syllables('silent'), 2);
  assert.equal(syllables('table'), 2);   // silent-e after 'l' kept
});

check('syllables: single-syllable and silent-e', () => {
  assert.equal(syllables('cake'), 1);    // trailing silent e dropped
  assert.equal(syllables('code'), 1);
  assert.equal(syllables('frog'), 1);
});

check('syllables: short words floor at 1', () => {
  assert.equal(syllables('a'), 1);
  assert.equal(syllables('the'), 1);
  assert.equal(syllables('old'), 1);
});

check('syllables: empty and punctuation-only are 0', () => {
  assert.equal(syllables(''), 0);
  assert.equal(syllables('!!!'), 0);
});

check('syllables: strips punctuation and case', () => {
  assert.equal(syllables('Hello!'), 2);
  assert.equal(syllables('POND.'), 1);
});

check('lineSyllables sums words', () => {
  assert.equal(lineSyllables('An old silent pond'), 5);          // 1+1+2+1
  assert.equal(lineSyllables('A frog jumps into the pond'), 7);  // 1+1+1+2+1+1
  assert.equal(lineSyllables('  spaced   out  '), lineSyllables('spaced out'));
});

check('wordCount', () => {
  assert.equal(wordCount('An old silent pond'), 4);
  assert.equal(wordCount('   '), 0);
  assert.equal(wordCount(''), 0);
});

check('analyze accepts a valid 5-7-5 haiku', () => {
  const a = analyze('An old silent pond\nA frog jumps into the pond\nsplash Silence again');
  assert.deepEqual(a.counts, [5, 7, 5]);
  assert.equal(a.valid, true);
  assert.equal(a.lines.length, 3);
});

check('analyze rejects wrong counts', () => {
  const a = analyze('Line one is too short\ntiny\nno');
  assert.equal(a.valid, false);
  assert.deepEqual(a.target, [5, 7, 5]);
});

check('analyze ignores blank lines and trims; wrong line count invalid', () => {
  const a = analyze('\n  An old silent pond  \n\n');
  assert.equal(a.lines.length, 1);
  assert.deepEqual(a.counts, [5]);
  assert.equal(a.valid, false); // needs exactly 3 lines
});

console.log(`\n${n} checks passed.`);
