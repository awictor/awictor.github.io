import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { escapeXml, sanitizeName, jsonToXml } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('escapeXml escapes &, <, >', () => {
  assert.equal(escapeXml('a<b & c>d'), 'a&lt;b &amp; c&gt;d');
});

check('sanitizeName cleans invalid element names', () => {
  assert.equal(sanitizeName('firstName'), 'firstName');
  assert.equal(sanitizeName('first name'), 'first_name');
  assert.equal(sanitizeName('2cool'), '_2cool');   // can't start with digit
  assert.equal(sanitizeName(''), '_');
});

check('flat object', () => {
  assert.equal(jsonToXml({ name: 'Bob', age: 30 }),
    '<root>\n  <name>Bob</name>\n  <age>30</age>\n</root>');
});

check('arrays become repeated elements', () => {
  assert.equal(jsonToXml({ items: [1, 2] }),
    '<root>\n  <items>1</items>\n  <items>2</items>\n</root>');
});

check('nested objects nest with indentation', () => {
  assert.equal(jsonToXml({ a: { b: 1 } }),
    '<root>\n  <a>\n    <b>1</b>\n  </a>\n</root>');
});

check('text is XML-escaped', () => {
  assert.equal(jsonToXml({ msg: 'a<b & c' }),
    '<root>\n  <msg>a&lt;b &amp; c</msg>\n</root>');
});

check('null and empty become self-closing', () => {
  assert.equal(jsonToXml({ x: null }), '<root>\n  <x/>\n</root>');
  assert.equal(jsonToXml({}), '<root/>');
  assert.equal(jsonToXml({ arr: [] }), '<root>\n  <arr/>\n</root>');
});

check('custom root name', () => {
  assert.equal(jsonToXml({ a: 1 }, { root: 'doc' }),
    '<doc>\n  <a>1</a>\n</doc>');
});

check('indent 0 produces single-line XML', () => {
  assert.equal(jsonToXml({ a: 1, b: 2 }, { indent: 0 }),
    '<root><a>1</a><b>2</b></root>');
});

check('XML declaration option', () => {
  assert.equal(jsonToXml({ a: 1 }, { declaration: true }),
    '<?xml version="1.0" encoding="UTF-8"?>\n<root>\n  <a>1</a>\n</root>');
  // booleans and numbers stringify
  assert.equal(jsonToXml({ ok: true, n: 3.5 }),
    '<root>\n  <ok>true</ok>\n  <n>3.5</n>\n</root>');
});

console.log(`\n${n} checks passed.`);
