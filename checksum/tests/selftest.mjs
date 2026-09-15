import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { utf8bytes, adler32, fletcher16, toHex } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('Adler-32 empty string = 1', () => {
  assert.equal(adler32(''), 1);
});

check('Adler-32 of "a" = 0x00620062', () => {
  assert.equal(adler32('a'), 0x00620062);
});

check('Adler-32 of "Wikipedia" = 0x11E60398', () => {
  assert.equal(adler32('Wikipedia'), 0x11E60398);
});

check('Adler-32 low 16 bits = sum of bytes + 1 (mod 65521) for short input', () => {
  // "abc": a-part = 1 + 97 + 98 + 99 = 295
  assert.equal(adler32('abc') & 0xffff, 295);
});

check('Fletcher-16 canonical vectors', () => {
  assert.equal(fletcher16('abcde'), 0xC8F0);
  assert.equal(fletcher16('abcdef'), 0x2057);
  assert.equal(fletcher16('abcdefgh'), 0x0627);
});

check('Fletcher-16 empty = 0', () => {
  assert.equal(fletcher16(''), 0);
});

check('utf8bytes counts multi-byte characters', () => {
  assert.equal(utf8bytes('a').length, 1);
  assert.equal(utf8bytes('é').length, 2);   // U+00E9 → 2 bytes
  assert.equal(utf8bytes('☃').length, 3);   // snowman → 3 bytes
});

check('checksums operate on UTF-8 bytes (differ for accented text)', () => {
  assert.notEqual(adler32('café'), adler32('cafe'));
});

check('results are unsigned 32-bit / 16-bit', () => {
  const a = adler32('The quick brown fox');
  assert.ok(a >= 0 && a <= 0xffffffff);
  const f = fletcher16('The quick brown fox');
  assert.ok(f >= 0 && f <= 0xffff);
});

check('toHex formatting with width padding', () => {
  assert.equal(toHex(0x11E60398, 8), '0x11E60398');
  assert.equal(toHex(0x627, 4), '0x0627');
  assert.equal(toHex(1, 8), '0x00000001');
});

console.log(`\n${n} checks passed.`);
