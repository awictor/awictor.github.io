import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { countWords, manuscriptPages, readingTime, speakingTime, category } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b} (±${eps})`);

check('countWords splits on whitespace', () => {
  assert.equal(countWords('the quick brown fox'), 4);
  assert.equal(countWords('  spaced   out  words '), 3);
  assert.equal(countWords(''), 0);
});

check('manuscriptPages = ceil(words / 250)', () => {
  assert.equal(manuscriptPages(250), 1);
  assert.equal(manuscriptPages(251), 2);
  assert.equal(manuscriptPages(50000), 200);
  assert.equal(manuscriptPages(0), 0);
});

check('manuscriptPages honors a custom words-per-page', () => {
  assert.equal(manuscriptPages(600, 300), 2);
});

check('readingTime = words / wpm (default 238)', () => {
  near(readingTime(238), 1, 1e-9);
  near(readingTime(1190), 5, 1e-9);
});

check('speakingTime is slower than reading time', () => {
  assert.ok(speakingTime(1000) > readingTime(1000));
});

check('category boundaries follow SFWA definitions', () => {
  assert.equal(category(999), 'flash fiction');
  assert.equal(category(1000), 'short story');
  assert.equal(category(7499), 'short story');
  assert.equal(category(7500), 'novelette');
  assert.equal(category(17499), 'novelette');
  assert.equal(category(17500), 'novella');
  assert.equal(category(39999), 'novella');
  assert.equal(category(40000), 'novel');
});

check('pages increase monotonically with words', () => {
  assert.ok(manuscriptPages(10000) > manuscriptPages(5000));
});

check('reading and speaking times scale linearly', () => {
  near(readingTime(2000), 2 * readingTime(1000), 1e-9);
  near(speakingTime(2000), 2 * speakingTime(1000), 1e-9);
});

check('zero words yields zero pages, zero time, flash category', () => {
  assert.equal(manuscriptPages(0), 0);
  assert.equal(readingTime(0), 0);
  assert.equal(category(0), 'flash fiction');
});

check('validation', () => {
  assert.throws(() => manuscriptPages(-1), /non-negative/);
  assert.throws(() => manuscriptPages(1000, 0), /words per page/);
  assert.throws(() => readingTime(1000, 0), /wpm must be positive/);
  assert.throws(() => category(-5), /non-negative/);
});

console.log(`\n${n} checks passed.`);
