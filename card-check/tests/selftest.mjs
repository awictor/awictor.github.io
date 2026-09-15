// Headless regression tests for CardCheck — brand detection + Luhn.
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
const { digitsOnly, luhnValid, cardBrand, formatCard, maskCard, analyze } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('luhnValid — canonical test numbers pass', () => {
  ['4111111111111111', '5555555555554444', '378282246310005', '6011111111111117',
   '30569309025904', '3530111333300000'].forEach(c => assert.equal(luhnValid(c), true, c));
});

check('luhnValid — a tampered number fails', () => {
  assert.equal(luhnValid('4111111111111112'), false);
  assert.equal(luhnValid('1234567890123456'), false);
  assert.equal(luhnValid('1'), false);
});

check('luhnValid — ignores spaces/dashes', () => {
  assert.equal(luhnValid('4111 1111 1111 1111'), true);
  assert.equal(luhnValid('4111-1111-1111-1111'), true);
});

check('cardBrand — major brands', () => {
  assert.equal(cardBrand('4111111111111111'), 'Visa');
  assert.equal(cardBrand('5555555555554444'), 'Mastercard');
  assert.equal(cardBrand('2221000000000009'), 'Mastercard'); // new 2-series range
  assert.equal(cardBrand('378282246310005'), 'Amex');
  assert.equal(cardBrand('6011111111111117'), 'Discover');
  assert.equal(cardBrand('30569309025904'), 'Diners Club');
  assert.equal(cardBrand('3530111333300000'), 'JCB');
  assert.equal(cardBrand('6200000000000005'), 'UnionPay');
  assert.equal(cardBrand('1234000000000000'), null);
});

check('cardBrand — Amex 34/37 not confused with Diners/JCB', () => {
  assert.equal(cardBrand('371449635398431'), 'Amex');
  assert.equal(cardBrand('36000000000008'), 'Diners Club');
});

check('formatCard — groups of 4, Amex 4-6-5', () => {
  assert.equal(formatCard('4111111111111111'), '4111 1111 1111 1111');
  assert.equal(formatCard('378282246310005'), '3782 822463 10005');
});

check('maskCard — keeps last 4', () => {
  assert.equal(maskCard('4111111111111111'), '•'.repeat(4) + ' ' + '•'.repeat(4) + ' ' + '•'.repeat(4) + ' 1111');
  assert.equal(maskCard('123'), '123');
});

check('analyze — full breakdown', () => {
  const a = analyze('4111 1111 1111 1111');
  assert.equal(a.brand, 'Visa');
  assert.equal(a.luhn, true);
  assert.equal(a.digits, 16);
  assert.equal(a.iin, '411111');
  assert.equal(a.formatted, '4111 1111 1111 1111');
});

check('empty input', () => {
  const a = analyze('');
  assert.equal(a.digits, 0);
  assert.equal(a.brand, null);
  assert.equal(a.luhn, false);
});

console.log(`\n${n} checks passed.`);
