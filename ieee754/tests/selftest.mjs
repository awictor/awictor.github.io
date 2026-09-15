import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { bitsOf, classify } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('1.0 as a double is 0x3ff0000000000000', () => {
  const b = bitsOf(1, 64);
  assert.equal(b.hex, '3ff0000000000000');
  assert.equal(b.sign, '0');
  assert.equal(b.exponent, '01111111111');       // 1023
  assert.equal(b.mantissa, '0'.repeat(52));
  assert.equal(b.expRaw, 1023);
  assert.equal(b.expValue, 0);
  assert.equal(b.stored, 1);
});

check('1.0 as a float32 is 0x3f800000', () => {
  const b = bitsOf(1, 32);
  assert.equal(b.hex, '3f800000');
  assert.equal(b.exponent, '01111111');           // 127
  assert.equal(b.bias, 127);
  assert.equal(b.mantissa.length, 23);
});

check('sign bit for negatives (-2.0 double = 0xc000000000000000)', () => {
  const b = bitsOf(-2, 64);
  assert.equal(b.sign, '1');
  assert.equal(b.hex, 'c000000000000000');
  assert.equal(b.expValue, 1);                     // 2 = 1.0 × 2^1
});

check('0.5 float32 sets exponent value to -1', () => {
  const b = bitsOf(0.5, 32);
  assert.equal(b.hex, '3f000000');
  assert.equal(b.expValue, -1);
});

check('0.1 is not exactly representable (double 0x3fb999999999999a)', () => {
  assert.equal(bitsOf(0.1, 64).hex, '3fb999999999999a');
});

check('bias values', () => {
  assert.equal(bitsOf(0, 32).bias, 127);
  assert.equal(bitsOf(0, 64).bias, 1023);
});

check('classify: zero, infinity, nan', () => {
  assert.equal(classify(0, 64), 'zero');
  assert.equal(classify(Infinity, 64), 'infinity');
  assert.equal(bitsOf(Infinity, 64).hex, '7ff0000000000000');
  assert.equal(classify(NaN, 64), 'nan');
});

check('classify: subnormal (Number.MIN_VALUE) vs normal', () => {
  assert.equal(classify(5e-324, 64), 'subnormal');  // smallest positive double
  assert.equal(classify(1, 64), 'normal');
});

check('representable values round-trip exactly', () => {
  for(const v of [1, 0.5, -2, 256, 0.25]){
    assert.equal(bitsOf(v, 64).stored, v);
    assert.equal(bitsOf(v, 32).stored, v);
  }
});

check('float32 loses precision on 0.1 but double holds JS value', () => {
  const f32 = bitsOf(0.1, 32);
  assert.notEqual(f32.stored, 0.1);                // rounded when narrowed to 32-bit
  assert.ok(Math.abs(f32.stored - 0.1) < 1e-7);
  assert.equal(bitsOf(0.1, 64).stored, 0.1);       // JS number IS this double
  assert.throws(() => bitsOf(1, 16), /bits must be/);
});

console.log(`\n${n} checks passed.`);
