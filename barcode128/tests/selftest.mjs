// Headless regression tests for Barcode — Code 128-B encoding.
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
const { CODE128, isEncodable, check128, encode128B, barModules } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('CODE128 table — 107 entries, widths sum correctly', () => {
  assert.equal(CODE128.length, 107); // 103 data (0..102) + Start A/B/C (103..105) + Stop (106)
  // 0..105 sum to 11, 106 (stop) sums to 13
  for(let i = 0; i <= 105; i++){
    const s = CODE128[i].split('').reduce((a, c) => a + +c, 0);
    assert.equal(s, 11, 'index ' + i + ' sums ' + s);
  }
  assert.equal(CODE128[106].split('').reduce((a, c) => a + +c, 0), 13);
  assert.equal(CODE128[104], '211214'); // Start B
});

check('isEncodable — printable ASCII only', () => {
  assert.equal(isEncodable('HELLO 123'), true);
  assert.equal(isEncodable('~'), true);
  assert.equal(isEncodable(' '), true);
  assert.equal(isEncodable('café'), false);   // é > 126
  assert.equal(isEncodable('tab\there'), false); // tab < 32
});

check('check128 — known checksum for "HI"', () => {
  // Start B (104) + H(40)*1 + I(41)*2 = 104 + 40 + 82 = 226; 226 % 103 = 20
  assert.equal(check128('HI'), 20);
});

check('check128 — empty string', () => {
  assert.equal(check128(''), 104 % 103); // 1
});

check('encode128B — code sequence for "HI"', () => {
  assert.deepEqual(encode128B('HI'), [104, 40, 41, 20, 106]);
});

check('encode128B — starts 104, ends 106, has checksum before stop', () => {
  const c = encode128B('ABC');
  assert.equal(c[0], 104);
  assert.equal(c[c.length - 1], 106);
  assert.equal(c[c.length - 2], check128('ABC'));
  assert.equal(c.length, 1 + 3 + 1 + 1); // start + 3 data + check + stop = 6
});

check('barModules — binary string, starts with Start-B, ends with Stop', () => {
  const m = barModules('HI');
  assert.match(m, /^[01]+$/);
  // Start B '211214' -> 11 0 1 00 1 0000
  assert.ok(m.startsWith('11010010000'));
  // Stop '2331112' -> 11 000 111 0 1 0 11
  assert.ok(m.endsWith('1100011101011'));
});

check('barModules — begins and ends with a bar (1)', () => {
  const m = barModules('X');
  assert.equal(m[0], '1');
  assert.equal(m[m.length - 1], '1');
});

check('barModules length is sum of pattern widths', () => {
  // start(11) + 1 char(11) + check(11) + stop(13) = 46 for a 1-char payload
  assert.equal(barModules('A').length, 11 + 11 + 11 + 13);
});

console.log(`\n${n} checks passed.`);
