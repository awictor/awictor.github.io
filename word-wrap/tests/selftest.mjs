// Headless regression tests for WordWrap — reflow / hard-wrap / unwrap.
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
const { wrapLine, wrapText, unwrap } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('wrapLine — greedy fill', () => {
  assert.deepEqual(wrapLine('the quick brown fox', 10), ['the quick', 'brown fox']);
  assert.deepEqual(wrapLine('one two three four', 8), ['one two', 'three', 'four']);
  assert.deepEqual(wrapLine('aaa bbb ccc', 100), ['aaa bbb ccc']); // fits on one line
});

check('wrapLine — no line exceeds width (unless a single long word)', () => {
  const lines = wrapLine('alpha beta gamma delta epsilon zeta', 12);
  lines.forEach(l => assert.ok(l.length <= 12, 'line too long: ' + l));
});

check('wrapLine — long word kept whole when breakLong=false', () => {
  assert.deepEqual(wrapLine('aaaaaaaaaa bb', 5, false), ['aaaaaaaaaa', 'bb']);
});

check('wrapLine — long word split when breakLong=true', () => {
  assert.deepEqual(wrapLine('aaaaaaaaaa', 5, true), ['aaaaa', 'aaaaa']);
  assert.deepEqual(wrapLine('abcdefg hi', 3, true), ['abc', 'def', 'g', 'hi']);
});

check('wrapLine — empty / whitespace', () => {
  assert.deepEqual(wrapLine('', 10), ['']);
  assert.deepEqual(wrapLine('   ', 10), ['']);
});

check('wrapText — reflows and joins with newlines', () => {
  assert.equal(wrapText('one two three four', 8), 'one two\nthree\nfour');
});

check('wrapText — preserves paragraph breaks, collapses internal newlines', () => {
  const input = 'alpha beta\ngamma\n\ndelta epsilon zeta';
  const out = wrapText(input, 12);
  assert.equal(out, 'alpha beta\ngamma\n\ndelta\nepsilon zeta');
});

check('unwrap — joins lines within a paragraph', () => {
  assert.equal(unwrap('a\nb\n\nc\nd'), 'a b\n\nc d');
  assert.equal(unwrap('hello\nworld'), 'hello world');
});

check('wrap then unwrap recovers the paragraph text', () => {
  const para = 'the quick brown fox jumps over the lazy dog again and again';
  const wrapped = wrapText(para, 15);
  assert.ok(wrapped.includes('\n'));       // it did wrap
  assert.equal(unwrap(wrapped), para);      // and unwraps cleanly
});

check('wrapText — width clamped to >= 1', () => {
  const out = wrapText('ab cd', 0);
  assert.equal(out, 'ab\ncd'); // each word on its own line
});

console.log(`\n${n} checks passed.`);
