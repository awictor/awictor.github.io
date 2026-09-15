import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { encode, decode, toASCII, toUnicode } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('encode — RFC/Wikipedia vectors', () => {
  assert.equal(encode('bücher'), 'bcher-kva');
  assert.equal(encode('münchen'), 'mnchen-3ya');
  assert.equal(encode('☃'), 'n3h');
});

check('decode inverts encode for those vectors', () => {
  assert.equal(decode('bcher-kva'), 'bücher');
  assert.equal(decode('mnchen-3ya'), 'münchen');
  assert.equal(decode('n3h'), '☃');
});

check('round-trip on varied scripts', () => {
  for (const s of ['bücher', 'münchen', 'café', 'αβγ', '日本語', 'faß']) {
    assert.equal(decode(encode(s)), s);
  }
});

check('pure-ASCII label encodes to itself minus trailing delimiter handling', () => {
  // ASCII-only strings still round-trip through decode(encode())
  assert.equal(decode(encode('example')), 'example');
});

check('toASCII prefixes only non-ASCII labels', () => {
  assert.equal(toASCII('münchen.de'), 'xn--mnchen-3ya.de');
  assert.equal(toASCII('example.com'), 'example.com');
  assert.equal(toASCII('bücher.example.com'), 'xn--bcher-kva.example.com');
});

check('toUnicode decodes xn-- labels only', () => {
  assert.equal(toUnicode('xn--mnchen-3ya.de'), 'münchen.de');
  assert.equal(toUnicode('example.com'), 'example.com');
});

check('toASCII / toUnicode are inverses on a full domain', () => {
  const d = 'münchen.日本語.com';
  assert.equal(toUnicode(toASCII(d)), d);
});

check('xn-- prefix is case-insensitive (basic code points keep their case)', () => {
  assert.equal(toUnicode('XN--mnchen-3ya.de'), 'münchen.de');   // prefix upper, body lower
  assert.equal(toUnicode('xn--MNCHEN-3ya.de'), 'MüNCHEN.de');   // Punycode preserves basic-cp case
});

check('emoji and snowman survive round-trip', () => {
  assert.equal(toUnicode(toASCII('☃.com')), '☃.com');
  assert.equal(toASCII('☃.com'), 'xn--n3h.com');
});

check('invalid punycode digit throws', () => {
  assert.throws(() => decode('bücher'), /invalid/);   // non-basic in basic section
});

console.log(`\n${n} checks passed.`);
