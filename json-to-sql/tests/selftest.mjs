import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { inferType, mergeTypes, inferColumns, sqlType, toDDL } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('inferType covers the scalar cases', () => {
  assert.equal(inferType(1), 'INTEGER');
  assert.equal(inferType(1.5), 'REAL');
  assert.equal(inferType(true), 'BOOLEAN');
  assert.equal(inferType('hello'), 'TEXT');
  assert.equal(inferType(null), null);
  assert.equal(inferType({ a: 1 }), 'TEXT'); // nested object -> JSON text
  assert.equal(inferType([1, 2]), 'TEXT');
});

check('inferType recognizes ISO date and datetime strings', () => {
  assert.equal(inferType('2021-03-04'), 'TIMESTAMP');
  assert.equal(inferType('2021-03-04T10:00:00Z'), 'TIMESTAMP');
  assert.equal(inferType('2021-03-04 10:00:00'), 'TIMESTAMP');
  assert.equal(inferType('2021'), 'TEXT'); // not a full date
});

check('mergeTypes widens int+real to real, mixed to text', () => {
  assert.equal(mergeTypes('INTEGER', 'REAL'), 'REAL');
  assert.equal(mergeTypes('REAL', 'INTEGER'), 'REAL');
  assert.equal(mergeTypes('INTEGER', 'TEXT'), 'TEXT');
  assert.equal(mergeTypes('BOOLEAN', 'INTEGER'), 'TEXT');
  assert.equal(mergeTypes('TIMESTAMP', 'TEXT'), 'TEXT');
});

check('mergeTypes treats null as unknown (keeps the other type)', () => {
  assert.equal(mergeTypes(null, 'INTEGER'), 'INTEGER');
  assert.equal(mergeTypes('TEXT', null), 'TEXT');
  assert.equal(mergeTypes('BOOLEAN', 'BOOLEAN'), 'BOOLEAN');
});

check('inferColumns builds columns in first-seen order', () => {
  const cols = inferColumns([{ id: 1, name: 'a' }, { id: 2, name: 'b' }]);
  assert.deepEqual(cols.map(c => c.name), ['id', 'name']);
  assert.equal(cols[0].type, 'INTEGER');
  assert.equal(cols[1].type, 'TEXT');
  assert.ok(cols.every(c => c.nullable === false));
});

check('inferColumns marks a column nullable when a value is null or missing', () => {
  const cols = inferColumns([{ a: 1, b: 2 }, { a: null }]);
  const a = cols.find(c => c.name === 'a'), b = cols.find(c => c.name === 'b');
  assert.equal(a.nullable, true);  // null value
  assert.equal(b.nullable, true);  // missing in second row
});

check('inferColumns widens a column across rows', () => {
  const cols = inferColumns([{ x: 1 }, { x: 2.5 }]);
  assert.equal(cols[0].type, 'REAL');
});

check('toDDL (postgres) makes id the primary key and quotes idents', () => {
  const cols = inferColumns([{ id: 1, name: 'a', active: true }]);
  const ddl = toDDL('users', cols, 'postgres');
  assert.ok(ddl.startsWith('CREATE TABLE "users" ('));
  assert.ok(/"id" INTEGER PRIMARY KEY/.test(ddl));
  assert.ok(/"name" TEXT NOT NULL/.test(ddl));
  assert.ok(/"active" BOOLEAN NOT NULL/.test(ddl));
  assert.ok(ddl.trim().endsWith(');'));
});

check('sqlType maps per dialect', () => {
  assert.equal(sqlType('sqlite', 'BOOLEAN'), 'INTEGER');
  assert.equal(sqlType('sqlite', 'TIMESTAMP'), 'TEXT');
  assert.equal(sqlType('mysql', 'BOOLEAN'), 'TINYINT(1)');
  assert.equal(sqlType('mysql', 'REAL'), 'DOUBLE');
  assert.equal(sqlType('postgres', 'REAL'), 'DOUBLE PRECISION');
});

check('validation', () => {
  assert.throws(() => inferColumns([]), /at least one/);
  assert.throws(() => inferColumns('nope'), /array/);
  assert.throws(() => inferColumns([1, 2]), /must be an object/);
  assert.throws(() => toDDL('123bad', [{ name: 'a', type: 'TEXT', nullable: true }], 'postgres'), /invalid table name/);
  assert.throws(() => toDDL('t', [], 'postgres'), /at least one column/);
  assert.throws(() => sqlType('oracle', 'TEXT'), /unknown dialect/);
});

console.log(`\n${n} checks passed.`);
