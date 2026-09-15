import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { splitSentences, countWords, sentenceLengths, mean, stdev, varietyScore, classify } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b} (±${eps})`);

check('splitSentences splits on . ! ?', () => {
  assert.deepEqual(splitSentences('Hello world. How are you? I am fine!'),
    ['Hello world.', 'How are you?', 'I am fine!']);
});

check('splitSentences keeps a trailing fragment without punctuation', () => {
  assert.deepEqual(splitSentences('Done. Not yet'), ['Done.', 'Not yet']);
  assert.deepEqual(splitSentences(''), []);
});

check('countWords counts words, ignoring punctuation', () => {
  assert.equal(countWords('This sentence has five words.'), 5);
  assert.equal(countWords("It's a well-known fact."), 4); // it's, a, well-known, fact
  assert.equal(countWords('   '), 0);
});

check('sentenceLengths gives word count per sentence', () => {
  assert.deepEqual(sentenceLengths('One. Two words. Three whole words.'), [1, 2, 3]);
});

check('mean of lengths', () => {
  near(mean([1, 2, 3]), 2, 1e-9);
  assert.equal(mean([]), 0);
});

check('stdev is population standard deviation', () => {
  // values 2,4,4,4,5,5,7,9 -> mean 5, variance 4, stdev 2
  near(stdev([2, 4, 4, 4, 5, 5, 7, 9]), 2, 1e-9);
  assert.equal(stdev([5]), 0); // single value
});

check('varietyScore = stdev / mean (coefficient of variation)', () => {
  near(varietyScore([2, 4, 4, 4, 5, 5, 7, 9]), 2 / 5, 1e-9);
  assert.equal(varietyScore([]), 0);
});

check('uniform sentence lengths score zero variety', () => {
  assert.equal(varietyScore([5, 5, 5, 5]), 0);
});

check('classify buckets by length with correct boundaries', () => {
  assert.equal(classify(8), 'short');
  assert.equal(classify(9), 'medium');
  assert.equal(classify(20), 'medium');
  assert.equal(classify(21), 'long');
});

check('validation', () => {
  assert.throws(() => splitSentences(42), /string/);
  assert.throws(() => countWords(null), /string/);
});

console.log(`\n${n} checks passed.`);
