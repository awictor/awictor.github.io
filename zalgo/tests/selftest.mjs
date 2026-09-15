import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { MARKS, zalgo, stripZalgo } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

// Deterministic RNG for reproducible tests.
function lcg(seed) { let s = seed >>> 0; return () => (s = (s * 1103515245 + 12345) >>> 0) / 4294967296; }

check('MARKS are all combining diacriticals (U+0300-U+036F)', () => {
  assert.equal(MARKS.length, 0x36F - 0x300 + 1);
  MARKS.forEach(m => { const c = m.charCodeAt(0); assert.ok(c >= 0x300 && c <= 0x36F); });
});

check('stripZalgo undoes zalgo (round-trip)', () => {
  const base = 'hello world';
  assert.equal(stripZalgo(zalgo(base, 5, lcg(1))), base);
});

check('round-trips for many inputs and intensities', () => {
  for (const [t, i] of [['ATTACK', 3], ['a b c', 10], ['glitch!', 1], ['MixedCase 123', 8]]) {
    assert.equal(stripZalgo(zalgo(t, i, lcg(42))), t);
  }
});

check('zalgo adds length when intensity > 0', () => {
  const z = zalgo('abc', 5, lcg(7));
  assert.ok(z.length > 'abc'.length);
});

check('intensity 0 leaves text unchanged', () => {
  assert.equal(zalgo('hello', 0, lcg(1)), 'hello');
});

check('marks are only added to non-whitespace characters', () => {
  // one word "a" with 4 marks -> length 5; a space stays a space
  const z = zalgo('a b', 4, lcg(3));
  assert.equal(stripZalgo(z), 'a b');
  // the space (index depends) has no marks appended: total marks = 4 per non-space char (2 chars) = 8
  const marks = z.length - 3;
  assert.equal(marks, 8);
});

check('deterministic with a seeded RNG', () => {
  assert.equal(zalgo('hello', 6, lcg(99)), zalgo('hello', 6, lcg(99)));
});

check('different seeds usually differ', () => {
  assert.notEqual(zalgo('hello', 6, lcg(1)), zalgo('hello', 6, lcg(2)));
});

check('stripZalgo leaves plain text untouched', () => {
  assert.equal(stripZalgo('normal text 123'), 'normal text 123');
});

check('validation', () => {
  assert.throws(() => zalgo(42, 5), /must be a string/);
  assert.throws(() => stripZalgo(null), /must be a string/);
});

console.log(`\n${n} checks passed.`);
