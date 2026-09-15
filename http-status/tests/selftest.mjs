// Headless regression tests for HttpStatus — status code lookup & search.
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
const { STATUS, categoryOf, lookup, allCodes, search } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('categoryOf by class', () => {
  assert.equal(categoryOf(100), 'Informational');
  assert.equal(categoryOf(204), 'Success');
  assert.equal(categoryOf(301), 'Redirection');
  assert.equal(categoryOf(404), 'Client Error');
  assert.equal(categoryOf(503), 'Server Error');
  assert.equal(categoryOf(700), 'Unknown');
});

check('lookup known codes', () => {
  assert.equal(lookup(200).message, 'OK');
  assert.equal(lookup(404).message, 'Not Found');
  assert.equal(lookup(500).message, 'Internal Server Error');
  assert.equal(lookup(418).message, "I'm a teapot");
  assert.equal(lookup(301).category, 'Redirection');
  assert.equal(lookup(200).class, 2);
});

check('lookup unknown -> null', () => {
  assert.equal(lookup(999), null);
  assert.equal(lookup(200.5), null);
  assert.equal(lookup('abc'), null);
});

check('allCodes sorted, includes staples', () => {
  const codes = allCodes();
  assert.ok(codes.includes(200) && codes.includes(404) && codes.includes(418) && codes.includes(511));
  for(let i = 1; i < codes.length; i++) assert.ok(codes[i] > codes[i - 1]);
});

check('search — empty returns everything', () => {
  assert.equal(search('').length, allCodes().length);
});

check('search — by numeric prefix', () => {
  const r = search('40').map(x => x.code);
  assert.ok(r.includes(400) && r.includes(404) && r.includes(409));
  assert.ok(!r.includes(500));
  assert.ok(r.every(c => String(c).startsWith('40')));
});

check('search — by phrase substring', () => {
  assert.deepEqual(search('not found').map(x => x.code), [404]);
  assert.deepEqual(search('teapot').map(x => x.code), [418]);
  assert.ok(search('gateway').map(x => x.code).includes(502));
});

check('search — by category name', () => {
  const r = search('server error').map(x => x.code);
  assert.ok(r.includes(500) && r.includes(503));
  assert.ok(r.every(c => c >= 500 && c < 600));
});

check('search — no match', () => {
  assert.deepEqual(search('zzzzz'), []);
});

console.log(`\n${n} checks passed.`);
