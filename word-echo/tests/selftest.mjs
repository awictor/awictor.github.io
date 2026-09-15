import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { tokenize, findEchoes, echoWordCount } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('tokenize lowercases and indexes word tokens', () => {
  const t = tokenize('The Quick, brown!');
  assert.deepEqual(t.map(x => x.word), ['the', 'quick', 'brown']);
  assert.deepEqual(t.map(x => x.index), [0, 1, 2]);
});

check('finds a repeat within the window', () => {
  // "happy" at index 0 and 3, distance 3 <= window 6
  const e = findEchoes('happy little happy days', { window: 6, minLength: 4, ignoreStopwords: false });
  assert.equal(e.length, 1);
  assert.equal(e[0].word, 'happy');
  assert.equal(e[0].distance, 2);
});

check('ignores repeats outside the window', () => {
  const text = 'happy ' + 'x '.repeat(10) + 'happy';
  const near = findEchoes(text, { window: 3, minLength: 4, ignoreStopwords: false });
  assert.equal(near.filter(e => e.word === 'happy').length, 0);
  const far = findEchoes(text, { window: 20, minLength: 1, ignoreStopwords: false });
  assert.equal(far.filter(e => e.word === 'happy').length, 1);
});

check('minLength filters out short words', () => {
  const e = findEchoes('cat sat cat', { window: 6, minLength: 4, ignoreStopwords: false });
  assert.equal(e.length, 0); // "cat" is length 3
  const e2 = findEchoes('cat sat cat', { window: 6, minLength: 3, ignoreStopwords: false });
  assert.equal(e2.length, 1);
});

check('stop-words are ignored when enabled', () => {
  const withStop = findEchoes('the fox and the hound', { window: 6, minLength: 1, ignoreStopwords: true });
  assert.equal(withStop.filter(e => e.word === 'the').length, 0);
  const noStop = findEchoes('the fox and the hound', { window: 6, minLength: 1, ignoreStopwords: false });
  assert.equal(noStop.filter(e => e.word === 'the').length, 1);
});

check('reports distance between occurrences', () => {
  const e = findEchoes('report of the report', { window: 6, minLength: 4, ignoreStopwords: true });
  assert.equal(e[0].word, 'report');
  assert.equal(e[0].distance, 3); // indices 0 and 3
});

check('chained repeats each register against the previous', () => {
  // quickly at 0,2,4 -> two echoes (0->2, 2->4)
  const e = findEchoes('quickly ran quickly ran quickly', { window: 6, minLength: 4, ignoreStopwords: false });
  assert.equal(e.filter(x => x.word === 'quickly').length, 2);
});

check('echoWordCount counts distinct echoed words', () => {
  const text = 'happy happy sad glad sad';
  assert.equal(echoWordCount(text, { window: 10, minLength: 3, ignoreStopwords: false }), 2); // happy, sad
});

check('clean text has no echoes', () => {
  assert.equal(findEchoes('every single word here stays unique always', { window: 10, minLength: 3, ignoreStopwords: false }).length, 0);
});

check('validation', () => {
  assert.throws(() => findEchoes('a b c', { window: 0 }), /window must be at least 1/);
});

console.log(`\n${n} checks passed.`);
