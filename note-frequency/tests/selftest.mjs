import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { noteToMidi, midiToName, midiToFreq, noteToFreq, freqToNote } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b} (±${eps})`);

check('note → MIDI', () => {
  assert.equal(noteToMidi('A4'), 69);
  assert.equal(noteToMidi('C4'), 60);
  assert.equal(noteToMidi('C#4'), 61);
  assert.equal(noteToMidi('Db4'), 61);
  assert.equal(noteToMidi('A0'), 21);   // lowest piano key
});

check('MIDI → name', () => {
  assert.equal(midiToName(69), 'A4');
  assert.equal(midiToName(60), 'C4');
  assert.equal(midiToName(61), 'C#4');
  assert.equal(midiToName(21), 'A0');
});

check('A4 = 440 Hz, octaves double', () => {
  near(noteToFreq('A4'), 440, 1e-9);
  near(noteToFreq('A5'), 880, 1e-9);
  near(noteToFreq('A3'), 220, 1e-9);
});

check('middle C ≈ 261.63 Hz', () => {
  near(noteToFreq('C4'), 261.63, 0.01);
});

check('adjustable reference pitch', () => {
  near(noteToFreq('A4', 432), 432, 1e-9);
  near(noteToFreq('A5', 432), 864, 1e-9);
});

check('freqToNote identifies the note and 0 cents when exact', () => {
  const r = freqToNote(440);
  assert.equal(r.name, 'A4');
  assert.equal(r.cents, 0);
});

check('freqToNote on middle C', () => {
  const r = freqToNote(261.63);
  assert.equal(r.name, 'C4');
  assert.ok(Math.abs(r.cents) <= 1);
});

check('cents measure detuning', () => {
  const r = freqToNote(452);   // a bit sharp of A4 (440)
  assert.equal(r.name, 'A4');
  assert.ok(r.cents > 40 && r.cents < 50);   // ~46 cents sharp
});

check('note → freq → note round-trip', () => {
  for(const nm of ['C2', 'E4', 'G#5', 'Bb3', 'F6']){
    assert.equal(freqToNote(noteToFreq(nm)).name, nm.replace('Bb', 'A#'));
  }
});

check('validation', () => {
  assert.throws(() => noteToMidi('H4'), /invalid note/);
  assert.throws(() => noteToMidi('A'), /invalid note/);
  assert.throws(() => freqToNote(0), /> 0/);
});

console.log(`\n${n} checks passed.`);
