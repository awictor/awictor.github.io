// Headless regression tests for SchemaGen — JSON -> JSON Schema inference.
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
const { stableStringify, inferSchema, mergeSchemas, jsonToSchema } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('inferSchema — scalars', () => {
  assert.deepEqual(inferSchema(5), { type: 'integer' });
  assert.deepEqual(inferSchema(5.5), { type: 'number' });
  assert.deepEqual(inferSchema(-3), { type: 'integer' });
  assert.deepEqual(inferSchema('hi'), { type: 'string' });
  assert.deepEqual(inferSchema(true), { type: 'boolean' });
  assert.deepEqual(inferSchema(null), { type: 'null' });
});

check('inferSchema — arrays', () => {
  assert.deepEqual(inferSchema([1, 2, 3]), { type: 'array', items: { type: 'integer' } });
  assert.deepEqual(inferSchema([]), { type: 'array', items: {} });
  assert.deepEqual(inferSchema(['a', 'b']), { type: 'array', items: { type: 'string' } });
});

check('inferSchema — array of mixed scalars -> type list', () => {
  assert.deepEqual(inferSchema([1, 'x']), { type: 'array', items: { type: ['integer', 'string'] } });
  assert.deepEqual(inferSchema([1, 2.5]), { type: 'array', items: { type: ['integer', 'number'] } });
});

check('inferSchema — object with required keys', () => {
  assert.deepEqual(inferSchema({ a: 1, b: 'x' }), {
    type: 'object',
    properties: { a: { type: 'integer' }, b: { type: 'string' } },
    required: ['a', 'b']
  });
});

check('inferSchema — nested object', () => {
  const s = inferSchema({ user: { id: 1, name: 'A' }, tags: ['x'] });
  assert.equal(s.type, 'object');
  assert.deepEqual(s.properties.user, {
    type: 'object', properties: { id: { type: 'integer' }, name: { type: 'string' } }, required: ['id', 'name']
  });
  assert.deepEqual(s.properties.tags, { type: 'array', items: { type: 'string' } });
  assert.deepEqual(s.required, ['user', 'tags']);
});

check('inferSchema — array of identical objects merges to one', () => {
  const s = inferSchema([{ a: 1 }, { a: 2 }, { a: 3 }]);
  assert.deepEqual(s, {
    type: 'array',
    items: { type: 'object', properties: { a: { type: 'integer' } }, required: ['a'] }
  });
});

check('inferSchema — array of differing shapes -> anyOf', () => {
  const s = inferSchema([{ a: 1 }, { b: 2 }]);
  assert.equal(s.type, 'array');
  assert.ok(Array.isArray(s.items.anyOf));
  assert.equal(s.items.anyOf.length, 2);
});

check('mergeSchemas — dedupe & combine', () => {
  assert.deepEqual(mergeSchemas([]), {});
  assert.deepEqual(mergeSchemas([{ type: 'integer' }]), { type: 'integer' });
  assert.deepEqual(mergeSchemas([{ type: 'integer' }, { type: 'integer' }]), { type: 'integer' });
  assert.deepEqual(mergeSchemas([{ type: 'integer' }, { type: 'string' }]), { type: ['integer', 'string'] });
  // type list is sorted for determinism
  assert.deepEqual(mergeSchemas([{ type: 'string' }, { type: 'boolean' }]), { type: ['boolean', 'string'] });
});

check('stableStringify — keys sorted, deterministic', () => {
  assert.equal(stableStringify({ b: 1, a: 2 }), '{"a":2,"b":1}');
  assert.equal(stableStringify({ a: 2, b: 1 }), '{"a":2,"b":1}');
  assert.equal(stableStringify([3, { y: 1, x: 2 }]), '[3,{"x":2,"y":1}]');
  assert.equal(stableStringify(null), 'null');
  assert.equal(stableStringify('s'), '"s"');
});

check('jsonToSchema — adds $schema, parses text', () => {
  const s = jsonToSchema('{"a":1}');
  assert.deepEqual(s, {
    '$schema': 'http://json-schema.org/draft-07/schema#',
    type: 'object',
    properties: { a: { type: 'integer' } },
    required: ['a']
  });
  assert.equal(Object.keys(s)[0], '$schema');
});

check('jsonToSchema — throws on invalid JSON', () => {
  assert.throws(() => jsonToSchema('{not json}'));
  assert.throws(() => jsonToSchema(''));
});

console.log(`\n${n} checks passed.`);
