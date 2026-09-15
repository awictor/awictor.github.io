// Headless regression tests for Specificity — CSS selector specificity scoring.
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
  classList:{add(){},remove(){}},
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
const { specificity, format, compare, compareSpec, maxSpec, splitTopLevel } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const spec = s => format(specificity(s));

check('W3C canonical examples', () => {
  assert.equal(spec('*'), '0,0,0');
  assert.equal(spec('li'), '0,0,1');
  assert.equal(spec('ul li'), '0,0,2');
  assert.equal(spec('ul ol+li'), '0,0,3');
  assert.equal(spec('h1 + *[rel=up]'), '0,1,1');
  assert.equal(spec('ul ol li.red'), '0,1,3');
  assert.equal(spec('li.red.level'), '0,2,1');
  assert.equal(spec('#x34y'), '1,0,0');
  assert.equal(spec('#s12:not(foo)'), '1,0,1');
});

check('IDs count in the first slot', () => {
  assert.equal(spec('#a'), '1,0,0');
  assert.equal(spec('#a #b'), '2,0,0');
  assert.equal(spec('#a.b #c'), '2,1,0');
});

check('classes, attributes, pseudo-classes share the second slot', () => {
  assert.equal(spec('.btn'), '0,1,0');
  assert.equal(spec('[type=text]'), '0,1,0');
  assert.equal(spec('[data-x]'), '0,1,0');
  assert.equal(spec('a:hover'), '0,1,1');
  assert.equal(spec('input:focus:required'), '0,2,1');
  assert.equal(spec('.a.b.c'), '0,3,0');
});

check('elements and pseudo-elements share the third slot', () => {
  assert.equal(spec('div'), '0,0,1');
  assert.equal(spec('div p span'), '0,0,3');
  assert.equal(spec('::before'), '0,0,1');
  assert.equal(spec('p::before'), '0,0,2');
  assert.equal(spec('a:before'), '0,0,2');     // legacy single-colon pseudo-element
  assert.equal(spec('li:first-line'), '0,0,2');
});

check(':where() contributes zero', () => {
  assert.equal(spec(':where(#foo)'), '0,0,0');
  assert.equal(spec('.a:where(#big .deep)'), '0,1,0');
});

check(':is()/:not()/:has() take their most specific argument', () => {
  assert.equal(spec(':is(.bar, #baz)'), '1,0,0');
  assert.equal(spec('.foo :is(.bar, #baz)'), '1,1,0');
  assert.equal(spec(':not(.a.b.c)'), '0,3,0');
  assert.equal(spec('a:has(> img)'), '0,0,2');   // a=c1, :has(img)=c1
});

check('nested functional pseudo-classes resolve recursively', () => {
  assert.equal(spec(':is(:is(#x))'), '1,0,0');
  assert.equal(spec(':not(:where(#x))'), '0,0,0'); // :not arg is :where => 0
});

check('format + compare + compareSpec', () => {
  assert.equal(format({ a:1, b:2, c:3 }), '1,2,3');
  assert.equal(compare('#id', '.a.b.c.d.e'), 1);   // one ID beats five classes
  assert.equal(compare('.btn', 'a:hover'), -1);     // 0,1,0 vs 0,1,1 -> b ties, c breaks it
  assert.equal(compare('a:hover', '.btn'), 1);
  assert.equal(compare('div', 'span'), 0);
  assert.equal(compareSpec({a:0,b:0,c:1},{a:0,b:1,c:0}), -1);
});

check('maxSpec / splitTopLevel helpers', () => {
  assert.deepEqual(maxSpec([{a:0,b:1,c:0},{a:1,b:0,c:0}]), {a:1,b:0,c:0});
  assert.deepEqual(splitTopLevel('a, b, c', ',').map(s=>s.trim()), ['a','b','c']);
  // commas inside parens are NOT split
  assert.equal(splitTopLevel(':is(a, b), .c', ',').length, 2);
});

check('whitespace and combinators do not add specificity', () => {
  assert.equal(spec('  div   >   p  '), '0,0,2');
  assert.equal(spec('a ~ b + c > d'), '0,0,4');
});

console.log(`\n${n} checks passed.`);
