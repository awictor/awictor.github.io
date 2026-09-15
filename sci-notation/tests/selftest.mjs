// Headless regression tests for SciNotation pure functions.
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
const { fromString, toScientific, roundSig, toEngineering, sigFigCount } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('fromString parses decimals and scientific', () => {
  assert.equal(fromString('1234'), 1234);
  assert.equal(fromString('1.2e-3'), 0.0012);
  assert.equal(fromString('  -5.5 '), -5.5);
  assert.equal(fromString('abc'), null);
  assert.equal(fromString(''), null);
});

check('toScientific with and without dp', () => {
  assert.equal(toScientific(1234, 3), '1.234e+3');
  assert.equal(toScientific(0.0012, 2), '1.20e-3');
  assert.equal(toScientific(1234), '1.234e+3');
});

check('roundSig to N significant figures', () => {
  assert.equal(roundSig(3.14159, 3), 3.14);
  assert.equal(roundSig(1234, 2), 1200);
  assert.equal(roundSig(0.0001234, 2), 0.00012);
  assert.equal(roundSig(0, 3), 0);
  assert.equal(roundSig(5, 0), null);
});

check('toEngineering uses exponents that are multiples of 3', () => {
  const a = toEngineering(12345, 3);
  assert.equal(a.exponent, 3);
  assert.equal(a.str, '12.345e+3');
  const b = toEngineering(0.0000123, 2);
  assert.equal(b.exponent, -6);
  assert.equal(b.str, '12.3e-6');   // Number() drops the trailing zero from toFixed
  const c = toEngineering(0, 2);
  assert.equal(c.str, '0e+0');
  assert.equal(toEngineering(999, 3).exponent, 0);
});

check('sigFigCount standard rules', () => {
  assert.equal(sigFigCount('1234'), 4);
  assert.equal(sigFigCount('1200'), 2);       // bare integer trailing zeros not significant
  assert.equal(sigFigCount('1200.'), 4);      // decimal point makes them significant
  assert.equal(sigFigCount('0.00120'), 3);    // leading zeros not, trailing after decimal yes
  assert.equal(sigFigCount('100.0'), 4);
  assert.equal(sigFigCount('5.00'), 3);
  assert.equal(sigFigCount('0.5'), 1);
  assert.equal(sigFigCount('-42.0'), 3);
});

check('sigFigCount with scientific and zero', () => {
  assert.equal(sigFigCount('1.23e5'), 3);
  assert.equal(sigFigCount('0'), 1);
  assert.equal(sigFigCount('0.0'), 1);
  assert.equal(sigFigCount('nope'), null);
});

check('round-trip scientific parses back to number', () => {
  assert.equal(fromString(toScientific(6.022e23, 4)), 6.022e23);
});

check('roundSig then compare for a known value', () => {
  assert.equal(roundSig(2.71828, 3), 2.72);
  assert.equal(roundSig(9.99, 1), 10);
});

console.log(`\n${n} checks passed.`);
