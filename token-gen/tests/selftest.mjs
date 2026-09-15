// Headless regression tests for TokenGen pure functions.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');

const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)]
  .map(m => m[1]).sort((a, b) => b.length - a.length)[0];

function el(){ return {value:'32',textContent:'',innerHTML:'',style:{},className:'',
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
const { ALPHABETS, entropyBits, generateToken, strengthLabel } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const seqRng = vals => { let i = 0; return () => vals[i++ % vals.length]; };

check('entropyBits = length * log2(alphabet)', () => {
  assert.equal(entropyBits(16, 16), 64);      // 16 hex chars
  assert.equal(entropyBits(8, 2), 8);
  assert.equal(entropyBits(22, 64), 132);
  assert.equal(entropyBits(0, 16), 0);
  assert.equal(entropyBits(10, 1), 0);        // degenerate alphabet
});

check('generateToken is deterministic with injected rng', () => {
  assert.equal(generateToken(8, 'ab', () => 0), 'aaaaaaaa');
  assert.equal(generateToken(8, 'ab', () => 0.99), 'bbbbbbbb');
  assert.equal(generateToken(4, '0123456789', seqRng([0, 0.15, 0.99, 0.5])), '0195');
});

check('generateToken length and alphabet guards', () => {
  assert.equal(generateToken(0, 'abc', () => 0), '');
  assert.equal(generateToken(5, '', () => 0), '');
  assert.equal(generateToken(5, 'x', () => 0), '');   // single-char alphabet rejected
  assert.equal(generateToken(3.9, 'ab', () => 0).length, 3); // floored
});

check('generateToken clamps rng edge value 1.0', () => {
  // rng returning exactly 1 would index out of range; must clamp to last char
  assert.equal(generateToken(3, 'abc', () => 1), 'ccc');
});

check('generateToken only uses characters from the alphabet', () => {
  const out = generateToken(50, ALPHABETS.base58, seqRng([0.1, 0.3, 0.5, 0.7, 0.9]));
  for(const ch of out) assert.ok(ALPHABETS.base58.includes(ch));
});

check('base58 excludes ambiguous chars 0 O I l', () => {
  ['0','O','I','l'].forEach(c => assert.ok(!ALPHABETS.base58.includes(c)));
  assert.equal(ALPHABETS.base58.length, 58);
  assert.equal(ALPHABETS.base62.length, 62);
  assert.equal(ALPHABETS.hex.length, 16);
  assert.equal(ALPHABETS.base64url.length, 64);
});

check('strengthLabel thresholds', () => {
  assert.equal(strengthLabel(20), 'Weak');
  assert.equal(strengthLabel(64), 'Fair');
  assert.equal(strengthLabel(100), 'Strong');
  assert.equal(strengthLabel(128), 'Very strong');
  assert.equal(strengthLabel(256), 'Very strong');
});

check('realistic: 22 base62 chars ~ 131 bits, "Very strong"', () => {
  const bits = entropyBits(22, ALPHABETS.base62.length);
  assert.ok(bits > 128 && bits < 132);
  assert.equal(strengthLabel(bits), 'Very strong');
});

console.log(`\n${n} checks passed.`);
