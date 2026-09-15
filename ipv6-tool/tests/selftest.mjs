import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { expand, compress, isValid } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('expand fills :: and pads groups', () => {
  assert.equal(expand('2001:db8::1'), '2001:0db8:0000:0000:0000:0000:0000:0001');
});

check('expand ::1 (loopback)', () => {
  assert.equal(expand('::1'), '0000:0000:0000:0000:0000:0000:0000:0001');
});

check('expand :: (all zeros)', () => {
  assert.equal(expand('::'), '0000:0000:0000:0000:0000:0000:0000:0000');
});

check('expand a full address just pads', () => {
  assert.equal(expand('fe80:0:0:0:0:0:0:1'), 'fe80:0000:0000:0000:0000:0000:0000:0001');
});

check('compress drops leading zeros and longest zero run', () => {
  assert.equal(compress('2001:0db8:0000:0000:0000:0000:0000:0001'), '2001:db8::1');
  assert.equal(compress('fe80:0000:0000:0000:0000:0000:0000:0001'), 'fe80::1');
  assert.equal(compress('0000:0000:0000:0000:0000:0000:0000:0000'), '::');
  assert.equal(compress('0000:0000:0000:0000:0000:0000:0000:0001'), '::1');
});

check('compress picks the first of equal-length zero runs', () => {
  assert.equal(compress('2001:db8:0:0:1:0:0:1'), '2001:db8::1:0:0:1');
});

check('compress leaves a single zero group uncompressed', () => {
  // only one zero group → no :: (needs 2+)
  assert.equal(compress('2001:db8:0:1:2:3:4:5'), '2001:db8:0:1:2:3:4:5');
});

check('expand and compress round-trip', () => {
  const a = '2001:db8::42:1';
  assert.equal(compress(expand(a)), '2001:db8::42:1');
});

check('isValid accepts good addresses', () => {
  assert.ok(isValid('2001:db8::1'));
  assert.ok(isValid('::1'));
  assert.ok(isValid('fe80:0:0:0:0:0:0:1'));
});

check('isValid rejects malformed addresses', () => {
  assert.ok(!isValid('xyz'));
  assert.ok(!isValid('1:2:3'));            // too few groups, no ::
  assert.ok(!isValid('2001::db8::1'));     // two ::
  assert.ok(!isValid('12345::1'));         // group too long
  assert.ok(!isValid('1:2:3:4:5:6:7:8:9')); // too many groups
});

console.log(`\n${n} checks passed.`);
