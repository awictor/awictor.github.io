// Headless regression tests for SriGen (async SRI hashing vs known digests).
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
  addEventListener(){},querySelectorAll(){return[];},closest(){return null;}}; }
globalThis.document = {
  getElementById: () => el(), createElement: () => el(),
  querySelectorAll: () => [], documentElement: el()
};
globalThis.localStorage = { getItem:()=>null, setItem(){}, removeItem(){} };
globalThis.matchMedia = () => ({ matches:false });
globalThis.window = { matchMedia: globalThis.matchMedia };

eval(js.replace('if(typeof module !== \'undefined\') module.exports =',
  'globalThis.__t =') );
const { bytesToBase64, sriHash, scriptTag } = globalThis.__t;

let n = 0;
async function check(name, fn){ await fn(); n++; console.log('  ok -', name); }

await check('bytesToBase64 known value', () => {
  assert.equal(bytesToBase64(new Uint8Array([72, 105])), 'SGk=');   // "Hi"
});

await check('SRI SHA-256 of empty string (known base64)', async () => {
  assert.equal(await sriHash('', 'sha256'),
    'sha256-47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=');
});

await check('SRI SHA-256 of "abc" (known base64)', async () => {
  assert.equal(await sriHash('abc', 'sha256'),
    'sha256-ungWv48Bz+pBQUDeXa4iI7ADYaOWF3qctBD/YfIAFa0=');
});

await check('SRI prefixes with the algorithm name', async () => {
  assert.ok((await sriHash('x', 'sha256')).startsWith('sha256-'));
  assert.ok((await sriHash('x', 'sha384')).startsWith('sha384-'));
  assert.ok((await sriHash('x', 'sha512')).startsWith('sha512-'));
});

await check('base64 payload length matches digest size', async () => {
  const b64len = s => s.split('-')[1].length;
  assert.equal(b64len(await sriHash('data', 'sha256')), 44);  // 32 bytes -> 44 chars
  assert.equal(b64len(await sriHash('data', 'sha384')), 64);  // 48 bytes -> 64 chars
  assert.equal(b64len(await sriHash('data', 'sha512')), 88);  // 64 bytes -> 88 chars
});

await check('invalid algorithm returns null', async () => {
  assert.equal(await sriHash('x', 'md5'), null);
  assert.equal(await sriHash('x', 'sha1'), null);
});

await check('default algorithm is sha384', async () => {
  assert.ok((await sriHash('x')).startsWith('sha384-'));
});

await check('scriptTag embeds src, integrity, crossorigin', () => {
  const tag = scriptTag('https://cdn.example.com/a.js', 'sha384-abc');
  assert.ok(tag.includes('src="https://cdn.example.com/a.js"'));
  assert.ok(tag.includes('integrity="sha384-abc"'));
  assert.ok(tag.includes('crossorigin="anonymous"'));
});

console.log(`\n${n} checks passed.`);
