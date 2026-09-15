import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { nyquistFrequency, minSampleRate, isAliased, aliasFrequency, pcmDataRate } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('Nyquist frequency is half the sample rate', () => {
  assert.equal(nyquistFrequency(44100), 22050);
  assert.equal(nyquistFrequency(48000), 24000);
});

check('minimum sample rate is twice the highest frequency', () => {
  assert.equal(minSampleRate(20000), 40000);
  assert.equal(minSampleRate(22050), 44100);
});

check('aliasing is detected above the Nyquist frequency', () => {
  assert.equal(isAliased(30000, 44100), true);
  assert.equal(isAliased(1000, 44100), false);
  assert.equal(isAliased(22050, 44100), false); // exactly at Nyquist is not >
});

check('a 30 kHz tone at 44.1 kHz folds to 14.1 kHz', () => {
  assert.equal(aliasFrequency(30000, 44100), 14100);
});

check('a signal below Nyquist is unchanged', () => {
  assert.equal(aliasFrequency(1000, 44100), 1000);
  assert.equal(aliasFrequency(20000, 44100), 20000);
});

check('a tone just above the sample rate folds near zero', () => {
  assert.equal(aliasFrequency(46100, 44100), 2000);
  assert.equal(aliasFrequency(44100, 44100), 0);
});

check('aliased frequency always lands within [0, Nyquist]', () => {
  const sr = 44100, nyq = sr / 2;
  for (const f of [5000, 30000, 46100, 88000, 100000]) {
    const a = aliasFrequency(f, sr);
    assert.ok(a >= 0 && a <= nyq + 1e-9, `${f} -> ${a}`);
  }
});

check('CD audio PCM rate is 1,411,200 bits/s', () => {
  assert.equal(pcmDataRate(44100, 16, 2), 1411200);
});

check('PCM rate scales with depth and channels', () => {
  assert.equal(pcmDataRate(48000, 24, 1), 48000 * 24);
  assert.equal(pcmDataRate(44100, 16, 1) * 2, pcmDataRate(44100, 16, 2));
});

check('validation: non-positive inputs throw', () => {
  assert.throws(() => nyquistFrequency(0), /positive/);
  assert.throws(() => minSampleRate(-1), /positive/);
  assert.throws(() => aliasFrequency(1000, 0), /positive/);
  assert.throws(() => pcmDataRate(44100, 0, 2), /positive/);
});

console.log(`\n${n} checks passed.`);
