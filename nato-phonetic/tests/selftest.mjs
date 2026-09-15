// Headless regression tests for Phonetic — NATO phonetic alphabet speller.
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
const { NATO, DIGITS, charToWord, toNato, fromNato } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('charToWord maps letters (any case) and digits', () => {
  assert.equal(charToWord('a'), 'Alfa');
  assert.equal(charToWord('A'), 'Alfa');
  assert.equal(charToWord('z'), 'Zulu');
  assert.equal(charToWord('9'), 'Nine');
  assert.equal(charToWord('0'), 'Zero');
  assert.equal(charToWord('!'), null);
  assert.equal(charToWord(' '), null);
});

check('official NATO spellings Alfa / Juliett / X-ray', () => {
  assert.equal(NATO.A, 'Alfa');
  assert.equal(NATO.J, 'Juliett');
  assert.equal(NATO.X, 'X-ray');
  assert.equal(Object.keys(NATO).length, 26);
  assert.equal(Object.keys(DIGITS).length, 10);
});

check('toNato — basic words', () => {
  assert.equal(toNato('AB'), 'Alfa Bravo');
  assert.equal(toNato('SOS'), 'Sierra Oscar Sierra');
  assert.equal(toNato('a1'), 'Alfa One');
  assert.equal(toNato('Cat'), 'Charlie Alfa Tango');
});

check('toNato — spaces become a separator marker', () => {
  assert.equal(toNato('Hi there'), 'Hotel India | Tango Hotel Echo Romeo Echo');
  assert.equal(toNato('A B'), 'Alfa | Bravo');
});

check('toNato — unknown chars kept by default, droppable', () => {
  assert.equal(toNato('a!'), 'Alfa !');
  assert.equal(toNato('a!', { keepUnknown: false }), 'Alfa');
  assert.equal(toNato('!!!', { keepUnknown: false }), '');
});

check('fromNato — decodes back to letters/digits', () => {
  assert.equal(fromNato('Sierra Oscar Sierra'), 'SOS');
  assert.equal(fromNato('Alfa Bravo'), 'AB');
  assert.equal(fromNato('Hotel India | Tango Hotel Echo Romeo Echo'), 'HI THERE');
  assert.equal(fromNato('One Two Three'), '123');
});

check('fromNato — case-insensitive and accepts common aliases', () => {
  assert.equal(fromNato('alpha bravo charlie'), 'ABC');
  assert.equal(fromNato('ALFA'), 'A');
  assert.equal(fromNato('Juliet'), 'J');   // alias of Juliett
  assert.equal(fromNato('Xray'), 'X');
  assert.equal(fromNato('Niner Tree Fife Fower'), '9354'); // aviation variants
});

check('fromNato — passes through unknown tokens', () => {
  assert.equal(fromNato('Alfa Zzz Bravo'), 'AZzzB');
});

check('round-trip through uppercase text', () => {
  ['HELLO WORLD', 'ABC 123', 'SEATTLE', 'W1CT0R'].forEach(s => {
    assert.equal(fromNato(toNato(s)), s);
  });
});

check('every letter and digit round-trips individually', () => {
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('').forEach(ch => {
    assert.equal(fromNato(toNato(ch)), ch);
  });
});

console.log(`\n${n} checks passed.`);
