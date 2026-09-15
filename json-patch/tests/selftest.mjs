import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { parsePointer, getValue, applyPatch } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('parsePointer decodes tokens and escapes (RFC 6901)', () => {
  assert.deepEqual(parsePointer(''), []);
  assert.deepEqual(parsePointer('/foo/0'), ['foo', '0']);
  assert.deepEqual(parsePointer('/a~1b/c~0d'), ['a/b', 'c~d']);
});

check('getValue resolves object and array paths', () => {
  const doc = { foo: { bar: [10, 20] } };
  assert.equal(getValue(doc, ['foo', 'bar', '1']), 20);
  assert.deepEqual(getValue(doc, []), doc);
  assert.throws(() => getValue(doc, ['nope']), /path not found/);
});

check('add: object member and array insert (RFC A.1/A.4)', () => {
  assert.deepEqual(applyPatch({ foo: 'bar' }, [{ op: 'add', path: '/baz', value: 'qux' }]), { foo: 'bar', baz: 'qux' });
  assert.deepEqual(applyPatch({ foo: ['bar', 'baz'] }, [{ op: 'add', path: '/foo/1', value: 'qux' }]), { foo: ['bar', 'qux', 'baz'] });
});

check('add with "-" appends to an array', () => {
  assert.deepEqual(applyPatch({ n: [1, 2] }, [{ op: 'add', path: '/n/-', value: 3 }]), { n: [1, 2, 3] });
});

check('remove and replace (RFC A.2/A.5)', () => {
  assert.deepEqual(applyPatch({ baz: 'qux', foo: 'bar' }, [{ op: 'remove', path: '/baz' }]), { foo: 'bar' });
  assert.deepEqual(applyPatch({ baz: 'qux', foo: 'bar' }, [{ op: 'replace', path: '/baz', value: 'boo' }]), { baz: 'boo', foo: 'bar' });
});

check('move (RFC A.6)', () => {
  const out = applyPatch({ foo: { bar: 'baz', waldo: 'fred' }, qux: { corge: 'grault' } },
    [{ op: 'move', from: '/foo/waldo', path: '/qux/thud' }]);
  assert.deepEqual(out, { foo: { bar: 'baz' }, qux: { corge: 'grault', thud: 'fred' } });
});

check('copy leaves the source in place', () => {
  const out = applyPatch({ a: { b: 'c' } }, [{ op: 'copy', from: '/a/b', path: '/d' }]);
  assert.deepEqual(out, { a: { b: 'c' }, d: 'c' });
});

check('test passes silently and fails loudly (RFC A.8/A.9)', () => {
  assert.deepEqual(applyPatch({ baz: 'qux' }, [{ op: 'test', path: '/baz', value: 'qux' }]), { baz: 'qux' });
  assert.throws(() => applyPatch({ baz: 'qux' }, [{ op: 'test', path: '/baz', value: 'bar' }]), /test failed/);
});

check('the input document is not mutated', () => {
  const doc = { foo: 'bar' };
  applyPatch(doc, [{ op: 'add', path: '/x', value: 1 }]);
  assert.deepEqual(doc, { foo: 'bar' });
});

check('malformed patches and unknown ops throw', () => {
  assert.throws(() => applyPatch({}, { op: 'add' }), /must be an array/);
  assert.throws(() => applyPatch({}, [{ op: 'frobnicate', path: '/x' }]), /unknown operation/);
  assert.throws(() => applyPatch({}, [{ path: '/x' }]), /malformed operation/);
});

console.log(`\n${n} checks passed.`);
