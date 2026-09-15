// Headless regression tests for Columns — text column alignment.
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
const { splitRows, colWidths, align } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('splitRows — whitespace, trims, drops blanks', () => {
  assert.deepEqual(splitRows('a  bb   ccc\n\n d e ', 'ws'), [['a', 'bb', 'ccc'], ['d', 'e']]);
});

check('splitRows — comma delimiter trims cells', () => {
  assert.deepEqual(splitRows('a, bb ,c\nx,y', ','), [['a', 'bb', 'c'], ['x', 'y']]);
});

check('colWidths — max per column', () => {
  assert.deepEqual(colWidths([['a', 'bb'], ['ccc', 'd']]), [3, 2]);
  assert.deepEqual(colWidths([['x']]), [1]);
});

check('align — comma, left, no trailing spaces on last col', () => {
  assert.equal(align('a,bb\nccc,d', { delimiter: ',', gap: 1 }), 'a   bb\nccc d');
});

check('align — whitespace, gap 2', () => {
  assert.equal(align('name age\nAlice 30', { delimiter: 'ws', gap: 2 }), 'name   age\nAlice  30');
});

check('align — right-align pads on the left', () => {
  assert.equal(align('a,bb\nccc,d', { delimiter: ',', gap: 1, alignRight: true }), '  a bb\nccc  d');
});

check('align — columns start at the same offset', () => {
  const out = align('name age city\nAlice 30 Seattle\nBob 7 Austin', { delimiter: 'ws', gap: 2 });
  const lines = out.split('\n');
  // second column ("age"/"30"/"7") begins after col0 width (7 = "Charlie"? no -> "Alice"=5, "name"=4 -> 5) + gap 2 = 7
  const w0 = Math.max('name'.length, 'Alice'.length, 'Bob'.length); // 5
  lines.forEach(l => assert.ok(l[w0 + 2] !== ' ', 'col2 should start at ' + (w0 + 2) + ' in: ' + JSON.stringify(l)));
});

check('align — no trailing whitespace per line (left)', () => {
  const out = align('a b\nlong x', { delimiter: 'ws', gap: 2 });
  out.split('\n').forEach(l => assert.ok(!/\s$/.test(l), 'trailing space in: ' + JSON.stringify(l)));
});

check('align — empty input', () => {
  assert.equal(align('', { delimiter: 'ws' }), '');
  assert.equal(align('   \n  ', { delimiter: 'ws' }), '');
});

check('align — ragged rows (missing trailing cells)', () => {
  const out = align('a,b,c\nx,y', { delimiter: ',', gap: 1 });
  assert.equal(out, 'a b c\nx y');
});

console.log(`\n${n} checks passed.`);
