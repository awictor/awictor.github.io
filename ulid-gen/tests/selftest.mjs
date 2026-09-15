// Headless regression tests for UlidGen pure functions.
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
  addEventListener(){},querySelectorAll(){return[];}}; }
globalThis.document = {
  getElementById: () => el(), createElement: () => el(),
  querySelectorAll: () => [], documentElement: el()
};
globalThis.localStorage = { getItem:()=>null, setItem(){}, removeItem(){} };
globalThis.matchMedia = () => ({ matches:false });
globalThis.window = { matchMedia: globalThis.matchMedia };

eval(js.replace('if(typeof module !== \'undefined\') module.exports =',
  'globalThis.__t =') );
const { ENC, encodeTime, encodeRandom, ulid, decodeTime, isValid } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const zeros = () => 0;

check('Crockford alphabet excludes I L O U and has 32 chars', () => {
  assert.equal(ENC.length, 32);
  ['I','L','O','U'].forEach(c => assert.ok(!ENC.includes(c)));
});

check('encodeTime basics', () => {
  assert.equal(encodeTime(0, 10), '0000000000');
  assert.equal(encodeTime(1, 10), '0000000001');
  assert.equal(encodeTime(32, 10), '0000000010');
});

check('encodeTime matches canonical ULID spec vector', () => {
  // spec example: 1469918176385 -> "01ARYZ6S41"
  assert.equal(encodeTime(1469918176385, 10), '01ARYZ6S41');
});

check('decodeTime is inverse of encodeTime', () => {
  [0, 1, 32, 1000, 1469918176385, 1700000000000, 281474976710655].forEach(ms => {
    assert.equal(decodeTime(encodeTime(ms, 10) + '0000000000000000'), ms);
  });
});

check('decodeTime of a full ULID', () => {
  const id = encodeTime(1469918176385, 10) + encodeRandom(16, zeros);
  assert.equal(decodeTime(id), 1469918176385);
  assert.equal(decodeTime('01ARYZ6S41' + '0'.repeat(16)), 1469918176385);
});

check('encodeRandom respects rng and length', () => {
  assert.equal(encodeRandom(16, zeros), '0000000000000000');
  assert.equal(encodeRandom(16, () => 0.999999), 'Z'.repeat(16));   // index 31 = Z
  assert.equal(encodeRandom(5, zeros).length, 5);
});

check('ulid is 26 chars and time-decodable', () => {
  const id = ulid(1469918176385, zeros);
  assert.equal(id.length, 26);
  assert.equal(id.slice(0, 10), '01ARYZ6S41');
  assert.equal(decodeTime(id), 1469918176385);
});

check('ulids are lexicographically sortable by time', () => {
  const a = ulid(1000, zeros);
  const b = ulid(2000, zeros);
  assert.ok(b > a);
  const c = ulid(1000, () => 0.999999);   // same time, larger random
  assert.ok(c > a);
});

check('isValid', () => {
  assert.equal(isValid(ulid(1469918176385, zeros)), true);
  assert.equal(isValid('01arYz6s41' + '0'.repeat(16)), true);   // lowercase ok
  assert.equal(isValid('too-short'), false);
  assert.equal(isValid('I'.repeat(26)), false);                 // I not allowed
  assert.equal(isValid(12345), false);
});

console.log(`\n${n} checks passed.`);
