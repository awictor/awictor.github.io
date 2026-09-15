// Headless regression tests for JsonToYaml — JSON -> block-style YAML.
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
const { needsQuote, scalarToYAML, keyToYAML, toYAML, jsonToYAML } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('scalarToYAML — primitives', () => {
  assert.equal(scalarToYAML(null), 'null');
  assert.equal(scalarToYAML(true), 'true');
  assert.equal(scalarToYAML(false), 'false');
  assert.equal(scalarToYAML(42), '42');
  assert.equal(scalarToYAML(3.14), '3.14');
  assert.equal(scalarToYAML('hello'), 'hello');
  assert.equal(scalarToYAML('hello world'), 'hello world'); // internal space is fine
});

check('needsQuote — special / ambiguous strings', () => {
  assert.equal(needsQuote('plain'), false);
  assert.equal(needsQuote(''), true);
  assert.equal(needsQuote('has: colon'), true);
  assert.equal(needsQuote('# comment'), true);
  assert.equal(needsQuote('true'), true);
  assert.equal(needsQuote('null'), true);
  assert.equal(needsQuote('007'), true);   // number-like preserved as string
  assert.equal(needsQuote('1e5'), true);
  assert.equal(needsQuote('-dash'), true); // indicator start
  assert.equal(needsQuote(' pad '), true);
});

check('scalarToYAML — quotes ambiguous strings via JSON', () => {
  assert.equal(scalarToYAML('true'), '"true"');
  assert.equal(scalarToYAML('123'), '"123"');
  assert.equal(scalarToYAML('a: b'), '"a: b"');
  assert.equal(scalarToYAML('line\nbreak'), '"line\\nbreak"');
});

check('toYAML — flat object', () => {
  assert.equal(toYAML({ name: 'Alex', age: 30, admin: true }),
    'name: Alex\nage: 30\nadmin: true');
});

check('toYAML — nested object', () => {
  assert.equal(toYAML({ a: { b: { c: 1 } } }), 'a:\n  b:\n    c: 1');
});

check('toYAML — scalar array under a key', () => {
  assert.equal(toYAML({ tags: ['x', 'y', 'z'] }), 'tags:\n  - x\n  - y\n  - z');
});

check('toYAML — top-level array', () => {
  assert.equal(toYAML([1, 2, 3]), '- 1\n- 2\n- 3');
});

check('toYAML — array of objects', () => {
  assert.equal(toYAML({ users: [{ id: 1 }, { id: 2 }] }),
    'users:\n  - id: 1\n  - id: 2');
  assert.equal(toYAML([{ id: 1, name: 'a' }]),
    '- id: 1\n  name: a');
});

check('toYAML — empty containers', () => {
  assert.equal(toYAML({ a: {}, b: [] }), 'a: {}\nb: []');
  assert.equal(toYAML({ list: [{}, []] }), 'list:\n  - {}\n  - []');
});

check('toYAML — quoting inside structures', () => {
  assert.equal(toYAML({ note: 'value: with colon' }), 'note: "value: with colon"');
  assert.equal(toYAML({ port: '8080' }), 'port: "8080"'); // string, stays quoted
  assert.equal(toYAML({ port: 8080 }), 'port: 8080');      // number, unquoted
});

check('jsonToYAML — parses text and round-trips a realistic doc', () => {
  const y = jsonToYAML('{"name":"my-app","private":true,"scripts":{"build":"tsc"},"keywords":["cli","yaml"]}');
  assert.equal(y, 'name: my-app\nprivate: true\nscripts:\n  build: tsc\nkeywords:\n  - cli\n  - yaml');
  assert.throws(() => jsonToYAML('{bad}'));
});

check('keyToYAML — quotes keys needing it', () => {
  assert.equal(keyToYAML('normal'), 'normal');
  assert.equal(keyToYAML('has space'), 'has space'); // spaces ok in plain keys
  assert.equal(keyToYAML('a:b'), '"a:b"');
  assert.equal(keyToYAML('true'), '"true"');
});

console.log(`\n${n} checks passed.`);
