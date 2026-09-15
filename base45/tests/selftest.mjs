import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { CHARSET, encodeBytes, decodeBytes, encode, decode } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('the alphabet is the 45-character RFC 9285 set', () => {
  assert.equal(CHARSET.length, 45);
  assert.equal(new Set(CHARSET).size, 45);
  assert.ok(CHARSET.startsWith('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'));
});

check('RFC 9285 vector: "AB" -> "BB8"', () => {
  assert.equal(encode('AB'), 'BB8');
});

check('RFC 9285 vector: "Hello!!" -> "%69 VD92EX0"', () => {
  assert.equal(encode('Hello!!'), '%69 VD92EX0');
});

check('RFC 9285 vector: "base-45" -> "UJCLQE7W581"', () => {
  assert.equal(encode('base-45'), 'UJCLQE7W581');
});

check('decode reverses the RFC vectors', () => {
  assert.equal(decode('BB8'), 'AB');
  assert.equal(decode('%69 VD92EX0'), 'Hello!!');
  assert.equal(decode('UJCLQE7W581'), 'base-45');
});

check('a pair of bytes encodes to three characters; a lone byte to two', () => {
  assert.equal(encodeBytes([0x41, 0x42]).length, 3);
  assert.equal(encodeBytes([0x41]).length, 2);
});

check('encodeBytes / decodeBytes round-trip', () => {
  for (const arr of [[0], [255], [0, 0, 0], [1, 2, 3, 4, 5], [255, 254, 253]]) {
    assert.deepEqual(decodeBytes(encodeBytes(arr)), arr);
  }
});

check('string round-trips including UTF-8', () => {
  for (const s of ['', 'hello world', 'café 🎉', 'The quick brown fox']) {
    assert.equal(decode(encode(s)), s);
  }
});

check('empty input encodes to empty', () => {
  assert.equal(encode(''), '');
  assert.equal(decode(''), '');
});

check('validation: invalid characters and lengths throw', () => {
  assert.throws(() => decodeBytes('!!!'), /invalid Base45 character/); // '!' not in set
  assert.throws(() => decodeBytes('B'), /invalid Base45 length/);       // single leftover char
});

console.log(`\n${n} checks passed.`);
