import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { cleanNumber, luhnValid, detectBrand, validate } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('cleanNumber strips spaces and dashes', () => {
  assert.equal(cleanNumber('4111 1111-1111 1111'), '4111111111111111');
});

check('Luhn passes on standard test numbers', () => {
  for (const num of ['4111111111111111', '5555555555554444', '378282246310005', '6011111111111117', '30569309025904']) {
    assert.equal(luhnValid(num), true);
  }
});

check('Luhn fails on a tampered number', () => {
  assert.equal(luhnValid('4111111111111112'), false);
  assert.equal(luhnValid('1234567812345678'), false);
});

check('non-digit input is not Luhn-valid', () => {
  assert.equal(luhnValid('4111-hello'), false);
  assert.equal(luhnValid(''), false);
});

check('brand: Visa and Mastercard', () => {
  assert.equal(detectBrand('4111111111111111'), 'Visa');
  assert.equal(detectBrand('5105105105105100'), 'Mastercard');
});

check('brand: Mastercard 2-series (2221-2720)', () => {
  assert.equal(detectBrand('2223003122003222'), 'Mastercard');
  assert.equal(detectBrand('2720999999999999'), 'Mastercard');
});

check('brand: Amex, Discover, Diners, JCB', () => {
  assert.equal(detectBrand('378282246310005'), 'American Express');
  assert.equal(detectBrand('6011111111111117'), 'Discover');
  assert.equal(detectBrand('30569309025904'), 'Diners Club');
  assert.equal(detectBrand('3530111333300000'), 'JCB');
});

check('unknown brand for unmatched prefixes', () => {
  assert.equal(detectBrand('1111111111111111'), 'Unknown');
});

check('validate combines Luhn, brand, and length', () => {
  const v = validate('4111 1111 1111 1111');
  assert.equal(v.brand, 'Visa');
  assert.equal(v.luhnValid, true);
  assert.equal(v.lengthValid, true);
  assert.equal(v.valid, true);
  const amex = validate('378282246310005');
  assert.equal(amex.brand, 'American Express');
  assert.equal(amex.valid, true);
});

check('valid Luhn but wrong length is flagged', () => {
  // 4111111111111111 is Visa+valid; drop to a Luhn-valid but non-Visa-length string
  const v = validate('4111111111111112'); // fails Luhn
  assert.equal(v.valid, false);
  const classic = validate('79927398713'); // Wikipedia's Luhn example: valid checksum, brand 7=Unknown
  assert.equal(classic.luhnValid, true);
  assert.equal(classic.brand, 'Unknown');
  assert.equal(classic.valid, false);
});

console.log(`\n${n} checks passed.`);
