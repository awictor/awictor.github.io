// Headless regression tests for Bitwise — 32-bit bitwise ops & radix formatting.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');

const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)]
  .map(m => m[1]).sort((a, b) => b.length - a.length)[0];

function el(){ return {value:'',textContent:'',innerHTML:'',style:{},className:'',parentNode:{style:{}},
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
const { parseIntAny, op, toUnsigned, toBin, groupBits, toHex, toOct } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('parseIntAny — decimal / hex / binary / signs', () => {
  assert.equal(parseIntAny('42'), 42);
  assert.equal(parseIntAny('0xFF'), 255);
  assert.equal(parseIntAny('0xff'), 255);
  assert.equal(parseIntAny('0b1010'), 10);
  assert.equal(parseIntAny('-5'), -5);
  assert.equal(parseIntAny('+7'), 7);
  assert.equal(parseIntAny('  0x10  '), 16);
});

check('parseIntAny — rejects garbage', () => {
  assert.ok(Number.isNaN(parseIntAny('zz')));
  assert.ok(Number.isNaN(parseIntAny('0xG')));
  assert.ok(Number.isNaN(parseIntAny('0b12')));
  assert.ok(Number.isNaN(parseIntAny('')));
  assert.ok(Number.isNaN(parseIntAny('12.5')));
});

check('op — AND / OR / XOR', () => {
  assert.equal(op(12, 'and', 10), 8);
  assert.equal(op(12, 'or', 10), 14);
  assert.equal(op(12, 'xor', 10), 6);
  assert.equal(op(0xF0, 'or', 0x0F), 255);
  assert.equal(op(0xFF, 'and', 0x0F), 15);
});

check('op — NOT (two\'s complement)', () => {
  assert.equal(op(5, 'not'), -6);
  assert.equal(op(0, 'not'), -1);
  assert.equal(op(-1, 'not'), 0);
});

check('op — shifts', () => {
  assert.equal(op(1, 'shl', 4), 16);
  assert.equal(op(0xFF, 'shl', 8), 0xFF00);
  assert.equal(op(-8, 'shr', 1), -4);       // arithmetic keeps sign
  assert.equal(op(256, 'shr', 4), 16);
  assert.equal(op(-1, 'ushr', 28), 15);     // logical -> unsigned
  assert.equal(op(-1, 'ushr', 0), 4294967295);
});

check('op — shift amount masked to 0-31', () => {
  assert.equal(op(1, 'shl', 32), 1);   // 32 & 31 = 0
  assert.equal(op(1, 'shl', 33), 2);   // 33 & 31 = 1
});

check('toBin — 32-bit two\'s complement', () => {
  assert.equal(toBin(10), '00000000000000000000000000001010');
  assert.equal(toBin(-1), '1'.repeat(32));
  assert.equal(toBin(0).length, 32);
});

check('groupBits — bytes separated by spaces', () => {
  assert.equal(groupBits(toBin(10)), '00000000 00000000 00000000 00001010');
  assert.equal(groupBits('11110000', 4), '1111 0000');
});

check('toHex / toOct / toUnsigned', () => {
  assert.equal(toHex(255), '0x000000FF');
  assert.equal(toHex(-1), '0xFFFFFFFF');
  assert.equal(toOct(8), '0o10');
  assert.equal(toUnsigned(-1), 4294967295);
  assert.equal(toUnsigned(5), 5);
});

check('end-to-end: (0xF0 & 0x0F) = 0', () => {
  const r = op(parseIntAny('0xF0'), 'and', parseIntAny('0x0F'));
  assert.equal(r, 0);
  assert.equal(toHex(r), '0x00000000');
});

console.log(`\n${n} checks passed.`);
