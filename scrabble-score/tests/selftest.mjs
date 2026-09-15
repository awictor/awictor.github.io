import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { LETTER_VALUES, letterScore, wordScore, breakdown } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('all 26 letters have a value', () => {
  for (let c = 65; c <= 90; c++) assert.ok(LETTER_VALUES[String.fromCharCode(c)] > 0);
  assert.equal(Object.keys(LETTER_VALUES).length, 26);
});

check('specific tile values', () => {
  assert.equal(LETTER_VALUES.A, 1);
  assert.equal(LETTER_VALUES.D, 2);
  assert.equal(LETTER_VALUES.K, 5);
  assert.equal(LETTER_VALUES.J, 8);
  assert.equal(LETTER_VALUES.Q, 10);
  assert.equal(LETTER_VALUES.Z, 10);
});

check('the ten 1-point letters sum correctly', () => {
  const ones = 'AEIOULNSTR'.split('').filter(c => LETTER_VALUES[c] === 1);
  assert.equal(ones.length, 10);
});

check('letterScore is case-insensitive', () => {
  assert.equal(letterScore('q'), 10);
  assert.equal(letterScore('Q'), 10);
  assert.equal(letterScore('a'), 1);
});

check('letterScore returns 0 for non-letters', () => {
  assert.equal(letterScore('!'), 0);
  assert.equal(letterScore('3'), 0);
  assert.equal(letterScore(' '), 0);
});

check('wordScore: quiz = 22', () => {
  assert.equal(wordScore('quiz'), 22); // 10+1+1+10
});

check('wordScore: hello = 8, scrabble = 14', () => {
  assert.equal(wordScore('hello'), 8);   // 4+1+1+1+1
  assert.equal(wordScore('scrabble'), 14); // 1+3+1+1+3+3+1+1
});

check('non-letters are ignored and case does not matter', () => {
  assert.equal(wordScore('cat!'), wordScore('CAT'));
  assert.equal(wordScore('a b c'), wordScore('abc'));
  assert.equal(wordScore(''), 0);
});

check('breakdown lists scoring letters that sum to the word score', () => {
  const b = breakdown('Cat!');
  assert.deepEqual(b, [{ letter: 'C', value: 3 }, { letter: 'A', value: 1 }, { letter: 'T', value: 1 }]);
  assert.equal(b.reduce((s, x) => s + x.value, 0), wordScore('Cat!'));
});

check('validation: non-string input throws', () => {
  assert.throws(() => wordScore(42), /must be a string/);
  assert.throws(() => breakdown(null), /must be a string/);
  assert.throws(() => letterScore('ab'), /one character/);
});

console.log(`\n${n} checks passed.`);
