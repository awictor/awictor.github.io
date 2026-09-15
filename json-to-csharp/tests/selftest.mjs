import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { pascal, singular, scalarType, toCSharp } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('scalarType maps JSON scalars to C# types', () => {
  assert.equal(scalarType(1), 'int');
  assert.equal(scalarType(1.5), 'double');
  assert.equal(scalarType(true), 'bool');
  assert.equal(scalarType('x'), 'string');
  assert.equal(scalarType(null), 'object');
});

check('big integers become long', () => {
  assert.equal(scalarType(3000000000), 'long');
  assert.equal(scalarType(2147483647), 'int');
});

check('pascal and singular', () => {
  assert.equal(pascal('user_id'), 'UserId');
  assert.equal(singular('roles'), 'role');
});

check('toCSharp emits a class with auto-properties', () => {
  const cs = toCSharp({ id: 1, name: 'a', active: true }, 'User');
  assert.ok(cs.includes('public class User'));
  assert.ok(cs.includes('public int Id { get; set; }'));
  assert.ok(cs.includes('public string Name { get; set; }'));
  assert.ok(cs.includes('public bool Active { get; set; }'));
});

check('a renamed key gets a JsonPropertyName attribute', () => {
  const cs = toCSharp({ user_id: 1 }, 'Root');
  assert.ok(cs.includes('[JsonPropertyName("user_id")]'));
  assert.ok(cs.includes('public int UserId { get; set; }'));
});

check('nested objects generate their own class before use', () => {
  const cs = toCSharp({ address: { city: 'London' } }, 'Root');
  assert.ok(cs.includes('public class Address'));
  assert.ok(cs.includes('public Address Address { get; set; }'));
  assert.ok(cs.indexOf('class Address') < cs.indexOf('class Root'));
});

check('arrays become List<T>', () => {
  assert.ok(toCSharp({ roles: ['a'] }).includes('public List<string> Roles { get; set; }'));
  assert.ok(toCSharp({ nums: [1, 2] }).includes('List<int>'));
});

check('empty arrays fall back to List<object>', () => {
  assert.ok(toCSharp({ items: [] }).includes('List<object>'));
});

check('arrays of objects use a singular element class', () => {
  const cs = toCSharp({ orders: [{ id: 1 }] });
  assert.ok(cs.includes('public class Order'));
  assert.ok(cs.includes('List<Order>'));
});

check('validation', () => {
  assert.throws(() => toCSharp([1, 2]), /root must be a JSON object/);
  assert.throws(() => toCSharp(5), /root must be a JSON object/);
});

console.log(`\n${n} checks passed.`);
