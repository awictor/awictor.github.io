import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { pascal, singular, scalarType, toGraphQL } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('scalarType maps JSON scalars', () => {
  assert.equal(scalarType(1), 'Int');
  assert.equal(scalarType(1.5), 'Float');
  assert.equal(scalarType(true), 'Boolean');
  assert.equal(scalarType('x'), 'String');
});

check('pascal and singular', () => {
  assert.equal(pascal('home_address'), 'HomeAddress');
  assert.equal(singular('orders'), 'order');
});

check('toGraphQL emits a root type with non-null scalar fields', () => {
  const g = toGraphQL({ id: 1, name: 'a', active: true, score: 1.5 }, 'User');
  assert.ok(g.includes('type User {'));
  assert.ok(g.includes('id: Int!'));
  assert.ok(g.includes('name: String!'));
  assert.ok(g.includes('active: Boolean!'));
  assert.ok(g.includes('score: Float!'));
});

check('null fields are nullable String', () => {
  assert.ok(toGraphQL({ note: null }).includes('note: String\n'));
});

check('scalar arrays become non-null lists of non-null items', () => {
  assert.ok(toGraphQL({ tags: ['a', 'b'] }).includes('tags: [String!]!'));
  assert.ok(toGraphQL({ nums: [1, 2] }).includes('nums: [Int!]!'));
});

check('empty arrays fall back to [String]', () => {
  assert.ok(toGraphQL({ items: [] }).includes('items: [String]'));
});

check('nested objects generate their own type', () => {
  const g = toGraphQL({ address: { city: 'London' } }, 'Root');
  assert.ok(g.includes('type Address {'));
  assert.ok(g.includes('address: Address!'));
  assert.ok(g.indexOf('type Address') < g.indexOf('type Root')); // defined before use
});

check('arrays of objects use a singular element type', () => {
  const g = toGraphQL({ orders: [{ id: 1 }] }, 'Root');
  assert.ok(g.includes('type Order {'));
  assert.ok(g.includes('orders: [Order!]!'));
});

check('root type name is PascalCased', () => {
  assert.ok(toGraphQL({ a: 1 }, 'my_type').includes('type MyType {'));
});

check('validation', () => {
  assert.throws(() => toGraphQL([1, 2]), /root must be a JSON object/);
  assert.throws(() => toGraphQL(5), /root must be a JSON object/);
});

console.log(`\n${n} checks passed.`);
