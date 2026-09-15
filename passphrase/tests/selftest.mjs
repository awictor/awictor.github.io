import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { entropyBits, unbiasedIndex, crackTime, buildPassphrase, WORDS } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b} (±${eps})`);

check('entropyBits = words × log2(listSize)', () => {
  near(entropyBits(7776, 6), 6 * Math.log2(7776), 1e-9); // classic diceware ≈ 77.5 bits
  near(entropyBits(1024, 4), 40, 1e-9); // log2(1024)=10, ×4
});

check('more words = more entropy', () => {
  assert.ok(entropyBits(1000, 5) > entropyBits(1000, 4));
});

check('wordlist has no duplicates (entropy claim is honest)', () => {
  assert.equal(new Set(WORDS).size, WORDS.length);
});

check('wordlist is a decent size and all lowercase word chars', () => {
  assert.ok(WORDS.length >= 500, 'list too small: ' + WORDS.length);
  for (const w of WORDS) assert.ok(/^[a-z-]+$/.test(w), 'bad word: ' + w);
});

check('unbiasedIndex stays within range', () => {
  let r = 12345;
  const rand = () => (r = (r * 1103515245 + 12345) >>> 0);
  for (let i = 0; i < 500; i++) {
    const idx = unbiasedIndex(7, rand);
    assert.ok(idx >= 0 && idx < 7 && Number.isInteger(idx));
  }
});

check('unbiasedIndex covers the whole range (roughly uniform)', () => {
  let r = 99;
  const rand = () => (r = (r * 1103515245 + 12345) >>> 0);
  const seen = new Set();
  for (let i = 0; i < 2000; i++) seen.add(unbiasedIndex(6, rand));
  assert.equal(seen.size, 6); // all of 0..5 appear
});

check('unbiasedIndex rejects out-of-limit draws (removes modulo bias)', () => {
  // max=3 -> limit = floor(2^32/3)*3 = 4294967295; value 4294967295 must be rejected
  const seq = [4294967295, 7];
  let i = 0;
  const rand = () => seq[i++];
  assert.equal(unbiasedIndex(3, rand), 7 % 3); // first draw rejected, second used
});

check('crackTime grows with entropy', () => {
  assert.equal(crackTime(1), 'instant');
  assert.ok(/centur/i.test(crackTime(90)));
});

check('buildPassphrase joins, capitalizes, appends', () => {
  assert.equal(buildPassphrase(['correct', 'horse', 'battery'], { separator: '-', capitalize: false }), 'correct-horse-battery');
  assert.equal(buildPassphrase(['fox', 'den'], { separator: '.', capitalize: true }), 'Fox.Den');
  assert.equal(buildPassphrase(['a', 'b'], { separator: '-', number: 7, numberSep: true }), 'a-b-7');
  assert.equal(buildPassphrase(['a', 'b'], { separator: '-', symbol: '!' }), 'a-b!');
});

check('validation', () => {
  assert.throws(() => entropyBits(1, 4), /at least 2/);
  assert.throws(() => entropyBits(1000, 0), /at least 1/);
  assert.throws(() => unbiasedIndex(0, () => 0), /positive/);
});

console.log(`\n${n} checks passed.`);
