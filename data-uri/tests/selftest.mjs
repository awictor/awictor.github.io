import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { toDataUri, fromDataUri } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('base64 encoding of plain text', () => {
  assert.equal(toDataUri('hello', { mime: 'text/plain', base64: true }), 'data:text/plain;base64,aGVsbG8=');
});

check('url encoding of plain text', () => {
  assert.equal(toDataUri('a b&c', { mime: 'text/plain' }), 'data:text/plain,a%20b%26c');
});

check('default mime is text/plain', () => {
  assert.equal(toDataUri('x', { base64: true }), 'data:text/plain;base64,eA==');
});

check('fromDataUri decodes base64', () => {
  const d = fromDataUri('data:text/plain;base64,aGVsbG8=');
  assert.equal(d.mime, 'text/plain');
  assert.equal(d.base64, true);
  assert.equal(d.content, 'hello');
});

check('fromDataUri decodes url-encoded', () => {
  const d = fromDataUri('data:text/plain,a%20b%26c');
  assert.equal(d.base64, false);
  assert.equal(d.content, 'a b&c');
});

check('fromDataUri handles empty mime (data:,...)', () => {
  const d = fromDataUri('data:,abc');
  assert.equal(d.mime, 'text/plain');
  assert.equal(d.content, 'abc');
});

check('round-trips UTF-8 content through base64', () => {
  const s = 'Héllo 🎉 café';
  const d = fromDataUri(toDataUri(s, { mime: 'text/plain', base64: true }));
  assert.equal(d.content, s);
});

check('round-trips UTF-8 content through url encoding', () => {
  const s = 'naïve — 日本語';
  const d = fromDataUri(toDataUri(s, { mime: 'text/plain' }));
  assert.equal(d.content, s);
});

check('SVG round-trips and preserves the mime', () => {
  const svg = '<svg xmlns="http://www.w3.org/2000/svg"><circle r="5"/></svg>';
  const uri = toDataUri(svg, { mime: 'image/svg+xml' });
  assert.ok(uri.startsWith('data:image/svg+xml,'));
  const d = fromDataUri(uri);
  assert.equal(d.mime, 'image/svg+xml');
  assert.equal(d.content, svg);
});

check('fromDataUri rejects non data URIs', () => {
  assert.throws(() => fromDataUri('https://example.com'), /not a data URI/);
  assert.throws(() => fromDataUri('hello'), /not a data URI/);
});

console.log(`\n${n} checks passed.`);
