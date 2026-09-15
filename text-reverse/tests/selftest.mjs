// Headless regression tests for TextReverse pure functions.
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
  addEventListener(){},querySelectorAll(){return[];},closest(){return null;}}; }
globalThis.document = {
  getElementById: () => el(), createElement: () => el(),
  querySelectorAll: () => [], documentElement: el()
};
globalThis.localStorage = { getItem:()=>null, setItem(){}, removeItem(){} };
globalThis.matchMedia = () => ({ matches:false });
globalThis.window = { matchMedia: globalThis.matchMedia };

eval(js.replace('if(typeof module !== \'undefined\') module.exports =',
  'globalThis.__t =') );
const { reverseChars, reverseWords, reverseLines, upsideDown, transform } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('reverseChars', () => {
  assert.equal(reverseChars('abc'), 'cba');
  assert.equal(reverseChars('Hello'), 'olleH');
  assert.equal(reverseChars(''), '');
});

check('reverseChars is emoji-safe (codepoint aware)', () => {
  assert.equal(reverseChars('a🎉b'), 'b🎉a');
  assert.equal(reverseChars('🇦🇧'), reverseChars('🇦🇧')); // no crash
});

check('reverseChars is its own inverse', () => {
  const s = 'The quick brown fox 🦊';
  assert.equal(reverseChars(reverseChars(s)), s);
});

check('reverseWords', () => {
  assert.equal(reverseWords('the quick brown'), 'brown quick the');
  assert.equal(reverseWords('  hello   world  '), 'world hello');
  assert.equal(reverseWords('one'), 'one');
  assert.equal(reverseWords('   '), '');
});

check('reverseLines', () => {
  assert.equal(reverseLines('a\nb\nc'), 'c\nb\na');
  assert.equal(reverseLines('single'), 'single');
});

check('upsideDown flips and reverses letters', () => {
  assert.equal(upsideDown('abc'), 'ɔqɐ');
  assert.equal(upsideDown('hello'), 'ollǝɥ');
});

check('upsideDown is (roughly) its own inverse for mapped letters', () => {
  // applying twice returns the original for symmetric pairs like n/u, b/q, p/d
  assert.equal(upsideDown(upsideDown('nub')), 'nub');
});

check('transform dispatches on mode', () => {
  assert.equal(transform('abc', 'chars'), 'cba');
  assert.equal(transform('a b c', 'words'), 'c b a');
  assert.equal(transform('a\nb', 'lines'), 'b\na');
  assert.equal(transform('abc', 'upside'), 'ɔqɐ');
});

console.log(`\n${n} checks passed.`);
