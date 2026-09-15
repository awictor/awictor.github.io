// Headless regression tests for WordFreq pure functions.
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
const { tokenize, countFrequency, stats } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('tokenize lowercases and strips punctuation', () => {
  assert.deepEqual(tokenize('The cat sat. The CAT!'), ['the','cat','sat','the','cat']);
  assert.deepEqual(tokenize("don't stop"), ["don't", 'stop']);
  assert.deepEqual(tokenize('  '), []);
});

check('tokenize case-sensitive keeps original case', () => {
  assert.deepEqual(tokenize('Cat cat CAT', true), ['Cat','cat','CAT']);
});

check('countFrequency sorts by count desc then alpha', () => {
  assert.deepEqual(countFrequency('the cat the cat dog'),
    [{ word: 'cat', count: 2 }, { word: 'the', count: 2 }, { word: 'dog', count: 1 }]);
});

check('countFrequency respects ignore-common-words', () => {
  assert.deepEqual(countFrequency('the cat the cat dog', { stopwords: true }),
    [{ word: 'cat', count: 2 }, { word: 'dog', count: 1 }]);
});

check('countFrequency case-sensitive treats Cat and cat separately', () => {
  assert.deepEqual(countFrequency('Cat cat', { caseSensitive: true }),
    [{ word: 'Cat', count: 1 }, { word: 'cat', count: 1 }]);
});

check('countFrequency empty input', () => {
  assert.deepEqual(countFrequency(''), []);
  assert.deepEqual(countFrequency('   ...  '), []);
});

check('stats total and unique', () => {
  assert.deepEqual(stats('the cat sat the'), { total: 4, unique: 3 });
  assert.deepEqual(stats(''), { total: 0, unique: 0 });
});

check('sum of counts equals total (no stopwords)', () => {
  const text = 'apple banana apple cherry banana apple';
  const freq = countFrequency(text);
  const sum = freq.reduce((a, f) => a + f.count, 0);
  assert.equal(sum, stats(text).total);
  assert.deepEqual(freq[0], { word: 'apple', count: 3 });
});

console.log(`\n${n} checks passed.`);
