// Headless regression tests for Base32 against RFC 4648 vectors.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');

const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)]
  .map(m => m[1]).sort((a, b) => b.length - a.length)[0];

function el(){ return {value:'',textContent:'',innerHTML:'',firstChild:{textContent:''},style:{},className:'',
  appendChild(){},getAttribute(){return null;},setAttribute(){},removeAttribute(){},
  addEventListener(){},querySelectorAll(){return[];},closest(){return null;}}; }
globalThis.document = {
  getElementById: () => el(), createElement: () => el(),
  querySelectorAll: () => [], documentElement: el()
};
globalThis.localStorage = { getItem:()=>null, setItem(){}, removeItem(){} };
globalThis.matchMedia = () => ({ matches:false });
globalThis.window = { matchMedia: globalThis.matchMedia };

eval(js.replace('if(typeof module !== \'undefined\') module.exports =',
  'globalThis.__t =') );
const { base32Decode, encodeText, decodeText } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('RFC 4648 encode vectors', () => {
  assert.equal(encodeText(''), '');
  assert.equal(encodeText('f'), 'MY======');
  assert.equal(encodeText('fo'), 'MZXQ====');
  assert.equal(encodeText('foo'), 'MZXW6===');
  assert.equal(encodeText('foob'), 'MZXW6YQ=');
  assert.equal(encodeText('fooba'), 'MZXW6YTB');
  assert.equal(encodeText('foobar'), 'MZXW6YTBOI======');
});

check('RFC 4648 decode vectors', () => {
  assert.equal(decodeText('MY======'), 'f');
  assert.equal(decodeText('MZXW6==='), 'foo');
  assert.equal(decodeText('MZXW6YTBOI======'), 'foobar');
  assert.equal(decodeText(''), '');
});

check('decode is case-insensitive and ignores whitespace', () => {
  assert.equal(decodeText('mzxw6ytboi======'), 'foobar');
  assert.equal(decodeText('MZXW6YTB OI======'), 'foobar');
});

check('round-trip arbitrary text (incl. unicode)', () => {
  ['Hello, World!', 'The quick brown fox', 'café ☕ 日本'].forEach(s => {
    assert.equal(decodeText(encodeText(s)), s);
  });
});

check('output length is always a multiple of 8', () => {
  ['a','ab','abc','abcd','abcde','abcdef'].forEach(s => {
    assert.equal(encodeText(s).length % 8, 0);
  });
});

check('invalid characters return null', () => {
  assert.equal(base32Decode('0189'), null);   // 0,1,8,9 not in alphabet
  assert.equal(base32Decode('!!!'), null);
  assert.equal(decodeText('MZXW6YT@'), null);
});

check('padding is stripped correctly on decode', () => {
  assert.equal(decodeText('MZXW6YQ='), 'foob');
  assert.equal(decodeText('MZXW6YQ'), 'foob');   // missing padding still decodes
});

check('known TOTP-style secret decodes to bytes', () => {
  // "JBSWY3DP" is base32 of "Hello"
  assert.equal(decodeText('JBSWY3DP'), 'Hello');
});

console.log(`\n${n} checks passed.`);
