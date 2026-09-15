// Headless regression tests for CipherNote (async AES-GCM round-trips).
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
const { bytesToBase64, base64ToBytes, encrypt, decrypt } = globalThis.__t;

let n = 0;
async function check(name, fn){ await fn(); n++; console.log('  ok -', name); }

await check('bytesToBase64 / base64ToBytes round-trip', () => {
  assert.equal(bytesToBase64(new Uint8Array([72, 105])), 'SGk=');       // "Hi"
  assert.deepEqual([...base64ToBytes('SGk=')], [72, 105]);
  const rnd = new Uint8Array([0, 1, 2, 250, 255, 128, 64]);
  assert.deepEqual([...base64ToBytes(bytesToBase64(rnd))], [...rnd]);
});

await check('encrypt -> decrypt returns original text', async () => {
  const secret = 'Attack at dawn 🌅 — meet by the old oak.';
  const blob = await encrypt(secret, 'correct horse battery staple');
  assert.equal(typeof blob, 'string');
  const back = await decrypt(blob, 'correct horse battery staple');
  assert.equal(back, secret);
});

await check('empty string encrypts and decrypts', async () => {
  const blob = await encrypt('', 'pw');
  assert.equal(await decrypt(blob, 'pw'), '');
});

await check('wrong passphrase fails to decrypt (returns null)', async () => {
  const blob = await encrypt('top secret', 'right-pass');
  assert.equal(await decrypt(blob, 'wrong-pass'), null);
});

await check('tampered ciphertext fails authentication', async () => {
  const blob = await encrypt('integrity matters', 'pw');
  const bytes = base64ToBytes(blob);
  bytes[bytes.length - 1] ^= 0xff;                 // flip last byte
  assert.equal(await decrypt(bytesToBase64(bytes), 'pw'), null);
});

await check('garbage / too-short input returns null, not throw', async () => {
  assert.equal(await decrypt('not-valid-base64!!', 'pw'), null);
  assert.equal(await decrypt('SGk=', 'pw'), null);   // valid b64 but < 29 bytes
});

await check('two encryptions of same text differ (random salt/iv)', async () => {
  const a = await encrypt('same', 'pw');
  const b = await encrypt('same', 'pw');
  assert.notEqual(a, b);
  assert.equal(await decrypt(a, 'pw'), 'same');
  assert.equal(await decrypt(b, 'pw'), 'same');
});

console.log(`\n${n} checks passed.`);
