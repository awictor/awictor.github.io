import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { parseCSV, sqlValue, csvToSql } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('parseCSV reads simple rows', () => {
  assert.deepEqual(parseCSV('a,b\n1,2'), [['a', 'b'], ['1', '2']]);
});

check('parseCSV handles quoted commas', () => {
  assert.deepEqual(parseCSV('"a,b",c'), [['a,b', 'c']]);
});

check('parseCSV handles doubled-quote escapes', () => {
  assert.deepEqual(parseCSV('"she said ""hi""",x'), [['she said "hi"', 'x']]);
});

check('parseCSV handles newlines inside quotes', () => {
  assert.deepEqual(parseCSV('"line1\nline2",b'), [['line1\nline2', 'b']]);
});

check('sqlValue formats literals by type', () => {
  assert.equal(sqlValue('42'), '42');
  assert.equal(sqlValue('3.14'), '3.14');
  assert.equal(sqlValue('-7'), '-7');
  assert.equal(sqlValue('hello'), "'hello'");
  assert.equal(sqlValue(''), 'NULL');
  assert.equal(sqlValue('true'), 'TRUE');
  assert.equal(sqlValue('FALSE'), 'FALSE');
});

check('sqlValue escapes apostrophes', () => {
  assert.equal(sqlValue("O'Brien"), "'O''Brien'");
});

check('csvToSql emits one INSERT per row', () => {
  const out = csvToSql('a,b\n1,x\n2,y', 't');
  assert.equal(out, "INSERT INTO t (a, b) VALUES (1, 'x');\nINSERT INTO t (a, b) VALUES (2, 'y');");
});

check('csvToSql multi-row mode produces a single INSERT', () => {
  const out = csvToSql('a,b\n1,x\n2,y', 't', { multiRow: true });
  assert.ok(out.startsWith('INSERT INTO t (a, b) VALUES\n'));
  assert.ok(out.includes("(1, 'x'),"));
  assert.ok(out.trim().endsWith("(2, 'y');"));
  assert.equal((out.match(/INSERT INTO/g) || []).length, 1);
});

check('quoting distinguishes numbers, strings, booleans and NULL end-to-end', () => {
  const out = csvToSql('id,name,active,note\n1,Ada,true,', 'users');
  assert.equal(out, "INSERT INTO users (id, name, active, note) VALUES (1, 'Ada', TRUE, NULL);");
});

check('validation: need header plus a data row', () => {
  assert.throws(() => csvToSql('a,b', 't'), /at least one data row/);
  assert.throws(() => csvToSql('', 't'), /at least one data row/);
});

console.log(`\n${n} checks passed.`);
