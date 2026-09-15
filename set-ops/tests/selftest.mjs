// Headless regression tests for SetOps — list set operations.
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
const { parseLines, uniq, union, intersection, difference, symmetricDifference, compute } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('parseLines — trims, drops blanks', () => {
  assert.deepEqual(parseLines('a\n  b  \n\n c'), ['a', 'b', 'c']);
  assert.deepEqual(parseLines(''), []);
});

check('uniq — first-seen order', () => {
  assert.deepEqual(uniq(['b', 'a', 'b', 'c', 'a']), ['b', 'a', 'c']);
});

check('union', () => {
  assert.deepEqual(union(['a', 'b'], ['b', 'c']), ['a', 'b', 'c']);
  assert.deepEqual(union(['a', 'a'], ['a']), ['a']);
});

check('intersection — order follows A', () => {
  assert.deepEqual(intersection(['a', 'b', 'c'], ['c', 'b', 'd']), ['b', 'c']);
  assert.deepEqual(intersection(['x'], ['y']), []);
});

check('difference (A - B)', () => {
  assert.deepEqual(difference(['a', 'b', 'c'], ['b']), ['a', 'c']);
  assert.deepEqual(difference(['a', 'b'], ['a', 'b']), []);
});

check('symmetricDifference', () => {
  assert.deepEqual(symmetricDifference(['a', 'b'], ['b', 'c']), ['a', 'c']);
});

check('case-insensitive mode', () => {
  assert.deepEqual(intersection(['Apple', 'BANANA'], ['apple', 'cherry'], true), ['Apple']);
  assert.deepEqual(difference(['Apple', 'Banana'], ['APPLE'], true), ['Banana']);
  assert.deepEqual(union(['A'], ['a'], true), ['A']);          // first-seen wins
  assert.deepEqual(union(['A'], ['a'], false), ['A', 'a']);    // case-sensitive keeps both
});

check('compute dispatches all ops', () => {
  const a = ['a', 'b', 'c'], b = ['b', 'c', 'd'];
  assert.deepEqual(compute('union', a, b), ['a', 'b', 'c', 'd']);
  assert.deepEqual(compute('intersection', a, b), ['b', 'c']);
  assert.deepEqual(compute('a_minus_b', a, b), ['a']);
  assert.deepEqual(compute('b_minus_a', a, b), ['d']);
  assert.deepEqual(compute('symmetric', a, b), ['a', 'd']);
});

check('handles __proto__ safely as a value', () => {
  assert.deepEqual(intersection(['__proto__', 'x'], ['__proto__']), ['__proto__']);
  assert.deepEqual(difference(['__proto__', 'x'], ['__proto__']), ['x']);
});

check('end-to-end via parseLines', () => {
  const a = parseLines('apple\nbanana\ncherry');
  const b = parseLines('banana\ndate');
  assert.deepEqual(compute('intersection', a, b), ['banana']);
});

console.log(`\n${n} checks passed.`);
