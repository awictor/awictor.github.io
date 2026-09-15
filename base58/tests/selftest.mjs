// Headless regression tests for Base58 (Bitcoin alphabet).
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
const { ALPHABET, base58Encode, base58Decode, encodeText, decodeText } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('Bitcoin alphabet excludes 0 O I l and is 58 chars', () => {
  assert.equal(ALPHABET.length, 58);
  ['0','O','I','l'].forEach(c => assert.ok(!ALPHABET.includes(c)));
});

check('classic vector: "Hello World!" -> 2NEpo7TZRRrLZSi2U', () => {
  assert.equal(encodeText('Hello World!'), '2NEpo7TZRRrLZSi2U');
  assert.equal(decodeText('2NEpo7TZRRrLZSi2U'), 'Hello World!');
});

check('empty input', () => {
  assert.equal(base58Encode([]), '');
  assert.deepEqual(base58Decode(''), []);
});

check('leading zero bytes map to leading 1s', () => {
  assert.equal(base58Encode([0]), '1');
  assert.equal(base58Encode([0, 0]), '11');
  assert.equal(base58Encode([0, 0, 1]), '112');
  assert.deepEqual(base58Decode('112'), [0, 0, 1]);
});

check('single byte values', () => {
  assert.equal(base58Encode([57]), 'z');   // index 57 = last char
  assert.equal(base58Encode([0]), '1');     // index 0 = first char
  assert.equal(base58Encode([58]), '21');   // 58 = 1*58+0 -> "21"
});

check('round-trip arbitrary bytes', () => {
  const samples = [[1,2,3,4,5], [255,254,253], [0,255,0,255], [66,105,116,99,111,105,110]];
  samples.forEach(b => assert.deepEqual(base58Decode(base58Encode(b)), b));
});

check('round-trip text incl unicode', () => {
  ['abc', 'The quick brown fox', 'café ☕'].forEach(s => {
    assert.equal(decodeText(encodeText(s)), s);
  });
});

check('invalid characters return null', () => {
  assert.equal(base58Decode('0OIl'), null);   // all forbidden
  assert.equal(base58Decode('abc0'), null);
  assert.equal(decodeText('not valid!'), null);
});

console.log(`\n${n} checks passed.`);
