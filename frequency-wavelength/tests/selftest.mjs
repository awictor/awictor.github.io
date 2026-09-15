import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { C, wavelength, frequency, period, quarterWave, halfWave, toHz } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, tol = 1e-6) => assert.ok(Math.abs(a - b) <= tol * Math.max(1, Math.abs(b)), `${a} not near ${b}`);

check('speed of light constant', () => {
  assert.equal(C, 299792458);
});

check('1 GHz -> ~0.2998 m', () => {
  near(wavelength(1e9), 0.299792458);
});

check('100 MHz -> ~2.998 m', () => {
  near(wavelength(100e6), 2.99792458);
});

check('frequency of a 1 m wave is c', () => {
  near(frequency(1), 299792458);
});

check('frequency and wavelength are inverses through c', () => {
  near(frequency(wavelength(146e6)), 146e6);
  near(wavelength(frequency(0.75)), 0.75);
});

check('period is 1/f', () => {
  near(period(1e9), 1e-9);
  near(period(50), 0.02);
});

check('quarter- and half-wave lengths', () => {
  near(quarterWave(1e9), 0.299792458 / 4);
  near(halfWave(1e9), 0.299792458 / 2);
  near(halfWave(300e6), 2 * quarterWave(300e6));
});

check('red light ~700 nm has frequency ~4.28e14 Hz', () => {
  near(frequency(700e-9), C / 700e-9); // ~4.283e14
  assert.ok(frequency(700e-9) > 4.2e14 && frequency(700e-9) < 4.4e14);
});

check('toHz normalizes frequency and wavelength units', () => {
  assert.equal(toHz(100, 'MHz'), 100e6);
  assert.equal(toHz(2, 'GHz'), 2e9);
  near(toHz(1, 'm'), frequency(1));
  near(toHz(100, 'cm'), frequency(1)); // 100 cm = 1 m
});

check('validation: non-positive values and unknown unit throw', () => {
  assert.throws(() => wavelength(0), /frequency must be a positive/);
  assert.throws(() => frequency(-1), /wavelength must be a positive/);
  assert.throws(() => toHz(100, 'furlongs'), /unknown unit/);
});

console.log(`\n${n} checks passed.`);
