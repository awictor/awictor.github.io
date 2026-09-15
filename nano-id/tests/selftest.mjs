// Headless regression tests for NanoId — unbiased random ID generation.
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
  classList:{add(){},remove(){},toggle(){}},
  addEventListener(){},querySelectorAll(){return[];},querySelector(){return null;},closest(){return null;}}; }
globalThis.document = {
  getElementById: () => el(), createElement: () => el(), querySelector: () => el(),
  querySelectorAll: () => [], documentElement: el()
};
globalThis.localStorage = { getItem:()=>null, setItem(){}, removeItem(){} };
globalThis.matchMedia = () => ({ matches:false });
globalThis.window = { matchMedia: globalThis.matchMedia };

eval(js.replace('if(typeof module !== \'undefined\') module.exports =',
  'globalThis.__t =') );
const { DEFAULT_ALPHABET, defaultRand, computeMask, nanoid, entropyBits } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('DEFAULT_ALPHABET is 64 URL-safe chars', () => {
  assert.equal(DEFAULT_ALPHABET.length, 64);
  assert.ok(/^[A-Za-z0-9_-]+$/.test(DEFAULT_ALPHABET));
});

check('computeMask', () => {
  assert.equal(computeMask(64), 63);   // power of two -> full mask
  assert.equal(computeMask(16), 15);
  assert.equal(computeMask(10), 15);   // (2<<3)-1
  assert.equal(computeMask(62), 63);
});

check('nanoid — deterministic with a fixed RNG (64-char alphabet, mask 63)', () => {
  const rng = () => [0, 1, 2, 3, 4, 5, 6, 7];
  assert.equal(nanoid(5, DEFAULT_ALPHABET, rng), 'ABCDE');
  assert.equal(nanoid(8, DEFAULT_ALPHABET, rng), 'ABCDEFGH');
});

check('nanoid — rejection sampling skips out-of-range bytes', () => {
  // alphabet len 10, mask 15; bytes >=10 are rejected
  const rng = () => [10, 0, 15, 1, 2];
  assert.equal(nanoid(2, '0123456789', rng), '01'); // 10 and 15 skipped
});

check('nanoid — correct length and alphabet membership (crypto RNG)', () => {
  const id = nanoid(21);
  assert.equal(id.length, 21);
  assert.ok([...id].every(c => DEFAULT_ALPHABET.includes(c)));
});

check('nanoid — custom alphabet', () => {
  const id = nanoid(30, '01');
  assert.equal(id.length, 30);
  assert.ok(/^[01]+$/.test(id));
});

check('nanoid — refills pool when exhausted', () => {
  let calls = 0;
  const rng = (n) => { calls++; return new Array(n).fill(0); }; // always 0 -> alphabet[0]
  assert.equal(nanoid(3, 'XY', rng), 'XXX');
  assert.ok(calls >= 1);
});

check('nanoid — degenerate inputs', () => {
  assert.equal(nanoid(0), '');
  assert.equal(nanoid(5, 'A'), ''); // alphabet < 2
});

check('entropyBits', () => {
  assert.equal(entropyBits(21, 64), 126);  // 21 * 6
  assert.equal(entropyBits(10, 16), 40);   // 10 * 4
  assert.ok(Math.abs(entropyBits(1, 10) - Math.log2(10)) < 1e-9);
});

check('two crypto IDs are (essentially always) different', () => {
  assert.notEqual(nanoid(21), nanoid(21));
});

console.log(`\n${n} checks passed.`);
