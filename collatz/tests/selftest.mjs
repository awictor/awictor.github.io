import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { collatzNext, collatzSequence, collatzSteps, collatzMax } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('one step: even halves, odd triples plus one', () => {
  assert.equal(collatzNext(8), 4);
  assert.equal(collatzNext(7), 22);
  assert.equal(collatzNext(1), 4);
});

check('sequence for 6', () => {
  assert.deepEqual(collatzSequence(6), [6, 3, 10, 5, 16, 8, 4, 2, 1]);
});

check('sequence for 1 is just [1]', () => {
  assert.deepEqual(collatzSequence(1), [1]);
  assert.equal(collatzSteps(1), 0);
});

check('steps for 6 and 7', () => {
  assert.equal(collatzSteps(6), 8);
  assert.equal(collatzSteps(7), 16);
});

check('the famous 27: 111 steps, peak 9232', () => {
  assert.equal(collatzSteps(27), 111);
  assert.equal(collatzMax(27), 9232);
});

check('every sequence ends at 1', () => {
  for (let i = 1; i <= 500; i++) {
    const s = collatzSequence(i);
    assert.equal(s[s.length - 1], 1);
  }
});

check('peak value for 7 is 52', () => {
  assert.equal(collatzMax(7), 52);
  assert.equal(collatzMax(1), 1);
});

check('powers of two take exactly log2(n) steps', () => {
  assert.equal(collatzSteps(1024), 10);
  assert.equal(collatzSteps(64), 6);
});

check('each consecutive pair follows the rule', () => {
  const s = collatzSequence(97);
  for (let i = 1; i < s.length; i++) assert.equal(s[i], collatzNext(s[i - 1]));
});

check('validation: zero, negatives, and non-integers throw', () => {
  assert.throws(() => collatzSequence(0), /positive whole number/);
  assert.throws(() => collatzSequence(-4), /positive whole number/);
  assert.throws(() => collatzSequence(2.5), /positive whole number/);
});

console.log(`\n${n} checks passed.`);
