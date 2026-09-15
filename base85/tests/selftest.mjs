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

check('classic vector: "Man " → 9jqo^', () => {
  assert.equal(encode('Man '), '9jqo^');
  assert.equal(decode('9jqo^'), 'Man ');
});

check('round-trips for various lengths', () => {
  for(const s of ['M', 'Ma', 'Man', 'Man ', 'hello world', 'The quick brown fox']){
    assert.equal(decode(encode(s)), s);
  }
});

check('four zero bytes encode to z shorthand', () => {
  assert.equal(encode('\0\0\0\0'), 'z');
  assert.equal(decode('z'), '\0\0\0\0');
});

check('z round-trips inside data', () => {
  const s = 'A\0\0\0\0B';
  assert.equal(decode(encode(s)), s);
});

check('partial group output length = bytes + 1', () => {
  assert.equal(encode('M').length, 2);
  assert.equal(encode('Ma').length, 3);
  assert.equal(encode('Man').length, 4);
  assert.equal(encode('Man ').length, 5);
});

check('Adobe delimiters can be added and are stripped on decode', () => {
  const enc = encode('Man ', true);
  assert.equal(enc, '<~9jqo^~>');
  assert.equal(decode(enc), 'Man ');
});

check('decode ignores whitespace', () => {
  assert.equal(decode('9j qo\n^'), 'Man ');
});

check('UTF-8 round-trips', () => {
  assert.equal(decode(encode('café €')), 'café €');
});

check('empty string', () => {
  assert.equal(encode(''), '');
  assert.equal(decode(''), '');
});

check('validation', () => {
  assert.throws(() => decode('9jqo~'), /invalid Ascii85/);   // '~' (126) is out of range
  assert.throws(() => decode('9'), /truncated/);             // single trailing char
  assert.throws(() => decode('9z'), /inside a group/);       // 'z' after a digit
});

console.log(`\n${n} checks passed.`);
