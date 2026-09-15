import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { MOD, adler32Bytes, adler32, toHex } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('the modulus is 65521 (largest prime below 2^16)', () => {
  assert.equal(MOD, 65521);
});

check('empty input is 1', () => {
  assert.equal(adler32(''), 1);
  assert.equal(adler32Bytes([]), 1);
});

check('canonical vector: Adler-32("Wikipedia") = 0x11E60398', () => {
  assert.equal(adler32('Wikipedia'), 0x11E60398);
  assert.equal(adler32('Wikipedia'), 300286872);
});

check('single character "a"', () => {
  assert.equal(adler32('a'), 0x00620062); // A=98, B=98
});

check('"abc" worked example', () => {
  assert.equal(adler32('abc'), 0x024D0127);
});

check('byte-array API matches string API', () => {
  assert.equal(adler32Bytes([97, 98, 99]), adler32('abc'));
});

check('result is an unsigned 32-bit integer', () => {
  const v = adler32('The quick brown fox jumps over the lazy dog');
  assert.ok(v >= 0 && v <= 0xFFFFFFFF && Number.isInteger(v));
});

check('changing one byte changes the checksum', () => {
  assert.notEqual(adler32('hello'), adler32('hellp'));
});

check('toHex is 8-digit zero-padded lowercase', () => {
  assert.equal(toHex(1), '00000001');
  assert.equal(toHex(0x11E60398), '11e60398');
  assert.equal(toHex(0x620062), '00620062');
});

check('validation: non-string and non-array throw', () => {
  assert.throws(() => adler32(123), /must be a string/);
  assert.throws(() => adler32Bytes(42), /expected a byte array/);
  assert.throws(() => toHex(-1), /non-negative/);
});

console.log(`\n${n} checks passed.`);
