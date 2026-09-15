import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { extendedGcd, modInverse } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('modular inverse vectors', () => {
  assert.equal(modInverse(3, 11), 4);   // 3*4 = 12 ≡ 1
  assert.equal(modInverse(10, 17), 12); // 10*12 = 120 ≡ 1
  assert.equal(modInverse(7, 26), 15);  // affine-cipher classic
});

check('a * inverse ≡ 1 (mod m) for many coprime pairs', () => {
  for (let m = 2; m <= 60; m++) for (let a = 1; a < m; a++) {
    if (extendedGcd(a, m).gcd === 1) {
      const inv = modInverse(a, m);
      assert.equal((a * inv) % m, 1);
      assert.ok(inv >= 0 && inv < m);
    }
  }
});

check('extended gcd satisfies Bézout: a*x + b*y = gcd', () => {
  for (const [a, b] of [[240, 46], [17, 5], [1071, 462], [12, 18]]) {
    const e = extendedGcd(a, b);
    assert.equal(a * e.x + b * e.y, e.gcd);
  }
});

check('extended gcd matches known gcd values', () => {
  assert.equal(extendedGcd(240, 46).gcd, 2);
  assert.equal(extendedGcd(1071, 462).gcd, 21);
  assert.equal(extendedGcd(17, 5).gcd, 1);
});

check('inverse of 1 is 1', () => {
  for (let m = 2; m <= 20; m++) assert.equal(modInverse(1, m), 1);
});

check('a mod m is normalized (large or unreduced a)', () => {
  assert.equal(modInverse(14, 11), modInverse(3, 11)); // 14 ≡ 3 mod 11
  assert.equal(modInverse(-8, 11), modInverse(3, 11)); // -8 ≡ 3 mod 11
});

check('inverse is unique in range', () => {
  const inv = modInverse(7, 26);
  assert.ok(inv >= 0 && inv < 26);
  assert.equal((7 * inv) % 26, 1);
});

check('no inverse when not coprime', () => {
  assert.throws(() => modInverse(2, 4), /not coprime/);
  assert.throws(() => modInverse(6, 9), /not coprime/);
});

check('prime modulus: every nonzero residue is invertible', () => {
  const p = 13;
  for (let a = 1; a < p; a++) { const inv = modInverse(a, p); assert.equal((a * inv) % p, 1); }
});

check('validation: bad modulus and non-integers throw', () => {
  assert.throws(() => modInverse(3, 0), /modulus must be positive/);
  assert.throws(() => modInverse(2.5, 11), /must be an integer/);
  assert.throws(() => extendedGcd(1.5, 2), /must be an integer/);
});

console.log(`\n${n} checks passed.`);
