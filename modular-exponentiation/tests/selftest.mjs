import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { modpowBig, modpow } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
// naive BigInt reference
const ref = (b, e, m) => { b = BigInt(b) % BigInt(m); let r = 1n; for (let i = 0n; i < BigInt(e); i++) r = (r * b) % BigInt(m); return r; };

check('basic vectors', () => {
  assert.equal(modpow(2, 10, 1000), 24);   // 1024 mod 1000
  assert.equal(modpow(3, 4, 5), 1);          // 81 mod 5
  assert.equal(modpow(5, 3, 13), 8);         // 125 mod 13
});

check('the classic RSA-style example 4^13 mod 497 = 445', () => {
  assert.equal(modpow(4, 13, 497), 445);
});

check('exponent 0 gives 1 (mod m>1)', () => {
  assert.equal(modpow(2, 0, 7), 1);
  assert.equal(modpow(123, 0, 1000), 1);
});

check('base 0 gives 0 for positive exponent', () => {
  assert.equal(modpow(0, 5, 7), 0);
});

check('modulus 1 always gives 0', () => {
  assert.equal(modpow(999, 999, 1), 0);
});

check('matches a naive reference on small cases', () => {
  for (let b = 0; b < 12; b++) for (let e = 0; e < 12; e++) for (const m of [7, 13, 100]) {
    assert.equal(modpowBig(b, e, m), ref(b, e, m));
  }
});

check("Fermat's little theorem: a^(p-1) mod p = 1", () => {
  const p = 13;
  for (let a = 1; a < p; a++) assert.equal(modpow(a, p - 1, p), 1);
});

check('handles very large exponents (BigInt), returns a BigInt in range', () => {
  // independent fast square-and-multiply reference
  const fast = (b, e, m) => { b = BigInt(b) % BigInt(m); e = BigInt(e); m = BigInt(m); let r = 1n; while (e > 0n) { if (e & 1n) r = (r * b) % m; e >>= 1n; b = (b * b) % m; } return r; };
  const out = modpowBig('123456789', '987654321', '1000000007');
  assert.equal(typeof out, 'bigint');
  assert.ok(out >= 0n && out < 1000000007n);
  assert.equal(out, fast('123456789', '987654321', '1000000007'));
});

check('negative base is normalized into the modulus', () => {
  assert.equal(modpow(-2, 3, 5), 2); // -8 mod 5 = 2
});

check('validation: bad modulus, negative exponent, non-integers throw', () => {
  assert.throws(() => modpow(2, 3, 0), /modulus must be positive/);
  assert.throws(() => modpow(2, -1, 5), /exponent must be non-negative/);
  assert.throws(() => modpow(2.5, 3, 5), /must be an integer/);
});

console.log(`\n${n} checks passed.`);
