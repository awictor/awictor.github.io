// Headless regression tests for JsonToCsv pure functions.
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
const { escapeField, collectHeaders, toCsv, jsonToCsv } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('escapeField quotes only when needed', () => {
  assert.equal(escapeField('plain', ','), 'plain');
  assert.equal(escapeField('a,b', ','), '"a,b"');
  assert.equal(escapeField('he said "hi"', ','), '"he said ""hi"""');
  assert.equal(escapeField('line1\nline2', ','), '"line1\nline2"');
  assert.equal(escapeField(null, ','), '');
  assert.equal(escapeField(undefined, ','), '');
  assert.equal(escapeField(42, ','), '42');
  assert.equal(escapeField(true, ','), 'true');
});

check('escapeField serializes nested objects as JSON', () => {
  assert.equal(escapeField({ y: 1 }, ','), '"{""y"":1}"');
});

check('collectHeaders is union in first-seen order', () => {
  assert.deepEqual(collectHeaders([{ a: 1, b: 2 }, { b: 3, c: 4 }]), ['a', 'b', 'c']);
  assert.deepEqual(collectHeaders([]), []);
});

check('toCsv basic', () => {
  assert.equal(toCsv([{ a: 1, b: 2 }, { a: 3, b: 4 }]), 'a,b\n1,2\n3,4');
});

check('toCsv fills missing keys with empty', () => {
  assert.equal(toCsv([{ a: 1 }, { b: 2 }]), 'a,b\n1,\n,2');
});

check('toCsv escapes fields and header (only when needed)', () => {
  assert.equal(toCsv([{ 'full name': 'Doe, John' }]), 'full name\n"Doe, John"');   // space alone isn't quoted
  assert.equal(toCsv([{ 'a,b': 'x' }]), '"a,b"\nx');                                // comma in header is
});

check('toCsv custom delimiter', () => {
  assert.equal(toCsv([{ a: 1, b: 2 }], { delimiter: ';' }), 'a;b\n1;2');
  // semicolon values force quoting only if they contain the delimiter
  assert.equal(toCsv([{ a: 'x;y' }], { delimiter: ';' }), 'a\n"x;y"');
});

check('jsonToCsv wraps single object into one row', () => {
  const r = jsonToCsv('{"a":1,"b":2}');
  assert.equal(r.error, null);
  assert.equal(r.csv, 'a,b\n1,2');
});

check('jsonToCsv reports invalid JSON', () => {
  const r = jsonToCsv('{bad');
  assert.ok(/^Invalid JSON:/.test(r.error));
  assert.equal(r.csv, '');
});

check('jsonToCsv end-to-end with escaping', () => {
  const r = jsonToCsv('[{"name":"A, B","q":"say \\"hi\\""}]');
  assert.equal(r.csv, 'name,q\n"A, B","say ""hi"""');
});

console.log(`\n${n} checks passed.`);
