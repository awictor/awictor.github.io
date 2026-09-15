// Headless regression tests for HmacGen crypto against RFC 4231 / 2202 / FIPS 180.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');

const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)]
  .map(m => m[1]).sort((a, b) => b.length - a.length)[0];

function el(){ return {value:'',textContent:'',innerHTML:'',style:{},className:'',checked:false,
  appendChild(){},getAttribute(){return null;},setAttribute(){},removeAttribute(){},
  addEventListener(){},querySelectorAll(){return[];}}; }
globalThis.document = {
  getElementById: () => el(), createElement: () => el(),
  querySelectorAll: () => [], documentElement: el()
};
globalThis.localStorage = { getItem:()=>null, setItem(){}, removeItem(){} };
globalThis.matchMedia = () => ({ matches:false });
globalThis.window = { matchMedia: globalThis.matchMedia };

eval(js.replace('if(typeof module !== \'undefined\') module.exports =',
  'globalThis.__t =') );
const { textToBytes, hexToBytes, toHex, sha1Bytes, sha256Bytes, hmac, hashHex, hmacHex } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const sha256hex = s => toHex(sha256Bytes(textToBytes(s)));
const sha1hex = s => toHex(sha1Bytes(textToBytes(s)));

check('SHA-256 known vectors', () => {
  assert.equal(sha256hex(''), 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');
  assert.equal(sha256hex('abc'), 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');
});

check('SHA-256 multi-block (56-byte FIPS 180 vector)', () => {
  assert.equal(sha256hex('abcdbcdecdefdefgefghfghighijhijkijkljklmklmnlmnomnopnopq'),
    '248d6a61d20638b8e5c026930c3e6039a33ce45964ff2167f6ecedd419db06c1');
});

check('SHA-1 known vector (sanity)', () => {
  assert.equal(sha1hex('abc'), 'a9993e364706816aba3e25717850c26c9cd0d89d');
});

check('HMAC-SHA256 RFC 4231 test case 1', () => {
  // key = 20 bytes of 0x0b, data = "Hi There"
  assert.equal(hmacHex('sha256', '0b'.repeat(20), 'Hi There', { keyHex: true }),
    'b0344c61d8db38535ca8afceaf0bf12b881dc200c9833da726e9376c2e32cff7');
});

check('HMAC-SHA256 RFC 4231 test case 2', () => {
  assert.equal(hmacHex('sha256', 'Jefe', 'what do ya want for nothing?'),
    '5bdcc146bf60754e6a042426089575c75a003f089d2739839dec58b964ec3843');
});

check('HMAC-SHA256 RFC 4231 test case 4 (long key path not triggered)', () => {
  // key = 25 bytes 0x01..0x19, data = 50 bytes of 0xcd
  const key = Array.from({length:25}, (_,i)=>('0'+(i+1).toString(16)).slice(-2)).join('');
  const data = 'cd'.repeat(50);
  assert.equal(hmacHex('sha256', key, data, { keyHex: true, msgHex: true }),
    '82558a389a443c0ea4cc819899f2083a85f0faa3e578f8077a2e3ff46729665b');
});

check('HMAC-SHA256 long key (>64 bytes) is hashed first — RFC 4231 case 6', () => {
  const key = 'aa'.repeat(131);      // 131 bytes 0xaa
  assert.equal(
    hmacHex('sha256', key, 'Test Using Larger Than Block-Size Key - Hash Key First', { keyHex: true }),
    '60e431591ee0b67f0d8a26aacbf5b77f8e0bc6213728c5140546040f0ee37f54');
});

check('HMAC-SHA1 RFC 2202 test case 1', () => {
  assert.equal(hmacHex('sha1', '0b'.repeat(20), 'Hi There', { keyHex: true }),
    'b617318655057264e28bc0b6fb378c8ef146be00');
});

check('hashHex and hex-key parsing helpers', () => {
  assert.equal(hashHex('sha256', 'abc'), sha256hex('abc'));
  assert.deepEqual(hexToBytes('0b0b'), [11, 11]);
  assert.equal(hexToBytes('xyz'), null);
  assert.equal(hexToBytes('abc'), null);            // odd length
  assert.equal(hmacHex('sha256', 'zz', 'x', { keyHex: true }), null); // invalid hex key
});

check('unknown algorithm returns null', () => {
  assert.equal(hmacHex('md5', 'k', 'm'), null);
});

console.log(`\n${n} checks passed.`);
