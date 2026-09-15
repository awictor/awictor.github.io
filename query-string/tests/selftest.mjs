// Headless regression tests for QueryString pure functions.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');

const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)]
  .map(m => m[1]).sort((a, b) => b.length - a.length)[0];

function el(){ return {value:'',textContent:'',innerHTML:'',firstChild:{textContent:''},style:{},className:'',
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
const { parseQuery, buildQuery } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('parseQuery basic', () => {
  assert.deepEqual(parseQuery('a=1&b=2'), { a: '1', b: '2' });
  assert.deepEqual(parseQuery(''), {});
});

check('parseQuery strips leading ? or #', () => {
  assert.deepEqual(parseQuery('?a=1'), { a: '1' });
  assert.deepEqual(parseQuery('#a=1'), { a: '1' });
});

check('parseQuery decodes %xx and + as space', () => {
  assert.deepEqual(parseQuery('x=hello%20world'), { x: 'hello world' });
  assert.deepEqual(parseQuery('a+b=c+d'), { 'a b': 'c d' });
  assert.deepEqual(parseQuery('e=a%26b'), { e: 'a&b' });
});

check('parseQuery repeated keys become arrays', () => {
  assert.deepEqual(parseQuery('a=1&a=2&a=3'), { a: ['1', '2', '3'] });
});

check('parseQuery bare key = empty value', () => {
  assert.deepEqual(parseQuery('flag'), { flag: '' });
  assert.deepEqual(parseQuery('a=1&flag&b=2'), { a: '1', flag: '', b: '2' });
});

check('buildQuery basic and encoding', () => {
  assert.equal(buildQuery({ a: 1, b: 2 }), 'a=1&b=2');
  assert.equal(buildQuery({ q: 'hello world' }), 'q=hello%20world');
  assert.equal(buildQuery({ 'a b': 'c&d' }), 'a%20b=c%26d');
});

check('buildQuery arrays repeat the key', () => {
  assert.equal(buildQuery({ tags: ['x', 'y'] }), 'tags=x&tags=y');
});

check('round-trip parseQuery(buildQuery(obj))', () => {
  const obj = { q: 'a b', n: '5', tags: ['x', 'y'], sym: 'a&b=c' };
  assert.deepEqual(parseQuery(buildQuery(obj)), obj);
});

console.log(`\n${n} checks passed.`);
