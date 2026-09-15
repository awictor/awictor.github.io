import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { WIDTHS, encode, decode, parsePattern } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('positive value encodes as itself', () => {
  const e = encode(5, 8);
  assert.equal(e.binary, '00000101');
  assert.equal(e.hex, '05');
  assert.equal(e.unsigned, 5n);
});

check('-1 is all ones', () => {
  assert.equal(encode(-1, 8).hex, 'ff');
  assert.equal(encode(-1, 16).hex, 'ffff');
  assert.equal(encode(-1, 32).hex, 'ffffffff');
  assert.equal(encode(-1, 64).hex, 'ffffffffffffffff');
});

check('signed min/max at 8-bit', () => {
  assert.equal(encode(-128, 8).binary, '10000000');
  assert.equal(encode(127, 8).binary, '01111111');
});

check('-42 at 8-bit = 0xD6', () => {
  assert.equal(encode(-42, 8).hex, 'd6');
  assert.equal(encode(-42, 8).unsigned, 214n);
});

check('decode interprets the pattern as signed', () => {
  assert.equal(decode(255n, 8), -1n);
  assert.equal(decode(128n, 8), -128n);
  assert.equal(decode(127n, 8), 127n);
  assert.equal(decode(0n, 8), 0n);
  assert.equal(decode(214n, 8), -42n);
});

check('encode ⇄ decode round-trips', () => {
  for(const bits of WIDTHS){
    for(const v of [0n, 1n, -1n, 7n, -7n]){
      assert.equal(decode(encode(v, bits).unsigned, bits), v);
    }
  }
});

check('64-bit uses BigInt without precision loss', () => {
  assert.equal(encode(-1n, 64).unsigned, (1n << 64n) - 1n);
  assert.equal(decode((1n << 64n) - 1n, 64), -1n);
});

check('parsePattern accepts hex, binary and decimal', () => {
  assert.equal(parsePattern('0xFFFFFFD6', 32), 0xFFFFFFD6n);
  assert.equal(parsePattern('11010110', 8), 214n);
  assert.equal(parsePattern('214', 8), 214n);
  assert.equal(decode(parsePattern('0xFFFFFFD6', 32), 32), -42n);
});

check('out-of-range values throw', () => {
  assert.throws(() => encode(128, 8), /out of range/);
  assert.throws(() => encode(-129, 8), /out of range/);
  assert.throws(() => parsePattern('0x1FF', 8), /does not fit/);
  assert.throws(() => encode(5, 12), /bits must be/);
});

check('invalid input throws', () => {
  assert.throws(() => encode('abc', 8), /integer/);
  assert.throws(() => parsePattern('xyz', 8), /invalid pattern/);
});

console.log(`\n${n} checks passed.`);
