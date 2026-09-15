import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { typeOf, deepEqual, diffJson, summarize } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('typeOf distinguishes null / array / object', () => {
  assert.equal(typeOf(null), 'null');
  assert.equal(typeOf([]), 'array');
  assert.equal(typeOf({}), 'object');
  assert.equal(typeOf(5), 'number');
  assert.equal(typeOf('x'), 'string');
});

check('deepEqual', () => {
  assert.ok(deepEqual({ a: [1, 2], b: { c: 3 } }, { a: [1, 2], b: { c: 3 } }));
  assert.ok(!deepEqual({ a: 1 }, { a: 2 }));
  assert.ok(!deepEqual([1, 2], [1, 2, 3]));
  assert.ok(!deepEqual(1, '1'));   // type-sensitive
});

check('identical documents → no diff', () => {
  assert.deepEqual(diffJson({ a: 1, b: [1, 2] }, { a: 1, b: [1, 2] }), []);
});

check('changed primitive', () => {
  assert.deepEqual(diffJson({ a: 1 }, { a: 2 }), [{ path: 'a', type: 'changed', from: 1, to: 2 }]);
});

check('added and removed keys', () => {
  assert.deepEqual(diffJson({}, { a: 1 }), [{ path: 'a', type: 'added', to: 1 }]);
  assert.deepEqual(diffJson({ a: 1 }, {}), [{ path: 'a', type: 'removed', from: 1 }]);
});

check('nested object path', () => {
  assert.deepEqual(diffJson({ a: { b: 1 } }, { a: { b: 2 } }),
    [{ path: 'a.b', type: 'changed', from: 1, to: 2 }]);
});

check('array element by index', () => {
  assert.deepEqual(diffJson([1, 2], [1, 3]), [{ path: '[1]', type: 'changed', from: 2, to: 3 }]);
  assert.deepEqual(diffJson([1], [1, 2]), [{ path: '[1]', type: 'added', to: 2 }]);
  assert.deepEqual(diffJson([1, 2], [1]), [{ path: '[1]', type: 'removed', from: 2 }]);
});

check('type change counts as changed', () => {
  assert.deepEqual(diffJson({ a: 1 }, { a: '1' }), [{ path: 'a', type: 'changed', from: 1, to: '1' }]);
  assert.deepEqual(diffJson({ a: {} }, { a: [] }), [{ path: 'a', type: 'changed', from: {}, to: [] }]);
});

check('root-level primitive change', () => {
  assert.deepEqual(diffJson(1, 2), [{ path: '(root)', type: 'changed', from: 1, to: 2 }]);
});

check('summarize + multi-change scenario', () => {
  const diffs = diffJson(
    { name: 'W', price: 9.99, tags: ['new', 'sale'], stock: { a: 40, b: 5 } },
    { name: 'W', price: 12.5, tags: ['new', 'clearance'], stock: { a: 40 }, sku: 'X' }
  );
  const s = summarize(diffs);
  assert.equal(s.changed, 2);  // price, tags[1]
  assert.equal(s.removed, 1);  // stock.b
  assert.equal(s.added, 1);    // sku
  assert.ok(diffs.some(d => d.path === 'tags[1]' && d.type === 'changed'));
  assert.ok(diffs.some(d => d.path === 'stock.b' && d.type === 'removed'));
});

console.log(`\n${n} checks passed.`);
