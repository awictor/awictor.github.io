import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { tokenize, ngrams, density } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b} (±${eps})`);

check('tokenize lowercases and strips punctuation', () => {
  assert.deepEqual(tokenize('Hello, WORLD! Hello.'), ['hello', 'world', 'hello']);
});

check('tokenize keeps contractions', () => {
  assert.deepEqual(tokenize("Don't stop"), ["don't", 'stop']);
});

check('ngrams builds sliding windows', () => {
  assert.deepEqual(ngrams(['a', 'b', 'c'], 2), ['a b', 'b c']);
  assert.deepEqual(ngrams(['a', 'b', 'c'], 3), ['a b c']);
  assert.deepEqual(ngrams(['a'], 2), []);
});

check('single-word counts and density', () => {
  const d = density('the cat the cat the', 1);
  assert.equal(d.totalWords, 5);
  assert.equal(d.results[0].phrase, 'the');
  assert.equal(d.results[0].count, 3);
  near(d.results[0].pct, 60, 1e-9);
  near(d.results[1].pct, 40, 1e-9);
});

check('bigram density uses window count as denominator', () => {
  const d = density('a b a b', 2);        // windows: "a b","b a","a b" = 3
  assert.equal(d.windows, 3);
  assert.equal(d.results[0].phrase, 'a b');
  assert.equal(d.results[0].count, 2);
  near(d.results[0].pct, 2 / 3 * 100, 1e-9);
});

check('results sorted by count desc then alphabetical', () => {
  const d = density('banana apple apple banana cherry', 1);
  assert.equal(d.results[0].count, 2);
  // apple and banana tie at 2 → alphabetical
  assert.equal(d.results[0].phrase, 'apple');
  assert.equal(d.results[1].phrase, 'banana');
  assert.equal(d.results[2].phrase, 'cherry');
});

check('stop-word filtering (1-gram only)', () => {
  const withStop = density('the the the cat', 1, { stopwords: true });
  assert.ok(!withStop.results.some(r => r.phrase === 'the'));
  assert.equal(withStop.results[0].phrase, 'cat');
  const noStop = density('the the the cat', 1, { stopwords: false });
  assert.equal(noStop.results[0].phrase, 'the');
});

check('stop words are NOT filtered for multi-word phrases', () => {
  const d = density('the cat the cat', 2, { stopwords: true });
  assert.ok(d.results.some(r => r.phrase === 'the cat'));
});

check('empty text yields no results', () => {
  const d = density('', 1);
  assert.equal(d.totalWords, 0);
  assert.deepEqual(d.results, []);
});

check('case-insensitive counting', () => {
  const d = density('The the THE', 1, { stopwords: false });
  assert.equal(d.results[0].count, 3);
});

console.log(`\n${n} checks passed.`);
