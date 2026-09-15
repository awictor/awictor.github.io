import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { escapeToken, unescapeToken, parsePointer, resolve, listPointers } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

// The document from RFC 6901 §5.
const RFC = {
  'foo': ['bar', 'baz'],
  '': 0,
  'a/b': 1,
  'c%d': 2,
  'e^f': 3,
  'g|h': 4,
  'i\\j': 5,
  'k"l': 6,
  ' ': 7,
  'm~n': 8
};

check('token escaping (~1 = /, ~0 = ~; ~0 applied last)', () => {
  assert.equal(unescapeToken('a~1b'), 'a/b');
  assert.equal(unescapeToken('m~0n'), 'm~n');
  assert.equal(unescapeToken('~01'), '~1');   // ~1 first, then ~0
  assert.equal(escapeToken('a/b'), 'a~1b');
  assert.equal(escapeToken('m~n'), 'm~0n');
});

check('escape round-trips', () => {
  for(const s of ['a/b', 'm~n', '~01', 'plain', '/leading', 'a~1~0b']){
    assert.equal(unescapeToken(escapeToken(s)), s);
  }
});

check('empty pointer resolves to the whole document', () => {
  assert.deepEqual(resolve(RFC, ''), RFC);
  assert.deepEqual(parsePointer(''), []);
});

check('RFC 6901 §5 reference resolutions', () => {
  assert.deepEqual(resolve(RFC, '/foo'), ['bar', 'baz']);
  assert.equal(resolve(RFC, '/foo/0'), 'bar');
  assert.equal(resolve(RFC, '/'), 0);
  assert.equal(resolve(RFC, '/a~1b'), 1);
  assert.equal(resolve(RFC, '/c%d'), 2);
  assert.equal(resolve(RFC, '/e^f'), 3);
  assert.equal(resolve(RFC, '/g|h'), 4);
  assert.equal(resolve(RFC, '/i\\j'), 5);
  assert.equal(resolve(RFC, '/k"l'), 6);
  assert.equal(resolve(RFC, '/ '), 7);
  assert.equal(resolve(RFC, '/m~0n'), 8);
});

check('nested arrays and objects', () => {
  const doc = { nested: { list: [10, { x: true }] } };
  assert.equal(resolve(doc, '/nested/list/0'), 10);
  assert.equal(resolve(doc, '/nested/list/1/x'), true);
});

check('a non-empty pointer must start with "/"', () => {
  assert.throws(() => parsePointer('foo'), /start with/);
  assert.throws(() => resolve(RFC, 'foo/bar'), /start with/);
});

check('array index errors', () => {
  assert.throws(() => resolve(RFC, '/foo/5'), /out of range/);
  assert.throws(() => resolve(RFC, '/foo/-'), /after the last/);
  assert.throws(() => resolve(RFC, '/foo/01'), /invalid array index/); // no leading zeros
});

check('missing key and descending into a scalar throw', () => {
  assert.throws(() => resolve(RFC, '/nope'), /no such key/);
  assert.throws(() => resolve(RFC, '/foo/0/deeper'), /cannot descend/);
});

check('listPointers enumerates every node, root first', () => {
  const doc = { a: [1], b: { c: 2 } };
  assert.deepEqual(listPointers(doc), ['', '/a', '/a/0', '/b', '/b/c']);
});

check('listPointers escapes special keys and pointers resolve back', () => {
  const ptrs = listPointers(RFC);
  assert.ok(ptrs.includes('/a~1b'));   // key "a/b" -> escaped
  assert.ok(ptrs.includes('/m~0n'));   // key "m~n" -> escaped
  for(const p of ptrs) resolve(RFC, p); // every listed pointer resolves without throwing
});

console.log(`\n${n} checks passed.`);
