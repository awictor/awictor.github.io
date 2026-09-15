import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { tokenize, firstLetter, findAlliterations } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('tokenize extracts words', () => {
  assert.deepEqual(tokenize('Peter Piper picked!'), ['Peter', 'Piper', 'picked']);
});

check('firstLetter is the lowercased initial', () => {
  assert.equal(firstLetter('Peter'), 'p');
  assert.equal(firstLetter('APPLE'), 'a');
});

check('finds a basic alliterative run', () => {
  const r = findAlliterations('Peter Piper picked fruit', { minRun: 3, ignoreStopwords: false });
  assert.equal(r.length, 1);
  assert.equal(r[0].letter, 'p');
  assert.equal(r[0].length, 3);
  assert.deepEqual(r[0].words, ['Peter', 'Piper', 'picked']);
});

check('minRun filters shorter runs', () => {
  assert.equal(findAlliterations('big bad cat', { minRun: 3, ignoreStopwords: false }).length, 0);
  assert.equal(findAlliterations('big bad bear', { minRun: 3, ignoreStopwords: false }).length, 1);
});

check('small words are skipped when enabled', () => {
  // "the big bad bear" -> big/bad/bear once "the" is skipped
  const r = findAlliterations('the big bad bear', { minRun: 3, ignoreStopwords: true });
  assert.equal(r.length, 1);
  assert.deepEqual(r[0].words, ['big', 'bad', 'bear']);
});

check('a differing word breaks the run', () => {
  const r = findAlliterations('silly snakes slither quickly slyly', { minRun: 2, ignoreStopwords: false });
  // silly snakes slither (3), then quickly breaks, then slyly alone (no run)
  assert.equal(r.length, 1);
  assert.equal(r[0].length, 3);
});

check('multiple separate runs are found', () => {
  const r = findAlliterations('dizzy ducks danced then wild wolves wandered', { minRun: 3, ignoreStopwords: true });
  assert.equal(r.length, 2);
  assert.equal(r[0].letter, 'd');
  assert.equal(r[1].letter, 'w');
});

check('matching is case-insensitive', () => {
  const r = findAlliterations('Big Bold Bears', { minRun: 3, ignoreStopwords: false });
  assert.equal(r.length, 1);
  assert.equal(r[0].letter, 'b');
});

check('no alliteration yields no runs', () => {
  assert.equal(findAlliterations('one apple fell down slowly', { minRun: 2, ignoreStopwords: false }).length, 0);
});

check('validation', () => {
  assert.throws(() => findAlliterations('a b c', { minRun: 1 }), /at least 2/);
});

console.log(`\n${n} checks passed.`);
