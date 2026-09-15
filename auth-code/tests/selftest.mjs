// Headless regression tests for AuthCode crypto against RFC 4226 / 6238 vectors.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');

const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)]
  .map(m => m[1]).sort((a, b) => b.length - a.length)[0];

function el(){ return {value:'',textContent:'',innerHTML:'',style:{setProperty(){}},className:'',
  appendChild(){},getAttribute(){return null;},setAttribute(){},removeAttribute(){},
  addEventListener(){},querySelectorAll(){return[];}}; }
globalThis.document = {
  getElementById: () => el(), createElement: () => el(),
  querySelectorAll: () => [], documentElement: el()
};
globalThis.localStorage = { getItem:()=>null, setItem(){}, removeItem(){} };
globalThis.matchMedia = () => ({ matches:false });
globalThis.window = { matchMedia: globalThis.matchMedia };
globalThis.setInterval = () => 0;

eval(js.replace('if(typeof module !== \'undefined\') module.exports =',
  'globalThis.__t =') );
const { textToBytes, sha1Bytes, sha1Hex, hmacSha1Bytes, base32Decode, hotp, totp } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('sha1Hex matches known vectors', () => {
  assert.equal(sha1Hex(''), 'da39a3ee5e6b4b0d3255bfef95601890afd80709');
  assert.equal(sha1Hex('abc'), 'a9993e364706816aba3e25717850c26c9cd0d89d');
  assert.equal(sha1Hex('The quick brown fox jumps over the lazy dog'),
    '2fd4e1c67a2d28fced849ee1bb76e7391b93eb12');
});

check('sha1Hex handles multi-block (FIPS 180 vector #2, 56 bytes)', () => {
  // 56-byte input forces a second 64-byte block after padding.
  assert.equal(sha1Hex('abcdbcdecdefdefgefghfghighijhijkijkljklmklmnlmnomnopnopq'),
    '84983e441c3bd26ebaae4aa1f95129e5e54670f1');
});

check('hmacSha1 matches RFC 2202 vector', () => {
  // key = 20x 0x0b, data = "Hi There"
  const key = new Array(20).fill(0x0b);
  const mac = hmacSha1Bytes(key, textToBytes('Hi There'));
  const hex = mac.map(b => ('0'+b.toString(16)).slice(-2)).join('');
  assert.equal(hex, 'b617318655057264e28bc0b6fb378c8ef146be00');
});

check('base32Decode round-trips a known secret', () => {
  // "12345678901234567890" is the RFC 4226 seed
  const bytes = base32Decode('GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ');
  assert.deepEqual(bytes, textToBytes('12345678901234567890'));
  // JBSWY3DPEHPK3PXP -> "Hello!\xDE\xAD\xBE\xEF"
  assert.deepEqual(base32Decode('MFRGG==='), textToBytes('abc'));
  assert.deepEqual(base32Decode('mfrgg'), textToBytes('abc')); // lowercase
});

check('base32Decode rejects invalid chars', () => {
  assert.equal(base32Decode('0189'), null); // 0,1,8,9 not in alphabet
  assert.equal(base32Decode(''), null);
  assert.equal(base32Decode('!!!'), null);
});

check('HOTP matches RFC 4226 Appendix D (counts 0-9)', () => {
  const key = textToBytes('12345678901234567890');
  const expected = ['755224','287082','359152','969429','338314',
                    '254676','287922','162583','399871','520489'];
  for(let c = 0; c < 10; c++) assert.equal(hotp(key, c, 6), expected[c]);
});

check('TOTP matches RFC 6238 vectors (SHA-1, 8 digits)', () => {
  const secret = 'GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ';
  const vecs = [
    [59, '94287082'],
    [1111111109, '07081804'],
    [1111111111, '14050471'],
    [1234567890, '89005924'],
    [2000000000, '69279037'],
  ];
  for(const [time, code] of vecs)
    assert.equal(totp(secret, { time, digits: 8 }).code, code);
});

check('TOTP 6-digit at T=59 equals HOTP count 1', () => {
  const r = totp('GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ', { time: 59 });
  assert.equal(r.code, '287082');
});

check('TOTP secondsRemaining within the 30s window', () => {
  assert.equal(totp('GEZDGNBVGY3TQOJQ', { time: 59 }).secondsRemaining, 1);
  assert.equal(totp('GEZDGNBVGY3TQOJQ', { time: 30 }).secondsRemaining, 30);
  assert.equal(totp('GEZDGNBVGY3TQOJQ', { time: 45 }).secondsRemaining, 15);
});

check('totp returns null for invalid secret', () => {
  assert.equal(totp('0189', { time: 59 }), null);
  assert.equal(totp('', { time: 59 }), null);
});

console.log(`\n${n} checks passed.`);
