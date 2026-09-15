import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { parseINI, toINI } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('parseINI reads a section into a nested object', () => {
  assert.deepEqual(parseINI('[db]\nhost=localhost\nport=5432'), { db: { host: 'localhost', port: '5432' } });
});

check('root keys before any section stay at the top level', () => {
  assert.deepEqual(parseINI('name=app\n[db]\nhost=x'), { name: 'app', db: { host: 'x' } });
});

check('comments (; and #) and blank lines are ignored', () => {
  assert.deepEqual(parseINI('; a comment\n# another\n\nkey=value\n'), { key: 'value' });
});

check('whitespace around keys and values is trimmed', () => {
  assert.deepEqual(parseINI('  key  =  value here  '), { key: 'value here' });
});

check('only the first = splits the line', () => {
  assert.deepEqual(parseINI('url=http://x?a=b'), { url: 'http://x?a=b' });
});

check('values are kept as strings (no coercion)', () => {
  const o = parseINI('n=42\nb=true');
  assert.strictEqual(o.n, '42');
  assert.strictEqual(o.b, 'true');
});

check('toINI writes root keys then [section] blocks', () => {
  const ini = toINI({ name: 'app', db: { host: 'localhost' } });
  assert.ok(ini.includes('name = app'));
  assert.ok(ini.includes('[db]'));
  assert.ok(ini.includes('host = localhost'));
  assert.ok(ini.indexOf('name = app') < ini.indexOf('[db]'));
});

check('INI -> JSON -> INI round-trips a structured object', () => {
  const obj = { name: 'app', debug: 'true', database: { host: 'localhost', port: '5432' } };
  assert.deepEqual(parseINI(toINI(obj)), obj);
});

check('a section with no root keys works', () => {
  assert.deepEqual(parseINI('[only]\na=1\nb=2'), { only: { a: '1', b: '2' } });
});

check('validation', () => {
  assert.throws(() => parseINI(42), /must be a string/);
  assert.throws(() => toINI([1, 2]), /must be an object/);
  assert.throws(() => toINI('x'), /must be an object/);
});

console.log(`\n${n} checks passed.`);
