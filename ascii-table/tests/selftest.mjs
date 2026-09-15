import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { charInfo, codeOfChar, parseLookup } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('letter A = 65', () => {
  const r = charInfo(65);
  assert.equal(r.char, 'A');
  assert.equal(r.hex, '41');
  assert.equal(r.oct, '101');
  assert.equal(r.bin, '01000001');
  assert.equal(r.printable, true);
});

check('lowercase and digits', () => {
  assert.equal(charInfo(97).char, 'a');
  assert.equal(charInfo(48).char, '0');
  assert.equal(charInfo(48).hex, '30');
});

check('control characters have names', () => {
  assert.equal(charInfo(0).name, 'NUL');
  assert.equal(charInfo(9).name, 'HT');
  assert.equal(charInfo(10).name, 'LF');
  assert.equal(charInfo(13).name, 'CR');
  assert.equal(charInfo(27).name, 'ESC');
  assert.equal(charInfo(0).printable, false);
});

check('space and DEL', () => {
  assert.equal(charInfo(32).name, 'Space');
  assert.equal(charInfo(32).char, ' ');
  assert.equal(charInfo(127).name, 'DEL');
  assert.equal(charInfo(127).printable, false);
});

check('hex/oct/bin are padded', () => {
  assert.equal(charInfo(0).hex, '00');
  assert.equal(charInfo(0).oct, '000');
  assert.equal(charInfo(0).bin, '00000000');
  assert.equal(charInfo(127).hex, '7F');
});

check('codeOfChar', () => {
  assert.equal(codeOfChar('A'), 65);
  assert.equal(codeOfChar('~'), 126);
  assert.equal(codeOfChar('AB'), 65);   // first char
});

check('parseLookup handles bases and chars', () => {
  assert.equal(parseLookup('65'), 65);
  assert.equal(parseLookup('0x41'), 65);
  assert.equal(parseLookup('0o101'), 65);
  assert.equal(parseLookup('0b1000001'), 65);
  assert.equal(parseLookup('A'), 65);
});

check('round-trip code ⇄ char', () => {
  for(let c = 32; c < 127; c++) assert.equal(codeOfChar(charInfo(c).char), c);
});

check('range validation', () => {
  assert.throws(() => charInfo(128), /0–127/);
  assert.throws(() => charInfo(-1), /0–127/);
  assert.throws(() => codeOfChar('€'), /not an ASCII/);
});

check('empty input', () => {
  assert.throws(() => codeOfChar(''), /empty/);
  assert.throws(() => parseLookup(''), /empty/);
});

console.log(`\n${n} checks passed.`);
