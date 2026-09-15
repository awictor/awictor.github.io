import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { msPerBeat, durationMs, hz, NOTES } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps = 1e-6) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b}`);

check('ms per beat = 60000 / BPM', () => {
  assert.equal(msPerBeat(120), 500);
  assert.equal(msPerBeat(60), 1000);
  near(msPerBeat(174), 344.827586, 1e-4);
});

check('quarter note equals one beat', () => {
  assert.equal(durationMs(120, 1 / 4), 500);
  assert.equal(durationMs(60, 1 / 4), 1000);
});

check('note-value scaling', () => {
  assert.equal(durationMs(120, 1), 2000);      // whole = 4 beats
  assert.equal(durationMs(120, 1 / 2), 1000);  // half
  assert.equal(durationMs(120, 1 / 8), 250);   // eighth
  assert.equal(durationMs(120, 1 / 16), 125);  // sixteenth
});

check('dotted = ×1.5', () => {
  assert.equal(durationMs(120, 1 / 4, 'dotted'), 750);
  assert.equal(durationMs(120, 1 / 8, 'dotted'), 375);
});

check('triplet = ×2/3', () => {
  near(durationMs(120, 1 / 4, 'triplet'), 1000 / 3);
  near(durationMs(120, 1 / 8, 'triplet'), 500 / 3);
});

check('Hz is the reciprocal delay frequency', () => {
  assert.equal(hz(500), 2);            // quarter at 120 BPM = 2 Hz
  assert.equal(hz(1000), 1);
});

check('higher tempo → shorter delays', () => {
  assert.ok(durationMs(140, 1 / 4) < durationMs(120, 1 / 4));
});

check('straight is the default modifier', () => {
  assert.equal(durationMs(120, 1 / 4), durationMs(120, 1 / 4, 'straight'));
});

check('note table covers whole … thirty-second', () => {
  assert.equal(NOTES.length, 6);
  assert.deepEqual(NOTES.map(x => x.f), [1, 1 / 2, 1 / 4, 1 / 8, 1 / 16, 1 / 32]);
});

check('validation', () => {
  assert.throws(() => msPerBeat(0), /BPM/);
  assert.throws(() => msPerBeat(-120), /BPM/);
  assert.throws(() => durationMs(120, 0), /note fraction/);
  assert.throws(() => durationMs(120, 1 / 4, 'swung'), /unknown modifier/);
});

console.log(`\n${n} checks passed.`);
