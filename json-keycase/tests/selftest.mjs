import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { words, recaseKey, recaseKeys } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('words splits camelCase, snake, kebab and spaces', () => {
  assert.deepEqual(words('firstName'), ['first', 'name']);
  assert.deepEqual(words('user_id'), ['user', 'id']);
  assert.deepEqual(words('home-address'), ['home', 'address']);
  assert.deepEqual(words('Postal Code'), ['postal', 'code']);
});

check('words handles acronym humps', () => {
  assert.deepEqual(words('parseHTMLString'), ['parse', 'html', 'string']);
});

check('recaseKey to snake_case', () => {
  assert.equal(recaseKey('firstName', 'snake'), 'first_name');
  assert.equal(recaseKey('HomeAddress', 'snake'), 'home_address');
});

check('recaseKey to camelCase', () => {
  assert.equal(recaseKey('user_id', 'camel'), 'userId');
  assert.equal(recaseKey('home-address', 'camel'), 'homeAddress');
});

check('recaseKey to kebab and pascal', () => {
  assert.equal(recaseKey('firstName', 'kebab'), 'first-name');
  assert.equal(recaseKey('first_name', 'pascal'), 'FirstName');
});

check('recaseKeys recurses through nested objects', () => {
  const out = recaseKeys({ user_id: 1, home_address: { street_name: 'x' } }, 'camel');
  assert.deepEqual(out, { userId: 1, homeAddress: { streetName: 'x' } });
});

check('recaseKeys recurses through arrays of objects', () => {
  const out = recaseKeys({ recent_orders: [{ order_id: 10 }] }, 'camel');
  assert.deepEqual(out, { recentOrders: [{ orderId: 10 }] });
});

check('values are left untouched', () => {
  const out = recaseKeys({ some_key: 'Snake_Value', n: 42, b: true, z: null }, 'camel');
  assert.equal(out.someKey, 'Snake_Value');
  assert.equal(out.n, 42);
  assert.equal(out.b, true);
  assert.equal(out.z, null);
});

check('round-trips snake -> camel -> snake for simple keys', () => {
  const obj = { user_id: 1, first_name: 'a', home_address: { postal_code: 'x' } };
  assert.deepEqual(recaseKeys(recaseKeys(obj, 'camel'), 'snake'), obj);
});

check('validation and edge cases', () => {
  assert.deepEqual(words(''), []);
  assert.throws(() => recaseKey('x', 'nope'), /unknown style/);
  assert.equal(recaseKeys(5, 'camel'), 5); // scalars pass through
});

console.log(`\n${n} checks passed.`);
