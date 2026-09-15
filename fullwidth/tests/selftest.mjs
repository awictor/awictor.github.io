import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { toFullWidth, toHalfWidth } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('uppercase, lowercase, digits and punctuation map to full-width', () => {
  assert.equal(toFullWidth('A'), 'Ａ');
  assert.equal(toFullWidth('a'), 'ａ');
  assert.equal(toFullWidth('1'), '１');
  assert.equal(toFullWidth('!'), '！');
});

check('space becomes an ideographic space', () => {
  assert.equal(toFullWidth(' '), '　');
  assert.equal(toFullWidth('a b'), 'ａ　ｂ');
});

check('toHalfWidth reverses each mapping', () => {
  assert.equal(toHalfWidth('Ａ'), 'A');
  assert.equal(toHalfWidth('　'), ' ');
});

check('round-trips over the full ASCII printable range', () => {
  let s = '';
  for (let c = 0x20; c <= 0x7E; c++) s += String.fromCharCode(c);
  assert.equal(toHalfWidth(toFullWidth(s)), s);
});

check('non-ASCII characters pass through unchanged', () => {
  assert.equal(toFullWidth('café 🎉'), 'ｃａｆé　🎉'); // é and emoji unchanged
});

check('a mixed string converts correctly', () => {
  assert.equal(toFullWidth('Hi!'), 'Ｈｉ！');
});

check('toHalfWidth leaves already-normal text unchanged', () => {
  assert.equal(toHalfWidth('hello world'), 'hello world');
});

check('length is preserved (each char maps to one char)', () => {
  const s = 'aesthetic 100%';
  assert.equal(toFullWidth(s).length, s.length);
});

check('empty string', () => {
  assert.equal(toFullWidth(''), '');
  assert.equal(toHalfWidth(''), '');
});

check('validation', () => {
  assert.throws(() => toFullWidth(42), /must be a string/);
  assert.throws(() => toHalfWidth(null), /must be a string/);
});

console.log(`\n${n} checks passed.`);
