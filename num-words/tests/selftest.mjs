// Headless regression tests for NumWords pure functions.
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
try { globalThis.navigator = { clipboard: { writeText(){} } }; }
catch { Object.defineProperty(globalThis, 'navigator',
  { value: { clipboard: { writeText(){} } }, configurable: true }); }

eval(js.replace('if(typeof module !== \'undefined\') module.exports =',
  'globalThis.__t =') );
const { threeDigitsToWords, integerToWords, numberToWords, currencyToWords, cap } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('threeDigitsToWords covers 0..999', () => {
  assert.equal(threeDigitsToWords(0), '');
  assert.equal(threeDigitsToWords(7), 'seven');
  assert.equal(threeDigitsToWords(19), 'nineteen');
  assert.equal(threeDigitsToWords(20), 'twenty');
  assert.equal(threeDigitsToWords(21), 'twenty-one');
  assert.equal(threeDigitsToWords(100), 'one hundred');
  assert.equal(threeDigitsToWords(215), 'two hundred fifteen');
  assert.equal(threeDigitsToWords(999), 'nine hundred ninety-nine');
});

check('integerToWords scales correctly', () => {
  assert.equal(integerToWords(0), 'zero');
  assert.equal(integerToWords(1000), 'one thousand');
  assert.equal(integerToWords(1234), 'one thousand two hundred thirty-four');
  assert.equal(integerToWords(1000000), 'one million');
  assert.equal(integerToWords(1000000000), 'one billion');
  assert.equal(integerToWords(2001), 'two thousand one');
  assert.equal(integerToWords(1000001), 'one million one');
});

check('integerToWords ignores sign (uses abs)', () => {
  assert.equal(integerToWords(-42), 'forty-two');
});

check('numberToWords: integers, negatives, commas', () => {
  assert.equal(numberToWords('0'), 'zero');
  assert.equal(numberToWords('42'), 'forty-two');
  assert.equal(numberToWords('1,234'), 'one thousand two hundred thirty-four');
  assert.equal(numberToWords('-7'), 'negative seven');
});

check('numberToWords: decimals read digit by digit', () => {
  assert.equal(numberToWords('3.14'), 'three point one four');
  assert.equal(numberToWords('0.5'), 'zero point five');
  assert.equal(numberToWords('12.06'), 'twelve point zero six');
});

check('numberToWords rejects garbage', () => {
  assert.equal(numberToWords(''), null);
  assert.equal(numberToWords('abc'), null);
  assert.equal(numberToWords('1.2.3'), null);
  assert.equal(numberToWords('$5'), null);
});

check('currencyToWords: check-writing format', () => {
  assert.equal(currencyToWords('1234.56'),
    'One thousand two hundred thirty-four dollars and 56/100');
  assert.equal(currencyToWords('1.00'), 'One dollar and 00/100');
  assert.equal(currencyToWords('0'), 'Zero dollars and 00/100');
  assert.equal(currencyToWords('$2,000.05'), 'Two thousand dollars and 05/100');
  assert.equal(currencyToWords('-3.50'), 'Negative Three dollars and 50/100');
});

check('currencyToWords rounds cents', () => {
  assert.equal(currencyToWords('9.999'), 'Ten dollars and 00/100');
  assert.equal(currencyToWords('0.005'), 'Zero dollars and 01/100');
});

check('cap capitalizes first letter', () => {
  assert.equal(cap('hello'), 'Hello');
  assert.equal(cap('zero'), 'Zero');
});

console.log(`\n${n} checks passed.`);
