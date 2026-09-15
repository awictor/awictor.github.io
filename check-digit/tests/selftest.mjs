// Headless regression tests for CheckDigit pure functions (real barcode vectors).
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
const { ean13CheckDigit, ean13Valid, upcaCheckDigit, upcaValid,
        isbn13CheckDigit, isbn13Valid, isbn10CheckChar, isbn10Valid } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('EAN-13 check digit (5901234123457)', () => {
  assert.equal(ean13CheckDigit('590123412345'), 7);
  assert.equal(ean13Valid('5901234123457'), true);
  assert.equal(ean13Valid('5901234123458'), false);
});

check('EAN-13 guards', () => {
  assert.equal(ean13CheckDigit('59012341234'), null);   // only 11 digits
  assert.equal(ean13CheckDigit('59012341234a'), null);
  assert.equal(ean13Valid('123'), false);
});

check('UPC-A check digit (036000291452)', () => {
  assert.equal(upcaCheckDigit('03600029145'), 2);
  assert.equal(upcaValid('036000291452'), true);
  assert.equal(upcaValid('036000291451'), false);
});

check('UPC-A round-trip: computed check makes a valid code', () => {
  const c = upcaCheckDigit('04900000634');   // = 6
  assert.equal(c, 6);
  assert.equal(upcaValid('04900000634' + c), true);
});

check('ISBN-13 (9780306406157) uses EAN-13 algorithm', () => {
  assert.equal(isbn13CheckDigit('978030640615'), 7);
  assert.equal(isbn13Valid('9780306406157'), true);
  assert.equal(isbn13Valid('9780306406158'), false);
});

check('ISBN-10 numeric check (0306406152)', () => {
  assert.equal(isbn10CheckChar('030640615'), '2');
  assert.equal(isbn10Valid('0306406152'), true);
  assert.equal(isbn10Valid('0306406153'), false);
});

check('ISBN-10 with X check digit', () => {
  // 097522980X is a valid ISBN-10 ending in X
  assert.equal(isbn10CheckChar('097522980'), 'X');
  assert.equal(isbn10Valid('097522980X'), true);
  assert.equal(isbn10Valid('097522980x'), true);   // lowercase accepted
  assert.equal(isbn10Valid('0975229801'), false);
});

check('ISBN-10 guards', () => {
  assert.equal(isbn10CheckChar('12345678'), null);  // 8 digits
  assert.equal(isbn10Valid('123456789'), false);    // 9 chars
  assert.equal(isbn10Valid('12345X6789'), false);   // X not at end
});

check('classic Dune ISBN-13 0441172717 -> 13 conversion sanity', () => {
  // 978 + first 9 of ISBN-10, recompute EAN check
  assert.equal(isbn13CheckDigit('978044117271'), 9);
  assert.equal(isbn13Valid('9780441172719'), true);
});

console.log(`\n${n} checks passed.`);
