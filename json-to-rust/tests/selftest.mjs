import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { toSnake, toPascal, jsonToRust } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('toSnake', () => {
  assert.equal(toSnake('firstName'), 'first_name');
  assert.equal(toSnake('user-id'), 'user_id');
  assert.equal(toSnake('SKU'), 'sku');
  assert.equal(toSnake('zip code'), 'zip_code');
});

check('toPascal', () => {
  assert.equal(toPascal('user_address'), 'UserAddress');
  assert.equal(toPascal('items'), 'Items');
  assert.equal(toPascal('root'), 'Root');
});

check('primitive field types', () => {
  const r = jsonToRust({ id: 42, score: 9.5, active: true, name: 'x' });
  assert.match(r, /pub id: i64,/);
  assert.match(r, /pub score: f64,/);
  assert.match(r, /pub active: bool,/);
  assert.match(r, /pub name: String,/);
});

check('struct header and derives', () => {
  const r = jsonToRust({ a: 1 }, 'Thing');
  assert.match(r, /#\[derive\(Serialize, Deserialize, Debug\)\]/);
  assert.match(r, /pub struct Thing \{/);
});

check('camelCase key gets snake field + serde rename', () => {
  const r = jsonToRust({ userName: 'ada' });
  assert.match(r, /#\[serde\(rename = "userName"\)\]/);
  assert.match(r, /pub user_name: String,/);
});

check('no rename when key is already snake_case', () => {
  const r = jsonToRust({ user_name: 'ada' });
  assert.ok(!r.includes('#[serde(rename'));
});

check('arrays become Vec<T>', () => {
  assert.match(jsonToRust({ tags: ['a', 'b'] }), /pub tags: Vec<String>,/);
  assert.match(jsonToRust({ nums: [1, 2] }), /pub nums: Vec<i64>,/);
  assert.match(jsonToRust({ empty: [] }), /pub empty: Vec<serde_json::Value>,/);
});

check('null becomes Option', () => {
  assert.match(jsonToRust({ maybe: null }), /pub maybe: Option<serde_json::Value>,/);
});

check('nested object creates a second struct', () => {
  const r = jsonToRust({ address: { city: 'Paris' } });
  assert.match(r, /pub address: Address,/);
  assert.match(r, /pub struct Address \{/);
  assert.match(r, /pub city: String,/);
});

check('top-level must be an object', () => {
  assert.throws(() => jsonToRust([1, 2, 3]), /must be an object/);
});

console.log(`\n${n} checks passed.`);
