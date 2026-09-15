// Headless regression tests for Uuid7 — UUIDv7/v4 generation & inspection.
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
const { defaultRand, bytesToUuid, uuidV7, uuidV4, isValidUuid, parseUuid } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const zeros = () => (nn => new Array(nn).fill(0))();
const zeroRand = (nn) => new Array(nn).fill(0);
const ffRand = (nn) => new Array(nn).fill(0xff);

check('uuidV7 — all-zero clock & random -> canonical bit pattern', () => {
  assert.equal(uuidV7(0, zeroRand), '00000000-0000-7000-8000-000000000000');
});

check('uuidV7 — version nibble is 7, variant is 8-b', () => {
  const u = uuidV7(Date.now(), ffRand);
  assert.equal(u[14], '7');                    // version position
  assert.ok(/[89ab]/.test(u[19]));             // variant position
  assert.ok(isValidUuid(u));
});

check('uuidV7 — timestamp round-trips through parseUuid', () => {
  const ms = 1700000000000;
  const u = uuidV7(ms, zeroRand);
  const info = parseUuid(u);
  assert.equal(info.version, 7);
  assert.equal(info.timestampMs, ms);
  assert.equal(info.iso, new Date(ms).toISOString());
});

check('uuidV7 — high 48 bits are the millisecond timestamp', () => {
  const ms = 0x0123456789ab;
  const u = uuidV7(ms, zeroRand);
  assert.equal(u.replace(/-/g, '').slice(0, 12), '0123456789ab');
});

check('uuidV7 — lexicographic order tracks time', () => {
  const a = uuidV7(1000, zeroRand);
  const b = uuidV7(2000, zeroRand);
  const c = uuidV7(1500, zeroRand);
  assert.ok(a < b);
  assert.ok(a < c && c < b);
});

check('uuidV4 — version 4, valid, variant correct', () => {
  const u = uuidV4(ffRand);
  assert.equal(u[14], '4');
  assert.ok(/[89ab]/.test(u[19]));
  assert.equal(parseUuid(u).version, 4);
  assert.ok(isValidUuid(u));
});

check('bytesToUuid — formats 16 bytes with dashes', () => {
  const b = []; for(let i = 0; i < 16; i++) b.push(i);
  assert.equal(bytesToUuid(b), '00010203-0405-0607-0809-0a0b0c0d0e0f');
});

check('isValidUuid', () => {
  assert.ok(isValidUuid('00000000-0000-7000-8000-000000000000'));
  assert.ok(isValidUuid('123E4567-E89B-12D3-A456-426614174000')); // uppercase ok
  assert.ok(!isValidUuid('not-a-uuid'));
  assert.ok(!isValidUuid('00000000000070008000000000000000')); // missing dashes
  assert.ok(!isValidUuid(''));
});

check('parseUuid — variant detection', () => {
  assert.equal(parseUuid('00000000-0000-4000-8000-000000000000').variant, 'RFC 4122'); // 8
  assert.equal(parseUuid('00000000-0000-4000-b000-000000000000').variant, 'RFC 4122'); // b
  assert.equal(parseUuid('00000000-0000-4000-0000-000000000000').variant, 'NCS (legacy)'); // high bit 0
  assert.equal(parseUuid('00000000-0000-4000-c000-000000000000').variant, 'Microsoft'); // 110x
  assert.equal(parseUuid('bad'), null);
});

check('parseUuid — non-v7 has no timestamp', () => {
  const info = parseUuid(uuidV4(zeroRand));
  assert.equal(info.timestampMs, null);
  assert.equal(info.iso, null);
});

check('defaultRand — returns n bytes in range', () => {
  const r = defaultRand(16);
  assert.equal(r.length, 16);
  assert.ok(r.every(x => x >= 0 && x <= 255 && Number.isInteger(x)));
});

console.log(`\n${n} checks passed.`);
