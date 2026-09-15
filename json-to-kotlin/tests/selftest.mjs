import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { pascal, singular, scalarType, toKotlin } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('scalarType maps JSON scalars to Kotlin types', () => {
  assert.equal(scalarType(1), 'Int');
  assert.equal(scalarType(1.5), 'Double');
  assert.equal(scalarType(true), 'Boolean');
  assert.equal(scalarType('x'), 'String');
  assert.equal(scalarType(null), 'Any?');
});

check('big integers become Long', () => {
  assert.equal(scalarType(3000000000), 'Long'); // > Int max
  assert.equal(scalarType(2147483647), 'Int');   // Int max
});

check('pascal builds class names from keys', () => {
  assert.equal(pascal('user_name'), 'UserName');
  assert.equal(pascal('foo-bar'), 'FooBar');
  assert.equal(pascal('address'), 'Address');
  assert.equal(pascal('!!!'), 'Item');
});

check('singular strips a trailing s for element names', () => {
  assert.equal(singular('roles'), 'role');
  assert.equal(singular('items'), 'item');
  assert.equal(singular('data'), 'data');
});

check('toKotlin emits a data class with scalar fields', () => {
  const k = toKotlin({ id: 1, name: 'a', active: true }, 'User');
  assert.ok(k.includes('data class User('));
  assert.ok(k.includes('val id: Int'));
  assert.ok(k.includes('val name: String'));
  assert.ok(k.includes('val active: Boolean'));
});

check('nested objects generate their own data class', () => {
  const k = toKotlin({ address: { city: 'London' } }, 'Root');
  assert.ok(k.includes('data class Address('));
  assert.ok(k.includes('val address: Address'));
  assert.ok(k.includes('val city: String'));
  // nested class defined before it is used
  assert.ok(k.indexOf('data class Address') < k.indexOf('data class Root'));
});

check('arrays become List<T> from the first element', () => {
  assert.ok(toKotlin({ roles: ['a', 'b'] }).includes('val roles: List<String>'));
  assert.ok(toKotlin({ nums: [1, 2] }).includes('val nums: List<Int>'));
});

check('empty arrays fall back to List<Any?>', () => {
  assert.ok(toKotlin({ items: [] }).includes('val items: List<Any?>'));
});

check('null fields are Any?', () => {
  assert.ok(toKotlin({ note: null }).includes('val note: Any?'));
});

check('invalid identifiers are backtick-quoted; root must be an object', () => {
  assert.ok(toKotlin({ 'weird-key': 1 }).includes('val `weird-key`: Int'));
  assert.throws(() => toKotlin([1, 2]), /root must be a JSON object/);
  assert.throws(() => toKotlin(5), /root must be a JSON object/);
});

console.log(`\n${n} checks passed.`);
