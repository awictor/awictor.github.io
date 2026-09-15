// Headless regression tests for JwtSign — JWT base64url + HMAC signing.
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
const { ALGS, b64url, base64urlBytes, signingInput, sign } = globalThis.__t;

let n = 0;
const check = async (name, fn) => { await fn(); n++; console.log('  ok -', name); };

await check('b64url — URL-safe, unpadded', () => {
  assert.equal(b64url('{}'), 'e30');                       // base64 "e30=" -> stripped
  assert.equal(b64url('sub'), 'c3Vi');
  // URL-safe chars: '>>>?' base64 encodes with + and / then mapped to - and _
  assert.equal(b64url('>>>?'), base64urlBytes(new TextEncoder().encode('>>>?')));
  assert.ok(!/[+/=]/.test(b64url('any string with padding!!')));
});

await check('canonical header segment', () => {
  assert.equal(b64url(JSON.stringify({ alg: 'HS256', typ: 'JWT' })),
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9');
});

await check('canonical payload segment', () => {
  assert.equal(b64url(JSON.stringify({ sub: '1234567890', name: 'John Doe', iat: 1516239022 })),
    'eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ');
});

await check('signingInput joins two segments with a dot', () => {
  const si = signingInput({ alg: 'HS256', typ: 'JWT' }, { sub: '1234567890', name: 'John Doe', iat: 1516239022 });
  assert.equal(si,
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ');
  assert.equal(si.split('.').length, 2);
});

await check('sign — matches the canonical jwt.io HS256 vector', async () => {
  const jwt = await sign(
    { alg: 'HS256', typ: 'JWT' },
    { sub: '1234567890', name: 'John Doe', iat: 1516239022 },
    'your-256-bit-secret'
  );
  assert.equal(jwt,
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c');
});

await check('sign — token has three base64url segments', async () => {
  const jwt = await sign({ alg: 'HS256', typ: 'JWT' }, { a: 1 }, 'k');
  const parts = jwt.split('.');
  assert.equal(parts.length, 3);
  parts.forEach(p => assert.match(p, /^[A-Za-z0-9_-]+$/));
});

await check('sign — different secret => different signature', async () => {
  const a = await sign({ alg: 'HS256', typ: 'JWT' }, { a: 1 }, 'secret-a');
  const b = await sign({ alg: 'HS256', typ: 'JWT' }, { a: 1 }, 'secret-b');
  assert.notEqual(a.split('.')[2], b.split('.')[2]);
  assert.equal(a.split('.').slice(0, 2).join('.'), b.split('.').slice(0, 2).join('.')); // header+payload identical
});

await check('sign — HS384 / HS512 produce longer signatures than HS256', async () => {
  const s256 = (await sign({ alg: 'HS256' }, { a: 1 }, 'k')).split('.')[2];
  const s384 = (await sign({ alg: 'HS384' }, { a: 1 }, 'k')).split('.')[2];
  const s512 = (await sign({ alg: 'HS512' }, { a: 1 }, 'k')).split('.')[2];
  assert.ok(s384.length > s256.length);
  assert.ok(s512.length > s384.length);
});

await check('sign — rejects unsupported algorithm', async () => {
  await assert.rejects(() => sign({ alg: 'RS256' }, { a: 1 }, 'k'), /unsupported alg/);
  assert.deepEqual(Object.keys(ALGS).sort(), ['HS256', 'HS384', 'HS512']);
});

console.log(`\n${n} checks passed.`);
