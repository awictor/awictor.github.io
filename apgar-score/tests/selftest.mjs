import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { COMPONENTS, apgarTotal, apgarInterpretation } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

const full = (v) => ({ appearance: v, pulse: v, grimace: v, activity: v, respiration: v });

check('all 2s is the maximum 10', () => {
  assert.equal(apgarTotal(full(2)), 10);
});

check('all 0s is the minimum 0', () => {
  assert.equal(apgarTotal(full(0)), 0);
});

check('mixed scores sum correctly', () => {
  assert.equal(apgarTotal({ appearance: 1, pulse: 2, grimace: 2, activity: 1, respiration: 2 }), 8);
});

check('each component must be 0, 1 or 2', () => {
  assert.throws(() => apgarTotal({ ...full(2), pulse: 3 }), /pulse must be 0, 1 or 2/);
  assert.throws(() => apgarTotal({ ...full(2), appearance: -1 }), /appearance must be/);
});

check('a missing component throws', () => {
  assert.throws(() => apgarTotal({ appearance: 2, pulse: 2 }), /must be 0, 1 or 2/);
});

check('interpretation bands', () => {
  assert.equal(apgarInterpretation(10), 'reassuring');
  assert.equal(apgarInterpretation(7), 'reassuring');
  assert.equal(apgarInterpretation(6), 'moderately low');
  assert.equal(apgarInterpretation(4), 'moderately low');
  assert.equal(apgarInterpretation(3), 'critically low');
  assert.equal(apgarInterpretation(0), 'critically low');
});

check('interpretation boundaries at 7 and 4', () => {
  assert.equal(apgarInterpretation(7), 'reassuring');
  assert.equal(apgarInterpretation(6), 'moderately low');
  assert.equal(apgarInterpretation(4), 'moderately low');
  assert.equal(apgarInterpretation(3), 'critically low');
});

check('the five components each have three options 0/1/2', () => {
  assert.equal(COMPONENTS.length, 5);
  COMPONENTS.forEach(c => {
    assert.equal(c.opts.length, 3);
    assert.deepEqual(c.opts.map(o => o.v), [0, 1, 2]);
  });
});

check('interpretation rejects out-of-range totals', () => {
  assert.throws(() => apgarInterpretation(11), /total must be 0-10/);
  assert.throws(() => apgarInterpretation(-1), /total must be 0-10/);
});

check('validation', () => {
  assert.throws(() => apgarTotal(null), /must be an object/);
  assert.throws(() => apgarTotal('x'), /must be an object/);
});

console.log(`\n${n} checks passed.`);
