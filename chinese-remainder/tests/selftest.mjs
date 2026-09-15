import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { egcd, modInverse, crt } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check("Sunzi's classic problem: x ≡ 2,3,2 (mod 3,5,7) = 23", () => {
  assert.deepEqual(crt([2, 3, 2], [3, 5, 7]), { x: 23, modulus: 105 });
});

check('two coprime congruences', () => {
  assert.deepEqual(crt([1, 2], [2, 3]), { x: 5, modulus: 6 });
});

check('a single congruence returns a mod n (normalized)', () => {
  assert.deepEqual(crt([2], [5]), { x: 2, modulus: 5 });
  assert.deepEqual(crt([7], [5]), { x: 2, modulus: 5 });
  assert.deepEqual(crt([-1], [5]), { x: 4, modulus: 5 });
});

check('the solution actually satisfies every congruence', () => {
  const { x } = crt([2, 3, 2], [3, 5, 7]);
  for (const [a, m] of [[2, 3], [3, 5], [2, 7]]) assert.equal(((x % m) + m) % m, ((a % m) + m) % m);
});

check('non-coprime but consistent moduli combine correctly', () => {
  assert.deepEqual(crt([2, 4], [6, 8]), { x: 20, modulus: 24 });
});

check('inconsistent congruences throw', () => {
  assert.throws(() => crt([1, 2], [2, 4]), /inconsistent/); // odd vs even
  assert.throws(() => crt([0, 1], [4, 6]), /inconsistent/);
});

check('extended GCD satisfies a*x + b*y = g', () => {
  for (const [a, b] of [[240, 46], [17, 5], [12, 8], [35, 15]]) {
    const [g, x, y] = egcd(a, b);
    assert.equal(a * x + b * y, g);
  }
});

check('modular inverse', () => {
  assert.equal(modInverse(3, 11), 4);   // 3*4 = 12 ≡ 1
  assert.equal(modInverse(7, 26), 15);  // 7*15 = 105 ≡ 1
  assert.equal((3 * modInverse(3, 11)) % 11, 1);
});

check('modular inverse throws when not coprime', () => {
  assert.throws(() => modInverse(6, 9), /not coprime/);
  assert.throws(() => modInverse(4, 8), /not coprime/);
});

check('validation: mismatched lengths, empty, bad moduli throw', () => {
  assert.throws(() => crt([1, 2], [3]), /equal-length/);
  assert.throws(() => crt([], []), /non-empty/);
  assert.throws(() => crt([1], [0]), /positive integers/);
  assert.throws(() => crt([1.5], [3]), /integers/);
});

console.log(`\n${n} checks passed.`);
