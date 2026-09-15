import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { pascal, singular, scalarType, toSwift } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('scalarType maps JSON scalars to Swift types', () => {
  assert.equal(scalarType(1), 'Int');
  assert.equal(scalarType(1.5), 'Double');
  assert.equal(scalarType(true), 'Bool');
  assert.equal(scalarType('x'), 'String');
  assert.equal(scalarType(null), 'String?');
});

check('pascal and singular', () => {
  assert.equal(pascal('user_id'), 'UserId');
  assert.equal(singular('roles'), 'role');
});

check('toSwift emits a Codable struct with let properties', () => {
  const s = toSwift({ id: 1, name: 'a', active: true }, 'User');
  assert.ok(s.includes('struct User: Codable {'));
  assert.ok(s.includes('let id: Int'));
  assert.ok(s.includes('let name: String'));
  assert.ok(s.includes('let active: Bool'));
});

check('null becomes an optional String?', () => {
  assert.ok(toSwift({ note: null }).includes('let note: String?'));
});

check('nested objects generate their own struct before use', () => {
  const s = toSwift({ address: { city: 'London' } }, 'Root');
  assert.ok(s.includes('struct Address: Codable {'));
  assert.ok(s.includes('let address: Address'));
  assert.ok(s.indexOf('struct Address') < s.indexOf('struct Root'));
});

check('arrays become [Element]', () => {
  assert.ok(toSwift({ roles: ['a'] }).includes('let roles: [String]'));
  assert.ok(toSwift({ nums: [1, 2] }).includes('[Int]'));
});

check('empty arrays fall back to [String]', () => {
  assert.ok(toSwift({ items: [] }).includes('let items: [String]'));
});

check('arrays of objects use a singular element struct', () => {
  const s = toSwift({ orders: [{ id: 1 }] });
  assert.ok(s.includes('struct Order: Codable {'));
  assert.ok(s.includes('let orders: [Order]'));
});

check('invalid identifier keys are backtick-quoted', () => {
  assert.ok(toSwift({ 'weird-key': 1 }).includes('let `weird-key`: Int'));
});

check('validation', () => {
  assert.throws(() => toSwift([1, 2]), /root must be a JSON object/);
  assert.throws(() => toSwift(5), /root must be a JSON object/);
});

console.log(`\n${n} checks passed.`);
