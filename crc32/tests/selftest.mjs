// Headless regression tests for Crc32 against known vectors.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');

const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)]
  .map(m => m[1]).sort((a, b) => b.length - a.length)[0];

function el(){ return {value:'',textContent:'',innerHTML:'',style:{},className:'',
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
const { textToBytes, crc32, crc32Hex } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('canonical vector "123456789" = 0xCBF43926', () => {
  assert.equal(crc32Hex('123456789'), 'CBF43926');
  assert.equal(crc32('123456789'), 0xCBF43926);
});

check('empty string = 0', () => {
  assert.equal(crc32(''), 0);
  assert.equal(crc32Hex(''), '00000000');
});

check('known vectors', () => {
  assert.equal(crc32Hex('a'), 'E8B7BE43');
  assert.equal(crc32Hex('abc'), '352441C2');
  assert.equal(crc32Hex('The quick brown fox jumps over the lazy dog'), '414FA339');
});

check('crc32Hex is always 8 uppercase hex chars', () => {
  ['', 'x', 'hello', 'The quick brown fox'].forEach(s => {
    assert.match(crc32Hex(s), /^[0-9A-F]{8}$/);
  });
});

check('result is an unsigned 32-bit integer', () => {
  const c = crc32('The quick brown fox jumps over the lazy dog');
  assert.ok(c >= 0 && c <= 0xFFFFFFFF);
  assert.equal(c, c >>> 0);
});

check('accepts a byte array', () => {
  assert.equal(crc32([0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39]), 0xCBF43926); // "123456789"
});

check('sensitive to single-bit changes', () => {
  assert.notEqual(crc32('hello'), crc32('hellp'));
  assert.notEqual(crc32('hello'), crc32('Hello'));
});

check('utf-8 multibyte handled', () => {
  assert.equal(crc32('café'), crc32(textToBytes('café')));
});

console.log(`\n${n} checks passed.`);
