// Headless regression tests for AuthHeader — Basic/Bearer header build & parse.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');

const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)]
  .map(m => m[1]).sort((a, b) => b.length - a.length)[0];

function el(){ return {value:'',textContent:'',innerHTML:'',style:{},className:'',
  appendChild(){},getAttribute(){return null;},setAttribute(){},removeAttribute(){},
  classList:{add(){},remove(){},toggle(){}},
  addEventListener(){},querySelectorAll(){return[];},querySelector(){return null;},closest(){return null;}}; }
globalThis.document = {
  getElementById: () => el(), createElement: () => el(), querySelector: () => el(),
  querySelectorAll: () => [], documentElement: el()
};
globalThis.localStorage = { getItem:()=>null, setItem(){}, removeItem(){} };
globalThis.matchMedia = () => ({ matches:false });
globalThis.window = { matchMedia: globalThis.matchMedia };

eval(js.replace('if(typeof module !== \'undefined\') module.exports =',
  'globalThis.__t =') );
const { b64encodeUtf8, b64decodeUtf8, basicHeader, parseBasic, bearerHeader, curlSnippet } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('b64 encode/decode round-trip incl. UTF-8', () => {
  assert.equal(b64encodeUtf8('user:pass'), 'dXNlcjpwYXNz');
  assert.equal(b64decodeUtf8('dXNlcjpwYXNz'), 'user:pass');
  assert.equal(b64decodeUtf8(b64encodeUtf8('café ☕')), 'café ☕');
});

check('basicHeader — RFC 7617 canonical example', () => {
  assert.equal(basicHeader('Aladdin', 'open sesame'), 'Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==');
});

check('basicHeader — simple', () => {
  assert.equal(basicHeader('user', 'pass'), 'Basic dXNlcjpwYXNz');
});

check('parseBasic — with and without prefix', () => {
  assert.deepEqual(parseBasic('Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ=='), { user: 'Aladdin', pass: 'open sesame' });
  assert.deepEqual(parseBasic('dXNlcjpwYXNz'), { user: 'user', pass: 'pass' });
  assert.deepEqual(parseBasic('basic dXNlcjpwYXNz'), { user: 'user', pass: 'pass' }); // case-insensitive scheme
});

check('parseBasic — password may contain colons (split on first)', () => {
  const h = basicHeader('u', 'a:b:c');
  assert.deepEqual(parseBasic(h), { user: 'u', pass: 'a:b:c' });
});

check('round-trip: basicHeader -> parseBasic (unicode)', () => {
  const h = basicHeader('café', 'pä$$w:rd');
  assert.deepEqual(parseBasic(h), { user: 'café', pass: 'pä$$w:rd' });
});

check('parseBasic — invalid input -> null', () => {
  assert.equal(parseBasic('Basic bm9jb2xvbg=='), null); // decodes to "nocolon", no colon
  assert.equal(parseBasic(''), null);
});

check('bearerHeader', () => {
  assert.equal(bearerHeader('abc.def.ghi'), 'Bearer abc.def.ghi');
  assert.equal(bearerHeader('  tok  '), 'Bearer tok');
});

check('curlSnippet', () => {
  assert.equal(curlSnippet('https://x.com', 'Basic abc'), 'curl -H "Authorization: Basic abc" https://x.com');
  assert.equal(curlSnippet('', 'Bearer t'), 'curl -H "Authorization: Bearer t" https://api.example.com');
});

console.log(`\n${n} checks passed.`);
