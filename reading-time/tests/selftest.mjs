import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { SPEAK_WPM, countWords, readingTime, speakingTime, humanize } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b) => assert.ok(Math.abs(a - b) < 1e-9, `${a} != ${b}`);
const words = k => Array(k).fill('word').join(' ');

check('countWords counts runs of non-whitespace', () => {
  assert.equal(countWords('hello world foo'), 3);
  assert.equal(countWords('  spaced   out  words '), 3);
  assert.equal(countWords('line1\nline2\tline3'), 3);
});

check('countWords: empty and whitespace-only are zero', () => {
  assert.equal(countWords(''), 0);
  assert.equal(countWords('    \n\t '), 0);
});

check('reading time = words / wpm', () => {
  near(readingTime(words(200), 200), 1);
  near(readingTime(words(500), 200), 2.5);
  near(readingTime(words(1000), 250), 4);
});

check('reading time scales inversely with speed', () => {
  assert.ok(readingTime(words(300), 100) > readingTime(words(300), 300));
});

check('default reading speed is 238 wpm', () => {
  near(readingTime(words(238)), 1);
});

check('speaking time is slower than reading time', () => {
  assert.equal(SPEAK_WPM, 130);
  assert.ok(speakingTime(words(300)) > readingTime(words(300)));
  near(speakingTime(words(130)), 1);
});

check('zero words means zero time', () => {
  assert.equal(readingTime('', 200), 0);
  assert.equal(speakingTime(''), 0);
});

check('humanize formats durations', () => {
  assert.equal(humanize(0), '0 min');
  assert.equal(humanize(1), '1 min');
  assert.equal(humanize(2.5), '2 min 30 sec');
  assert.match(humanize(0.25), /sec/); // under a minute
});

check('humanize handles the 60-second rollover', () => {
  assert.equal(humanize(1.999), '2 min'); // rounds seconds to 60 -> bumps the minute
});

check('validation: non-string text and non-positive wpm throw', () => {
  assert.throws(() => countWords(42), /must be a string/);
  assert.throws(() => readingTime('hi', 0), /positive number/);
  assert.throws(() => humanize(-1), /zero or more/);
});

console.log(`\n${n} checks passed.`);
