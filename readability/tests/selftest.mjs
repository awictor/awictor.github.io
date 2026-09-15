// Headless regression tests for Readability pure functions.
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
const { syllables, countWords, countSentences, totalSyllables, analyze, easeLabel } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps = 0.05) => assert.ok(Math.abs(a - b) < eps, `${a} vs ${b}`);

check('syllables heuristic on common words', () => {
  assert.equal(syllables('cat'), 1);
  assert.equal(syllables('the'), 1);
  assert.equal(syllables('hello'), 2);
  assert.equal(syllables('code'), 1);
  assert.equal(syllables('apple'), 2);
  assert.equal(syllables(''), 0);
});

check('countWords and countSentences', () => {
  assert.equal(countWords('The cat sat on the mat.').length, 6);
  assert.equal(countSentences('One. Two! Three?'), 3);
  assert.equal(countSentences('No terminator here'), 1);   // whole string = 1 sentence
  assert.equal(countWords('').length, 0);
});

check('analyze counts for a known sentence', () => {
  const r = analyze('The cat sat on the mat.');
  assert.equal(r.words, 6);
  assert.equal(r.sentences, 1);
  assert.equal(r.syllables, 6);           // all one-syllable words
  assert.equal(r.chars, 17);              // letters only
});

check('analyze Flesch formulas match hand calc', () => {
  const r = analyze('The cat sat on the mat.');
  // ease = 206.835 - 1.015*(6/1) - 84.6*(6/6) = 116.145
  near(r.fleschEase, 116.145, 0.01);
  // fk = 0.39*6 + 11.8*1 - 15.59 = -1.45
  near(r.fkGrade, -1.45, 0.01);
  // ari = 4.71*(17/6) + 0.5*6 - 21.43
  near(r.ari, 4.71 * (17 / 6) + 0.5 * 6 - 21.43, 0.01);
});

check('analyze returns null for empty / no words', () => {
  assert.equal(analyze(''), null);
  assert.equal(analyze('...!?'), null);
});

check('easeLabel buckets', () => {
  assert.equal(easeLabel(95), 'Very easy');
  assert.equal(easeLabel(65), 'Plain English');
  assert.equal(easeLabel(40), 'Difficult');
  assert.equal(easeLabel(10), 'Very confusing');
});

check('harder text scores lower ease than simple text', () => {
  const simple = analyze('I see the dog. It is fun.');
  const hard = analyze('Notwithstanding the aforementioned considerations, implementation proved problematic.');
  assert.ok(hard.fleschEase < simple.fleschEase);
  assert.ok(hard.fkGrade > simple.fkGrade);
});

check('totalSyllables sums word syllables', () => {
  assert.equal(totalSyllables(['hello', 'world']), syllables('hello') + syllables('world'));
});

console.log(`\n${n} checks passed.`);
