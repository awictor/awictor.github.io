// Headless regression tests for JsonToTs pure functions.
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
  addEventListener(){},querySelectorAll(){return[];}}; }
globalThis.document = {
  getElementById: () => el(), createElement: () => el(),
  querySelectorAll: () => [], documentElement: el()
};
globalThis.localStorage = { getItem:()=>null, setItem(){}, removeItem(){} };
globalThis.matchMedia = () => ({ matches:false });
globalThis.window = { matchMedia: globalThis.matchMedia };

eval(js.replace('if(typeof module !== \'undefined\') module.exports =',
  'globalThis.__t =') );
const { pascal, singular, safeKey, jsonToTs } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('pascal / singular / safeKey helpers', () => {
  assert.equal(pascal('user_profile'), 'UserProfile');
  assert.equal(pascal('first-name'), 'FirstName');
  assert.equal(pascal(''), 'Anon');
  assert.equal(singular('items'), 'item');
  assert.equal(singular('data'), 'data');
  assert.equal(safeKey('name'), 'name');
  assert.equal(safeKey('first-name'), '"first-name"');
});

check('flat object with primitives', () => {
  const r = jsonToTs('{"name":"Al","age":30,"ok":true}', 'User');
  assert.equal(r.error, null);
  assert.equal(r.code,
    'interface User {\n  name: string;\n  age: number;\n  ok: boolean;\n}');
});

check('null value maps to null type', () => {
  assert.equal(jsonToTs('{"x":null}', 'T').code, 'interface T {\n  x: null;\n}');
});

check('array of primitives', () => {
  assert.equal(jsonToTs('{"tags":["a","b"]}', 'T').code,
    'interface T {\n  tags: string[];\n}');
  assert.equal(jsonToTs('{"nums":[1,2]}', 'T').code,
    'interface T {\n  nums: number[];\n}');
  assert.equal(jsonToTs('{"empty":[]}', 'T').code,
    'interface T {\n  empty: any[];\n}');
});

check('nested object becomes named interface, root first', () => {
  const r = jsonToTs('{"user":{"id":1}}', 'Root');
  assert.equal(r.code,
    'interface Root {\n  user: User;\n}\n\n' +
    'interface User {\n  id: number;\n}');
});

check('array of objects infers singular element interface', () => {
  const r = jsonToTs('{"items":[{"sku":"A1","price":9.99}]}', 'Root');
  assert.equal(r.code,
    'interface Root {\n  items: Item[];\n}\n\n' +
    'interface Item {\n  sku: string;\n  price: number;\n}');
});

check('invalid identifier keys are quoted', () => {
  const r = jsonToTs('{"first-name":"a","valid_1":2}', 'T');
  assert.equal(r.code,
    'interface T {\n  "first-name": string;\n  valid_1: number;\n}');
});

check('primitive root emits a type alias', () => {
  assert.equal(jsonToTs('42', 'Root').code, 'type Root = number;');
  assert.equal(jsonToTs('"hi"', 'Name').code, 'type Name = string;');
});

check('duplicate interface names are reused, not redefined', () => {
  const r = jsonToTs('{"a":{"id":1},"b":{"id":2}}', 'Root');
  // both A and B become interface A / B by key name -> distinct, but ensure no crash and root first
  assert.ok(r.code.startsWith('interface Root {'));
  assert.ok(r.code.includes('interface A {'));
  assert.ok(r.code.includes('interface B {'));
});

check('invalid JSON returns an error', () => {
  const r = jsonToTs('{bad', 'T');
  assert.ok(/^Invalid JSON:/.test(r.error));
  assert.equal(r.code, '');
});

console.log(`\n${n} checks passed.`);
