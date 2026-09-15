import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { encode, decode } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('printable ASCII passes through', () => {
  assert.equal(encode('Hello World'), 'Hello World');
});

check('= is escaped to =3D', () => {
  assert.equal(encode('a=b'), 'a=3Db');
});

check('UTF-8 bytes become =XX', () => {
  assert.equal(encode('café'), 'caf=C3=A9');   // é = C3 A9
  assert.equal(encode('€'), '=E2=82=AC');       // euro sign
});

check('trailing space/tab is escaped, interior is not', () => {
  assert.equal(encode('a b'), 'a b');
  assert.equal(encode('a '), 'a=20');
  assert.equal(encode('x\t'), 'x=09');
});

check('decode reverses =XX and =3D', () => {
  assert.equal(decode('caf=C3=A9'), 'café');
  assert.equal(decode('a=3Db'), 'a=b');
  assert.equal(decode('a=20'), 'a ');
});

check('decode removes soft line breaks', () => {
  assert.equal(decode('long=\r\nline'), 'longline');
  assert.equal(decode('long=\nline'), 'longline');
});

check('round-trips', () => {
  for(const s of ['Café — déjà vu', 'plain text', 'a=b=c', 'tab\ttab', 'emoji 😀 test']){
    assert.equal(decode(encode(s)), s);
  }
});

check('lone = or bad hex is kept literally', () => {
  assert.equal(decode('=zz'), '=zz');
  assert.equal(decode('a=b'), 'a=b');   // '=b' not a valid pair (needs 2 hex)
});

check('newlines are preserved (per-line encoding)', () => {
  assert.equal(encode('line1\nline2'), 'line1\nline2');
  assert.equal(decode(encode('a\nb')), 'a\nb');
});

check('lowercase hex decodes too', () => {
  assert.equal(decode('=c3=a9'), 'é');
});

console.log(`\n${n} checks passed.`);
