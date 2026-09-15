// Headless regression tests for TextClean pure functions.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');

const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)]
  .map(m => m[1]).sort((a, b) => b.length - a.length)[0];

function el(){ return {value:'',textContent:'',innerHTML:'',style:{},className:'',checked:false,
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
const { normalizeNewlines, stripHtml, straightenQuotes, collapseSpaces, trimLines, removeBlankLines, clean } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('normalizeNewlines', () => {
  assert.equal(normalizeNewlines('a\r\nb\rc\nd'), 'a\nb\nc\nd');
});

check('stripHtml', () => {
  assert.equal(stripHtml('<b>Hi</b> <i>there</i>'), 'Hi there');
  assert.equal(stripHtml('no <br/> tags <span class="x">left</span>'), 'no  tags left');
});

check('straightenQuotes', () => {
  assert.equal(straightenQuotes('“Hello” ‘world’'), '"Hello" \'world\'');
});

check('collapseSpaces keeps newlines', () => {
  assert.equal(collapseSpaces('a   b\t\tc'), 'a b c');
  assert.equal(collapseSpaces('line1   \nline2'), 'line1 \nline2');
});

check('trimLines trims trailing whitespace per line', () => {
  assert.equal(trimLines('a  \nb\t\nc'), 'a\nb\nc');
  assert.equal(trimLines('keep  leading'), 'keep  leading');   // only trailing trimmed... wait, internal kept
});

check('removeBlankLines', () => {
  assert.equal(removeBlankLines('a\n\n\nb\n  \nc'), 'a\nb\nc');
  assert.equal(removeBlankLines('\n\n'), '');
});

check('clean applies only enabled ops, in order', () => {
  const messy = '<p>Hello   world</p>   \n\n\n  trailing  ';
  const out = clean(messy, { stripHtml: true, collapseSpaces: true, trimLines: true, removeBlankLines: true });
  assert.equal(out, 'Hello world\n trailing');
});

check('clean with no ops returns input unchanged', () => {
  assert.equal(clean('as is  ', {}), 'as is  ');
});

check('clean full pipeline on smart quotes + html', () => {
  const out = clean('“Hi” <b>x</b>   y', {
    stripHtml: true, straightenQuotes: true, collapseSpaces: true, trimLines: true });
  assert.equal(out, '"Hi" x y');
});

console.log(`\n${n} checks passed.`);
