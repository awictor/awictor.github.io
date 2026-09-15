// Headless regression tests for Unicode pure functions.
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
const { cpHex, toUtf8Bytes, toUtf16Units, inspectChar, codePoints } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('cpHex format', () => {
  assert.equal(cpHex(65), 'U+0041');
  assert.equal(cpHex(0x20AC), 'U+20AC');
  assert.equal(cpHex(0x1F389), 'U+1F389');
});

check('toUtf8Bytes across ranges', () => {
  assert.deepEqual(toUtf8Bytes(0x41), [0x41]);                       // A
  assert.deepEqual(toUtf8Bytes(0xA9), [0xC2, 0xA9]);                 // (c)
  assert.deepEqual(toUtf8Bytes(0x20AC), [0xE2, 0x82, 0xAC]);         // euro
  assert.deepEqual(toUtf8Bytes(0x1F389), [0xF0, 0x9F, 0x8E, 0x89]); // tada
});

check('toUtf16Units BMP vs astral', () => {
  assert.deepEqual(toUtf16Units(0x41), [0x41]);
  assert.deepEqual(toUtf16Units(0x20AC), [0x20AC]);
  assert.deepEqual(toUtf16Units(0x1F389), [0xD83C, 0xDF89]);   // surrogate pair
});

check('inspectChar for A', () => {
  const a = inspectChar('A');
  assert.equal(a.cp, 65);
  assert.equal(a.hex, 'U+0041');
  assert.deepEqual(a.utf8, ['41']);
  assert.deepEqual(a.utf16, ['0041']);
  assert.equal(a.entity, '&#65;');
});

check('inspectChar for euro sign', () => {
  const e = inspectChar('€');
  assert.equal(e.cp, 8364);
  assert.deepEqual(e.utf8, ['E2', '82', 'AC']);
  assert.deepEqual(e.utf16, ['20AC']);
});

check('inspectChar for astral emoji', () => {
  const t = inspectChar('🎉');
  assert.equal(t.cp, 0x1F389);
  assert.deepEqual(t.utf8, ['F0', '9F', '8E', '89']);
  assert.deepEqual(t.utf16, ['D83C', 'DF89']);
});

check('codePoints splits by code point (emoji = 1)', () => {
  const pts = codePoints('A€🎉');
  assert.equal(pts.length, 3);
  assert.equal(pts[0].cp, 65);
  assert.equal(pts[1].cp, 8364);
  assert.equal(pts[2].cp, 0x1F389);
  assert.deepEqual(codePoints('').length !== undefined ? [codePoints('').length] : [], [0]);
});

check('UTF-8 byte count matches encoder', () => {
  const enc = new TextEncoder();
  ['A', '€', '🎉', 'ñ'].forEach(ch => {
    assert.equal(toUtf8Bytes(ch.codePointAt(0)).length, enc.encode(ch).length);
  });
});

console.log(`\n${n} checks passed.`);
