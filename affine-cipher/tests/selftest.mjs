import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { gcd, coprimeAs, modInverse, checkKey, encrypt, decrypt } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('gcd and coprime list', () => {
  assert.equal(gcd(5, 26), 1);
  assert.equal(gcd(2, 26), 2);
  assert.deepEqual(coprimeAs(), [1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25]);
});

check('modular inverse mod 26', () => {
  assert.equal(modInverse(5, 26), 21);   // 5·21 = 105 ≡ 1
  assert.equal(modInverse(7, 26), 15);   // 7·15 = 105 ≡ 1
  assert.equal(modInverse(1, 26), 1);
});

check('canonical Wikipedia vector (a=5, b=8)', () => {
  assert.equal(encrypt('AFFINE CIPHER', 5, 8), 'IHHWVC SWFRCP');
});

check('decrypt inverts the canonical vector', () => {
  assert.equal(decrypt('IHHWVC SWFRCP', 5, 8), 'AFFINE CIPHER');
});

check('a=1 reduces to a Caesar shift of b', () => {
  assert.equal(encrypt('ABC', 1, 3), 'DEF');
  assert.equal(encrypt('XYZ', 1, 3), 'ABC');   // wraps
});

check('case is preserved', () => {
  assert.equal(encrypt('aBc', 5, 8), 'iNs');   // a=0→I, B=1→N, c=2→S
  assert.equal(decrypt(encrypt('Hello', 7, 4), 7, 4), 'Hello');
});

check('non-letters pass through unchanged', () => {
  assert.equal(encrypt('A! 1?', 5, 8), 'I! 1?');
});

check('round-trip across all valid keys', () => {
  const msg = 'The Quick Brown Fox 123!';
  for (const a of coprimeAs()) {
    for (const b of [0, 8, 25]) {
      assert.equal(decrypt(encrypt(msg, a, b), a, b), msg);
    }
  }
});

check('non-coprime key throws', () => {
  assert.throws(() => encrypt('hi', 2, 3), /coprime/);
  assert.throws(() => encrypt('hi', 13, 3), /coprime/);
  assert.throws(() => checkKey(4), /coprime/);
});

check('b defaults to 0 and wraps modulo 26', () => {
  assert.equal(encrypt('A', 3, 0), 'A');       // 3·0 = 0 → A
  assert.equal(encrypt('B', 25, 0), 'Z');      // B=1, 25·1 = 25 → Z
});

console.log(`\n${n} checks passed.`);
