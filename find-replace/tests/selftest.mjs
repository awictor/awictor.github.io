// Headless regression tests for FindReplace pure functions.
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
const { escapeRegex, buildRegex, countMatches, replaceAll } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('escapeRegex escapes metacharacters', () => {
  assert.equal(escapeRegex('a.b*c'), 'a\\.b\\*c');
  assert.equal(escapeRegex('(x)[y]'), '\\(x\\)\\[y\\]');
});

check('literal replace counts and replaces all', () => {
  assert.deepEqual(replaceAll('a b a', 'a', 'X'), { result: 'X b X', count: 2, error: null });
});

check('literal mode treats "." as a dot, not any char', () => {
  assert.deepEqual(replaceAll('1.2.3', '.', '-'), { result: '1-2-3', count: 2, error: null });
});

check('literal replacement inserts $ literally', () => {
  assert.deepEqual(replaceAll('the price', 'price', '$5'),
    { result: 'the $5', count: 1, error: null });
});

check('regex mode with quantifier', () => {
  assert.deepEqual(replaceAll('foo123bar', '\\d+', '#', { regex: true }),
    { result: 'foo#bar', count: 1, error: null });
});

check('regex group backreferences', () => {
  assert.deepEqual(
    replaceAll('John Smith', '(\\w+) (\\w+)', '$2 $1', { regex: true }),
    { result: 'Smith John', count: 1, error: null });
});

check('case-insensitive option', () => {
  assert.deepEqual(replaceAll('Cat cat CAT', 'cat', 'dog', { caseInsensitive: true }),
    { result: 'dog dog dog', count: 3, error: null });
});

check('whole-word option', () => {
  assert.deepEqual(replaceAll('cat category cats', 'cat', 'X', { wholeWord: true }),
    { result: 'X category cats', count: 1, error: null });
});

check('invalid regex reports error and leaves text unchanged', () => {
  const r = replaceAll('x[y', '[', 'Z', { regex: true });
  assert.equal(r.error, 'invalid-regex');
  assert.equal(r.result, 'x[y');
  assert.equal(r.count, 0);
});

check('empty find is a no-op', () => {
  assert.deepEqual(replaceAll('abc', '', 'X'), { result: 'abc', count: 0, error: null });
  assert.equal(countMatches('abc', ''), 0);
});

check('countMatches without mutating', () => {
  assert.equal(countMatches('aaa', 'a'), 3);
  assert.equal(countMatches('a1b2c3', '\\d', { regex: true }), 3);
  assert.equal(countMatches('Hello', 'l'), 2);
});

check('buildRegex applies flags and whole-word wrap', () => {
  assert.equal(buildRegex('a', {}).flags, 'g');
  assert.equal(buildRegex('a', { caseInsensitive: true }).flags, 'gi');
  assert.equal(buildRegex('cat', { wholeWord: true }).source, '\\b(?:cat)\\b');
  assert.equal(buildRegex('', {}), null);
  assert.equal(buildRegex('(', { regex: true }), null);
});

console.log(`\n${n} checks passed.`);
