import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { WEASELS, isWeasel, analyze, tally } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps = 1e-9) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b}`);
const words = t => analyze(t).matches.map(m => m.word);

check('detects a single weasel word', () => {
  assert.deepEqual(words('This is very good.'), ['very']);
});

check('detects several weasel words in order', () => {
  assert.deepEqual(words('It was quite simply really bad.'), ['quite', 'simply', 'really']);
});

check('case-insensitive and punctuation-tolerant', () => {
  assert.deepEqual(words('Very, VERY basically done.'), ['very', 'very', 'basically']);
});

check('whole-word only (no substring false positives)', () => {
  assert.equal(analyze('Everyone arrived; oversimplified plans.').weaselCount, 0); // "very"/"simply" are substrings
});

check('clean prose flags nothing', () => {
  assert.equal(analyze('The cat sat on the mat and slept.').weaselCount, 0);
});

check('word count and density', () => {
  const a = analyze('This is very good');   // 4 words, 1 weasel
  assert.equal(a.wordCount, 4);
  assert.equal(a.weaselCount, 1);
  near(a.density, 0.25);
});

check('flagged indices align with tokens', () => {
  const a = analyze('a very b really c');
  assert.ok(a.flagged.has(1));   // "very"
  assert.ok(a.flagged.has(3));   // "really"
  assert.ok(!a.flagged.has(0));
});

check('isWeasel helper', () => {
  assert.equal(isWeasel('Really!'), true);
  assert.equal(isWeasel('cat'), false);
  assert.ok(WEASELS.has('basically'));
});

check('tally counts and sorts by frequency', () => {
  assert.deepEqual(tally('very very really'), [['very', 2], ['really', 1]]);
});

check('empty text is zeroed and never throws', () => {
  const a = analyze('');
  assert.equal(a.weaselCount, 0);
  assert.equal(a.wordCount, 0);
  assert.equal(a.density, 0);
  assert.deepEqual(tally(''), []);
});

console.log(`\n${n} checks passed.`);
