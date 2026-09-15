import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { isAdverb, findAdverbs, wordCount, summarize } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('recognizes clear -ly adverbs', () => {
  ['quickly', 'slowly', 'carefully', 'really', 'happily', 'quietly'].forEach(w => assert.ok(isAdverb(w), w));
});

check('excludes common non-adverb -ly words', () => {
  ['family', 'reply', 'only', 'apply', 'friendly', 'likely', 'daily', 'ugly', 'july', 'italy'].forEach(
    w => assert.ok(!isAdverb(w), w));
});

check('words not ending in -ly are never adverbs', () => {
  ['quick', 'slow', 'run', 'door', 'strength'].forEach(w => assert.ok(!isAdverb(w)));
});

check('case-insensitive', () => {
  assert.ok(isAdverb('Quickly'));
  assert.ok(isAdverb('SLOWLY'));
  assert.ok(!isAdverb('Family'));
});

check('findAdverbs returns matches with positions', () => {
  const f = findAdverbs('She ran quickly then slowly');
  assert.deepEqual(f.map(x => x.word), ['quickly', 'slowly']);
  assert.equal(f[0].index, 8);
});

check('sentence with only non-adverbs finds none', () => {
  assert.deepEqual(findAdverbs('The family will reply only later'), []);
});

check('word count', () => {
  assert.equal(wordCount('She ran quickly'), 3);
  assert.equal(wordCount("don't stop now"), 3);
  assert.equal(wordCount(''), 0);
});

check('summarize counts and density', () => {
  const s = summarize('She quickly ran and slowly walked');   // 6 words, 2 adverbs
  assert.equal(s.words, 6);
  assert.equal(s.adverbs, 2);
  assert.ok(Math.abs(s.density - 2 / 6 * 100) < 1e-9);
});

check('minimum length 4 (short -ly like "fly" excluded)', () => {
  assert.ok(!isAdverb('fly'));   // 3 chars
  assert.ok(!isAdverb('sly'));
  assert.ok(isAdverb('sadly'));  // 5 chars, real adverb
});

check('empty text', () => {
  const s = summarize('');
  assert.equal(s.adverbs, 0);
  assert.equal(s.density, 0);
});

console.log(`\n${n} checks passed.`);
