// Headless regression tests for JsonPath — path tokenizing & querying.
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
const { tokenizePath, query, queryJson, typeOf } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

const DOC = { user: { name: 'Alex', addresses: [{ city: 'Seattle' }, { city: 'Austin' }] }, tags: ['a', 'b', 'c'], 'odd key': 42 };

check('tokenizePath — dots and brackets', () => {
  assert.deepEqual(tokenizePath('a.b.c'), ['a', 'b', 'c']);
  assert.deepEqual(tokenizePath('users[0].name'), ['users', 0, 'name']);
  assert.deepEqual(tokenizePath('a[10]'), ['a', 10]);
  assert.deepEqual(tokenizePath('[2]'), [2]);
});

check('tokenizePath — quoted keys and leading $', () => {
  assert.deepEqual(tokenizePath('$.a["b c"]'), ['a', 'b c']);
  assert.deepEqual(tokenizePath("a['x']"), ['a', 'x']);
  assert.deepEqual(tokenizePath('$'), []);
  assert.deepEqual(tokenizePath(''), []);
});

check('tokenizePath — rejects malformed', () => {
  assert.throws(() => tokenizePath('a..b'));
  assert.throws(() => tokenizePath('a.'));
  assert.throws(() => tokenizePath('a[b]'));   // unquoted non-numeric bracket
  assert.throws(() => tokenizePath('a[0'));
});

check('query — object + array navigation', () => {
  assert.equal(query(DOC, 'user.name'), 'Alex');
  assert.equal(query(DOC, 'user.addresses[0].city'), 'Seattle');
  assert.equal(query(DOC, 'user.addresses[1].city'), 'Austin');
  assert.equal(query(DOC, 'tags[2]'), 'c');
});

check('query — quoted key with space', () => {
  assert.equal(query(DOC, '["odd key"]'), 42);
});

check('query — empty path returns whole doc', () => {
  assert.equal(query(DOC, ''), DOC);
  assert.equal(query(DOC, '$'), DOC);
});

check('query — missing path -> undefined', () => {
  assert.equal(query(DOC, 'user.nope'), undefined);
  assert.equal(query(DOC, 'user.addresses[9]'), undefined);
  assert.equal(query(DOC, 'a.b.c'), undefined);
});

check('query — type mismatches -> undefined', () => {
  assert.equal(query(DOC, 'user[0]'), undefined);      // index into object
  assert.equal(query(DOC, 'tags.name'), undefined);    // key into array
  assert.equal(query({ a: 5 }, 'a.b'), undefined);     // key into number
});

check('queryJson — parses then queries', () => {
  assert.equal(queryJson('{"a":{"b":[10,20]}}', 'a.b[1]'), 20);
  assert.throws(() => queryJson('{bad}', 'a'));
});

check('typeOf', () => {
  assert.equal(typeOf(null), 'null');
  assert.equal(typeOf([1, 2]), 'array[2]');
  assert.equal(typeOf('x'), 'string');
  assert.equal(typeOf(3), 'number');
  assert.equal(typeOf({}), 'object');
});

console.log(`\n${n} checks passed.`);
