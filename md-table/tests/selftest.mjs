// Headless regression tests for MdTable pure functions.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');

const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)]
  .map(m => m[1]).sort((a, b) => b.length - a.length)[0];

function el(){ return {value:'',textContent:'',innerHTML:'',style:{},className:'',checked:true,
  appendChild(){},getAttribute(){return null;},setAttribute(){},removeAttribute(){},
  addEventListener(){},querySelectorAll(){return[];},closest(){return null;}}; }
globalThis.document = {
  getElementById: () => el(), createElement: () => el(),
  querySelectorAll: () => [], documentElement: el()
};
globalThis.localStorage = { getItem:()=>null, setItem(){}, removeItem(){} };
globalThis.matchMedia = () => ({ matches:false });
globalThis.window = { matchMedia: globalThis.matchMedia };

eval(js.replace('if(typeof module !== \'undefined\') module.exports =',
  'globalThis.__t =') );
const { parseDelimited, toMarkdownTable, csvToMarkdown } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('parseDelimited: basic CSV', () => {
  assert.deepEqual(parseDelimited('a,b\n1,2'), [['a','b'],['1','2']]);
});

check('parseDelimited: quoted fields with commas', () => {
  assert.deepEqual(parseDelimited('x,"a,b",y'), [['x','a,b','y']]);
  assert.deepEqual(parseDelimited('"he said ""hi"""'), [['he said "hi"']]);
});

check('parseDelimited: auto-detects tabs', () => {
  assert.deepEqual(parseDelimited('a\tb\n1\t2'), [['a','b'],['1','2']]);
});

check('parseDelimited: trailing newline drops empty row; CRLF handled', () => {
  assert.deepEqual(parseDelimited('a,b\n1,2\n'), [['a','b'],['1','2']]);
  assert.deepEqual(parseDelimited('a,b\r\n1,2'), [['a','b'],['1','2']]);
  assert.deepEqual(parseDelimited(''), []);
});

check('toMarkdownTable: padded left-aligned', () => {
  const md = toMarkdownTable([['Name','Age'],['Al','30']]);
  assert.equal(md,
    '| Name | Age |\n' +
    '| ---- | --- |\n' +
    '| Al   | 30  |');
});

check('toMarkdownTable: center alignment separators', () => {
  const md = toMarkdownTable([['Name','Age'],['Al','30']], { align: 'center' });
  const sep = md.split('\n')[1];
  assert.equal(sep, '| :--: | :-: |');
});

check('toMarkdownTable: right alignment', () => {
  const md = toMarkdownTable([['Name','Age'],['Al','30']], { align: 'right' });
  const lines = md.split('\n');
  assert.equal(lines[1], '| ---: | --: |');
  assert.equal(lines[2], '|   Al |  30 |'); // right-padded
});

check('toMarkdownTable: per-column alignment array', () => {
  const md = toMarkdownTable([['A','B','C'],['x','y','z']],
    { align: ['left','center','right'] });
  assert.equal(md.split('\n')[1], '| --- | :-: | --: |');
});

check('toMarkdownTable: escapes pipes and pads ragged rows', () => {
  const md = toMarkdownTable([['a|b','c'],['d']]);
  const lines = md.split('\n');
  assert.ok(lines[0].includes('a\\|b'));   // pipe escaped in cell
  // ragged data row (1 cell) padded out to 2 columns (widths 4 and 3)
  assert.equal(lines[2], '| d    |     |');
});

check('toMarkdownTable: header:false emits blank header row', () => {
  const md = toMarkdownTable([['1','2'],['3','4']], { header: false });
  const lines = md.split('\n');
  assert.equal(lines.length, 4);            // blank header + sep + 2 data
  assert.ok(/^\|\s+\|\s+\|$/.test(lines[0])); // header cells all blank
  assert.ok(lines[2].includes('1'));
});

check('toMarkdownTable: empty input', () => {
  assert.equal(toMarkdownTable([]), '');
  assert.equal(csvToMarkdown(''), '');
});

check('csvToMarkdown end-to-end', () => {
  const md = csvToMarkdown('Name, Role\nAlex, SPS');
  assert.equal(md,
    '| Name | Role |\n' +
    '| ---- | ---- |\n' +
    '| Alex | SPS  |');
});

console.log(`\n${n} checks passed.`);
