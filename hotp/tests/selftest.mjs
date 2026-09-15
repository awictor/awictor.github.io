import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { sha1Hex, hmacSha1, hotp, asciiToBytes, base32Decode, toHex } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('SHA-1 known vectors', () => {
  assert.equal(sha1Hex(asciiToBytes('')), 'da39a3ee5e6b4b0d3255bfef95601890afd80709');
  assert.equal(sha1Hex(asciiToBytes('abc')), 'a9993e364706816aba3e25717850c26c9cd0d89d');
  assert.equal(sha1Hex(asciiToBytes('The quick brown fox jumps over the lazy dog')),
    '2fd4e1c67a2d28fced849ee1bb76e7391b93eb12');
});

check('HMAC-SHA1 RFC 2202 vector', () => {
  const key = new Array(20).fill(0x0b);
  assert.equal(toHex(hmacSha1(key, asciiToBytes('Hi There'))),
    'b617318655057264e28bc0b6fb378c8ef146be00');
});

check('HOTP RFC 4226 reference vectors (ASCII key)', () => {
  const key = asciiToBytes('12345678901234567890');
  const expected = ['755224', '287082', '359152', '969429', '338314',
                    '254676', '287922', '162583', '399871', '520489'];
  for (let c = 0; c < 10; c++) assert.equal(hotp(key, c, 6), expected[c]);
});

check('HOTP 8-digit truncation for counter 0', () => {
  assert.equal(hotp(asciiToBytes('12345678901234567890'), 0, 8), '84755224');
});

check('base32 decode vectors (RFC 4648)', () => {
  assert.deepEqual(base32Decode('MY======'), [0x66]);          // "f"
  assert.deepEqual(base32Decode('MZXW6==='), [0x66, 0x6f, 0x6f]); // "foo"
});

check('base32 of the RFC HOTP key decodes to the ASCII key', () => {
  assert.deepEqual(base32Decode('GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ'),
    asciiToBytes('12345678901234567890'));
});

check('HOTP from base32 secret equals HOTP from ASCII', () => {
  const b32 = base32Decode('GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ');
  const ascii = asciiToBytes('12345678901234567890');
  for (let c = 0; c < 5; c++) assert.equal(hotp(b32, c, 6), hotp(ascii, c, 6));
});

check('OTP is zero-padded to the requested digits', () => {
  const otp = hotp(asciiToBytes('12345678901234567890'), 0, 6);
  assert.equal(otp.length, 6);
  assert.match(otp, /^\d{6}$/);
});

check('SHA-1 output is 20 bytes', () => {
  assert.equal(sha1Hex(asciiToBytes('anything')).length, 40);
});

check('invalid base32 throws', () => {
  assert.throws(() => base32Decode('THIS-HAS-DASHES!'), /invalid base32/);
});

console.log(`\n${n} checks passed.`);
