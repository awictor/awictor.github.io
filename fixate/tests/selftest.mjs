// Headless regression tests for Fixate — fixation reading formatter.
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
const { escapeHtml, boldLen, splitWord, fixateHTML } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('boldLen — short words bold just the first letter', () => {
  assert.equal(boldLen(''), 0);
  assert.equal(boldLen('a'), 1);
  assert.equal(boldLen('to'), 1);
  assert.equal(boldLen('cat'), 1);
});

check('boldLen — longer words scale with fraction (round half up)', () => {
  assert.equal(boldLen('word', 0.5), 2);       // 4 * .5 = 2
  assert.equal(boldLen('there', 0.5), 3);      // 5 * .5 = 2.5 -> 3
  assert.equal(boldLen('reading', 0.5), 4);    // 7 * .5 = 3.5 -> 4
  assert.equal(boldLen('bionic', 0.5), 3);     // 6 * .5 = 3
  assert.equal(boldLen('reading', 0.3), 2);    // 7 * .3 = 2.1 -> 2
  assert.equal(boldLen('reading', 0.7), 5);    // 7 * .7 = 4.9 -> 5
});

check('boldLen — never exceeds length, always >= 1 for len>=1', () => {
  for(const w of ['a', 'ab', 'abc', 'abcd', 'abcdefghij']){
    const b = boldLen(w, 0.7);
    assert.ok(b >= 1 && b <= w.length);
  }
});

check('splitWord — splits into [bold, rest]', () => {
  assert.deepEqual(splitWord('reading', 0.5), ['read', 'ing']);
  assert.deepEqual(splitWord('to', 0.5), ['t', 'o']);
  assert.deepEqual(splitWord('a', 0.5), ['a', '']);
  assert.deepEqual(splitWord('word', 0.5), ['wo', 'rd']);
});

check('fixateHTML — wraps leading part of each word', () => {
  assert.equal(fixateHTML('hi there', 0.5), '<b>h</b>i <b>the</b>re');
  assert.equal(fixateHTML('cat', 0.5), '<b>c</b>at');
  assert.equal(fixateHTML('reading', 0.5), '<b>read</b>ing');
});

check('fixateHTML — preserves whitespace and punctuation', () => {
  assert.equal(fixateHTML('a, b.', 0.5), '<b>a</b>, <b>b</b>.');
  assert.equal(fixateHTML('one\ntwo', 0.5), '<b>o</b>ne\n<b>t</b>wo');
  assert.equal(fixateHTML('  spaced  ', 0.5), '  <b>spa</b>ced  ');
});

check('fixateHTML — escapes HTML then bolds', () => {
  assert.equal(fixateHTML('a & b', 0.5), '<b>a</b> &amp; <b>b</b>');
  assert.equal(fixateHTML('<tag>', 0.5), '&lt;<b>t</b>ag&gt;');
});

check('fixateHTML — digits are treated as word chars', () => {
  assert.equal(fixateHTML('2024', 0.5), '<b>20</b>24');
  assert.equal(fixateHTML('v2', 0.5), '<b>v</b>2');
});

check('escapeHtml basics', () => {
  assert.equal(escapeHtml('<a href="x">&'), '&lt;a href="x"&gt;&amp;');
  assert.equal(escapeHtml('plain'), 'plain');
});

check('fixateHTML — empty input', () => {
  assert.equal(fixateHTML('', 0.5), '');
  assert.equal(fixateHTML('   ', 0.5), '   ');
});

console.log(`\n${n} checks passed.`);
