import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { flatten, unflatten } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('flatten nests objects into dot paths', () => {
  assert.deepEqual(flatten({ a: { b: 1, c: 2 } }), { 'a.b': 1, 'a.c': 2 });
});

check('flatten turns arrays into indexed keys', () => {
  assert.deepEqual(flatten({ x: [10, 20] }), { 'x.0': 10, 'x.1': 20 });
});

check('flatten handles deep, mixed structures', () => {
  assert.deepEqual(
    flatten({ u: { name: 'Ada', roles: ['a', 'b'] }, active: true }),
    { 'u.name': 'Ada', 'u.roles.0': 'a', 'u.roles.1': 'b', 'active': true }
  );
});

check('flatten preserves empty objects and arrays', () => {
  assert.deepEqual(flatten({ a: {}, b: [], c: 1 }), { 'a': {}, 'b': [], 'c': 1 });
});

check('flatten supports a custom delimiter', () => {
  assert.deepEqual(flatten({ a: { b: 1 } }, '/'), { 'a/b': 1 });
});

check('unflatten rebuilds nested objects', () => {
  assert.deepEqual(unflatten({ 'a.b': 1, 'a.c': 2 }), { a: { b: 1, c: 2 } });
});

check('unflatten rebuilds arrays from numeric segments', () => {
  const out = unflatten({ 'x.0': 10, 'x.1': 20 });
  assert.deepEqual(out, { x: [10, 20] });
  assert.ok(Array.isArray(out.x));
});

check('flatten then unflatten round-trips a complex object', () => {
  const obj = { user: { name: 'Ada', roles: ['admin', 'dev'], addr: { city: 'London' } }, active: true, tags: [1, 2, 3] };
  assert.deepEqual(unflatten(flatten(obj)), obj);
});

check('round-trip works with a custom delimiter', () => {
  const obj = { a: { b: { c: 5 } }, list: ['x', 'y'] };
  assert.deepEqual(unflatten(flatten(obj, '__'), '__'), obj);
});

check('validation', () => {
  assert.throws(() => flatten(42), /root must be an object/);
  assert.throws(() => flatten('nope'), /root must be an object/);
  assert.throws(() => unflatten([1, 2]), /flat object/);
  assert.throws(() => unflatten('x'), /flat object/);
});

console.log(`\n${n} checks passed.`);
