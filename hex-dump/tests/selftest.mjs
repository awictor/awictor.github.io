// Headless regression tests for HexDump — xxd-style hex dump.
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
const { textToBytes, hex2, asciiChar, hexDump } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('textToBytes — ASCII and UTF-8', () => {
  assert.deepEqual(textToBytes('ABC'), [65, 66, 67]);
  assert.deepEqual(textToBytes('é'), [0xC3, 0xA9]);
  assert.deepEqual(textToBytes(''), []);
});

check('hex2 / asciiChar', () => {
  assert.equal(hex2(0), '00');
  assert.equal(hex2(255), 'ff');
  assert.equal(hex2(15), '0f');
  assert.equal(asciiChar(65), 'A');
  assert.equal(asciiChar(9), '.');   // tab non-printable
  assert.equal(asciiChar(0x7f), '.');
  assert.equal(asciiChar(0x20), ' ');
});

check('hexDump — single short line (width 4)', () => {
  assert.equal(hexDump('ABC', 4), '00000000  41 42 43    |ABC|');
});

check('hexDump — wraps at width, offset advances', () => {
  assert.equal(hexDump('ABCDE', 4),
    '00000000  41 42 43 44 |ABCD|\n00000004  45          |E|');
});

check('hexDump — non-printable shown as dot in gutter', () => {
  assert.equal(hexDump(String.fromCharCode(9) + 'A', 4), '00000000  09 41       |.A|');
});

check('hexDump — empty input', () => {
  assert.equal(hexDump('', 16), '');
  assert.equal(hexDump([], 16), '');
});

check('hexDump — width 16 has group gap after 8th byte', () => {
  const out = hexDump('0123456789ABCDEF', 16); // 16 ASCII bytes
  assert.ok(out.startsWith('00000000  '));
  assert.ok(out.includes('37  38'));            // byte 7 (0x37) then double-space gap then byte 8 (0x38)
  assert.ok(out.endsWith('|0123456789ABCDEF|'));
});

check('hexDump — accepts a byte array directly', () => {
  assert.equal(hexDump([0, 255], 4), '00000000  00 ff       |..|');
});

check('hexDump — offsets are 8-digit hex', () => {
  const out = hexDump('x'.repeat(20), 16); // 20 bytes -> 2 lines
  const lines = out.split('\n');
  assert.equal(lines[0].slice(0, 8), '00000000');
  assert.equal(lines[1].slice(0, 8), '00000010'); // offset 16
});

console.log(`\n${n} checks passed.`);
