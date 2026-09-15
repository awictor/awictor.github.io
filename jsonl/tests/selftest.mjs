import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { toJsonl, fromJsonl, lineCount } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('toJsonl: one compact JSON per line', () => {
  assert.equal(toJsonl('[{"a":1},{"b":2}]'), '{"a":1}\n{"b":2}');
  assert.equal(toJsonl('[1,2,3]'), '1\n2\n3');
});

check('toJsonl: empty array → empty string', () => {
  assert.equal(toJsonl('[]'), '');
});

check('toJsonl rejects non-arrays and bad JSON', () => {
  assert.throws(() => toJsonl('{"a":1}'), /must be a JSON array/);
  assert.throws(() => toJsonl('nope'), /invalid JSON/);
});

check('fromJsonl parses each line into an array', () => {
  assert.deepEqual(JSON.parse(fromJsonl('{"a":1}\n{"b":2}')), [{ a: 1 }, { b: 2 }]);
  assert.deepEqual(JSON.parse(fromJsonl('1\n2\n3')), [1, 2, 3]);
});

check('fromJsonl skips blank lines', () => {
  assert.deepEqual(JSON.parse(fromJsonl('{"a":1}\n\n  \n{"b":2}\n')), [{ a: 1 }, { b: 2 }]);
});

check('fromJsonl reports the bad line number', () => {
  assert.throws(() => fromJsonl('{"a":1}\noops\n{"b":2}'), /invalid JSON on line 2/);
});

check('fromJsonl pretty-prints with 2 spaces', () => {
  assert.equal(fromJsonl('{"a":1}'), '[\n  {\n    "a": 1\n  }\n]');
});

check('round-trips array → jsonl → array', () => {
  const src = '[{"id":1,"tags":["x","y"]},{"id":2,"tags":[]}]';
  const back = JSON.parse(fromJsonl(toJsonl(src)));
  assert.deepEqual(back, JSON.parse(src));
});

check('lineCount ignores blanks', () => {
  assert.equal(lineCount('a\n\nb\n'), 2);
  assert.equal(lineCount(''), 0);
});

check('nested objects survive both directions', () => {
  const jsonl = toJsonl('[{"a":{"b":[1,2]}}]');
  assert.equal(jsonl, '{"a":{"b":[1,2]}}');
  assert.deepEqual(JSON.parse(fromJsonl(jsonl)), [{ a: { b: [1, 2] } }]);
});

console.log(`\n${n} checks passed.`);
