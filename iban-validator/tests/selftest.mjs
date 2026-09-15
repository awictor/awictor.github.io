// Headless regression tests for IbanCheck — ISO 13616 mod-97 IBAN validation.
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
const { normalizeIban, mod97, ibanToCheckString, isValidIban, formatIban, ibanInfo } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('normalizeIban — uppercase, strip spaces', () => {
  assert.equal(normalizeIban('gb82 west 1234'), 'GB82WEST1234');
  assert.equal(normalizeIban('  De89  '), 'DE89');
});

check('mod97 — computes remainder of a numeric string', () => {
  assert.equal(mod97('0'), 0);
  assert.equal(mod97('97'), 0);
  assert.equal(mod97('98'), 1);
  assert.equal(mod97('9799'), 2);
});

check('isValidIban — canonical valid IBANs', () => {
  assert.equal(isValidIban('GB82 WEST 1234 5698 7654 32'), true);
  assert.equal(isValidIban('DE89 3704 0044 0532 0130 00'), true);
  assert.equal(isValidIban('FR14 2004 1010 0505 0001 3M02 606'), true);
  assert.equal(isValidIban('NL91ABNA0417164300'), true);
});

check('isValidIban — rejects bad checksum / format', () => {
  assert.equal(isValidIban('GB82 WEST 1234 5698 7654 33'), false); // last digit changed
  assert.equal(isValidIban('GB00 WEST 1234 5698 7654 32'), false); // bad check digits
  assert.equal(isValidIban('ZZ'), false);                          // too short
  assert.equal(isValidIban('1234567890'), false);                  // no country
  assert.equal(isValidIban(''), false);
});

check('the rearranged numeric form of a valid IBAN ≡ 1 mod 97', () => {
  assert.equal(mod97(ibanToCheckString('GB82WEST12345698765432')), 1);
  assert.equal(mod97(ibanToCheckString('DE89370400440532013000')), 1);
});

check('ibanToCheckString — moves first 4 chars to end and maps letters', () => {
  // 'AB0000' -> rearrange slice(4)+slice(0,4) = '00'+'AB00' = '00AB00' -> A=10,B=11 -> '00'+'10'+'11'+'00'
  assert.equal(ibanToCheckString('AB0000'), '00101100');
});

check('formatIban — groups of four', () => {
  assert.equal(formatIban('GB82WEST12345698765432'), 'GB82 WEST 1234 5698 7654 32');
  assert.equal(formatIban('nl91abna0417164300'), 'NL91 ABNA 0417 1643 00');
});

check('ibanInfo — country, length, check digits', () => {
  const info = ibanInfo('GB82 WEST 1234 5698 7654 32');
  assert.equal(info.country, 'GB');
  assert.equal(info.countryName, 'United Kingdom');
  assert.equal(info.expectedLength, 22);
  assert.equal(info.length, 22);
  assert.equal(info.lengthOk, true);
  assert.equal(info.checkDigits, '82');
  assert.equal(info.bban, 'WEST12345698765432');
  assert.equal(info.valid, true);
});

check('ibanInfo — unknown country -> null metadata but still checks mod97', () => {
  const info = ibanInfo('XX00');
  assert.equal(info.countryName, null);
  assert.equal(info.expectedLength, null);
  assert.equal(info.lengthOk, null);
  assert.equal(info.valid, false);
});

console.log(`\n${n} checks passed.`);
