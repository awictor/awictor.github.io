import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { utf8bytes, fnv1a, djb2, toHex } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('FNV-1a known vectors', () => {
  assert.equal(fnv1a(''), 0x811c9dc5);        // 2166136261 (offset basis)
  assert.equal(fnv1a('a'), 0xe40c292c);
  assert.equal(fnv1a('hello'), 0x4f9f2cab);
});

check('djb2 initial value and hand-computed small cases', () => {
  assert.equal(djb2(''), 5381);
  assert.equal(djb2('a'), 5381 * 33 + 97);       // 177670
  assert.equal(djb2('ab'), (5381 * 33 + 97) * 33 + 98);  // 5863208
});

check('both are deterministic', () => {
  assert.equal(fnv1a('repeatable'), fnv1a('repeatable'));
  assert.equal(djb2('repeatable'), djb2('repeatable'));
});

check('different inputs give different hashes (no trivial collision)', () => {
  assert.notEqual(fnv1a('foo'), fnv1a('bar'));
  assert.notEqual(djb2('foo'), djb2('bar'));
});

check('results are unsigned 32-bit', () => {
  ['', 'a', 'hello world', 'The quick brown fox'].forEach(s => {
    const f = fnv1a(s), d = djb2(s);
    assert.ok(f >= 0 && f <= 0xffffffff);
    assert.ok(d >= 0 && d <= 0xffffffff);
  });
});

check('order matters (FNV-1a)', () => {
  assert.notEqual(fnv1a('ab'), fnv1a('ba'));
});

check('utf8 byte counting', () => {
  assert.equal(utf8bytes('a').length, 1);
  assert.equal(utf8bytes('é').length, 2);
  assert.equal(utf8bytes('☃').length, 3);
});

check('multi-byte chars affect the hash', () => {
  assert.notEqual(fnv1a('café'), fnv1a('cafe'));
});

check('toHex formats 8 uppercase hex digits', () => {
  assert.equal(toHex(0x811c9dc5), '0x811C9DC5');
  assert.equal(toHex(0x4f9f2cab), '0x4F9F2CAB');
  assert.equal(toHex(5381), '0x00001505');
});

check('large input does not overflow past 32 bits', () => {
  const big = 'x'.repeat(10000);
  const f = fnv1a(big);
  assert.ok(Number.isInteger(f) && f >= 0 && f <= 0xffffffff);
});

console.log(`\n${n} checks passed.`);
