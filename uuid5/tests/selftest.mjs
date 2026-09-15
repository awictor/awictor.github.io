// Headless regression tests for Uuid5 (vs documented v5 vectors).
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');

const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)]
  .map(m => m[1]).sort((a, b) => b.length - a.length)[0];

function el(){ return {value:'',textContent:'',innerHTML:'',style:{},className:'',readOnly:false,
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
const { sha1Bytes, textToBytes, parseUuid, bytesToUuid, NAMESPACES, uuidV5 } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const hex = b => b.map(x => ('0'+x.toString(16)).slice(-2)).join('');

check('SHA-1 sanity vector', () => {
  assert.equal(hex(sha1Bytes(textToBytes('abc'))), 'a9993e364706816aba3e25717850c26c9cd0d89d');
});

check('parseUuid / bytesToUuid round-trip', () => {
  const u = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
  assert.equal(bytesToUuid(parseUuid(u)), u);
  assert.equal(parseUuid('nope'), null);
  assert.equal(parseUuid('6ba7b8109dad11d180b400c04fd430c8').length, 16);
});

check('UUID v5 matches documented python.org DNS vector', () => {
  assert.equal(uuidV5('python.org', NAMESPACES.dns), '886313e1-3b8a-5372-9b90-0c9aee199e5d');
});

check('UUID v5 is deterministic', () => {
  assert.equal(uuidV5('example.com', NAMESPACES.dns), uuidV5('example.com', NAMESPACES.dns));
});

check('version nibble is 5 and variant is RFC 4122', () => {
  const u = uuidV5('anything', NAMESPACES.url);
  assert.equal(u.charAt(14), '5');                 // version
  assert.ok('89ab'.includes(u.charAt(19)));         // variant 10xx
});

check('different names / namespaces give different UUIDs', () => {
  assert.notEqual(uuidV5('a', NAMESPACES.dns), uuidV5('b', NAMESPACES.dns));
  assert.notEqual(uuidV5('a', NAMESPACES.dns), uuidV5('a', NAMESPACES.url));
});

check('accepts a custom namespace UUID', () => {
  const custom = '00000000-0000-0000-0000-000000000000';
  const u = uuidV5('x', custom);
  assert.ok(/^[0-9a-f]{8}-[0-9a-f]{4}-5[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(u));
});

check('invalid namespace returns null', () => {
  assert.equal(uuidV5('x', 'not-a-uuid'), null);
});

console.log(`\n${n} checks passed.`);
