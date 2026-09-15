import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { PRESETS, reflect, crcCompute, asciiToBytes, hexToBytes, toHex } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const CHK = asciiToBytes('123456789');   // standard CRC check string

check('CRC-8 check value = 0xF4', () => {
  assert.equal(crcCompute(CHK, PRESETS['CRC-8']), 0xF4);
});

check('CRC-16/CCITT-FALSE = 0x29B1', () => {
  assert.equal(crcCompute(CHK, PRESETS['CRC-16/CCITT-FALSE']), 0x29B1);
});

check('CRC-16/XMODEM = 0x31C3', () => {
  assert.equal(crcCompute(CHK, PRESETS['CRC-16/XMODEM']), 0x31C3);
});

check('CRC-16/ARC = 0xBB3D', () => {
  assert.equal(crcCompute(CHK, PRESETS['CRC-16/ARC']), 0xBB3D);
});

check('CRC-16/MODBUS = 0x4B37', () => {
  assert.equal(crcCompute(CHK, PRESETS['CRC-16/MODBUS']), 0x4B37);
});

check('CRC-32 = 0xCBF43926', () => {
  assert.equal(crcCompute(CHK, PRESETS['CRC-32']), 0xCBF43926);
});

check('reflect', () => {
  assert.equal(reflect(0x80, 8), 0x01);
  assert.equal(reflect(0x01, 8), 0x80);
  assert.equal(reflect(0b0000_0001, 8), 0b1000_0000);
});

check('hex and ascii inputs agree', () => {
  // "123456789" as hex bytes 31 32 33 ... 39
  const hex = hexToBytes('31 32 33 34 35 36 37 38 39');
  assert.equal(crcCompute(hex, PRESETS['CRC-32']), crcCompute(CHK, PRESETS['CRC-32']));
});

check('empty input CRC-32 = 0 (init xored with xorout)', () => {
  assert.equal(crcCompute([], PRESETS['CRC-32']), 0);   // 0xFFFFFFFF ^ 0xFFFFFFFF
});

check('toHex formatting and hex validation', () => {
  assert.equal(toHex(0xCBF43926, 32), '0xCBF43926');
  assert.equal(toHex(0xF4, 8), '0xF4');
  assert.equal(toHex(0x29B1, 16), '0x29B1');
  assert.throws(() => hexToBytes('abc'), /even number/);
});

console.log(`\n${n} checks passed.`);
