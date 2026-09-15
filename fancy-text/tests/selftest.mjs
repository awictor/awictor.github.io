// Headless regression tests for FancyText — unicode text styling.
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
const { OFFSETS, STYLES, circled, toStyle } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const cp = (s, i) => s.codePointAt(i || 0);

check('STYLES list', () => {
  assert.deepEqual(STYLES, ['bold', 'italic', 'monospace', 'fullwidth', 'circled']);
});

check('bold maps A/a/0 to math bold code points', () => {
  assert.equal(cp(toStyle('A', 'bold')), 0x1D400);
  assert.equal(cp(toStyle('a', 'bold')), 0x1D41A);
  assert.equal(cp(toStyle('Z', 'bold')), 0x1D400 + 25);
  assert.equal(cp(toStyle('0', 'bold')), 0x1D7CE);
  assert.equal(cp(toStyle('9', 'bold')), 0x1D7CE + 9);
});

check('monospace maps correctly', () => {
  assert.equal(cp(toStyle('A', 'monospace')), 0x1D670);
  assert.equal(cp(toStyle('a', 'monospace')), 0x1D68A);
  assert.equal(cp(toStyle('5', 'monospace')), 0x1D7F6 + 5);
});

check('italic maps + the lowercase-h exception', () => {
  assert.equal(cp(toStyle('A', 'italic')), 0x1D434);
  assert.equal(cp(toStyle('a', 'italic')), 0x1D44E);
  assert.equal(toStyle('h', 'italic'), 'ℎ');        // U+210E, not the reserved slot
  assert.equal(cp(toStyle('h', 'italic')), 0x210E);
  assert.equal(toStyle('italic', 'italic').length >= 6, true);
});

check('fullwidth maps letters, digits, and space', () => {
  assert.equal(cp(toStyle('A', 'fullwidth')), 0xFF21);
  assert.equal(cp(toStyle('a', 'fullwidth')), 0xFF41);
  assert.equal(cp(toStyle('0', 'fullwidth')), 0xFF10);
  assert.equal(cp(toStyle(' ', 'fullwidth')), 0x3000);
});

check('circled maps letters and digits (0 special)', () => {
  assert.equal(cp(circled('A')), 0x24B6);
  assert.equal(cp(circled('a')), 0x24D0);
  assert.equal(cp(circled('1')), 0x2460);
  assert.equal(cp(circled('9')), 0x2460 + 8);
  assert.equal(cp(circled('0')), 0x24EA);
  assert.equal(cp(toStyle('A', 'circled')), 0x24B6);
});

check('non-mapped characters pass through', () => {
  assert.equal(toStyle('!', 'bold'), '!');
  assert.equal(toStyle('a-b', 'bold').includes('-'), true);
});

check('unknown style returns input unchanged', () => {
  assert.equal(toStyle('hello', 'nope'), 'hello');
});

check('length preserved for ASCII input', () => {
  assert.equal(Array.from(toStyle('Hello World', 'bold')).length, 'Hello World'.length);
});

console.log(`\n${n} checks passed.`);
