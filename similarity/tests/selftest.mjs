// Headless regression tests for Similarity pure functions.
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
const { levenshtein, similarityRatio, bigrams, diceCoefficient, hamming } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps = 1e-9) => assert.ok(Math.abs(a - b) < eps, `${a} vs ${b}`);

check('levenshtein known distances', () => {
  assert.equal(levenshtein('kitten', 'sitting'), 3);
  assert.equal(levenshtein('flaw', 'lawn'), 2);
  assert.equal(levenshtein('abc', 'abc'), 0);
  assert.equal(levenshtein('', 'abc'), 3);
  assert.equal(levenshtein('abc', ''), 3);
  assert.equal(levenshtein('', ''), 0);
});

check('levenshtein is symmetric', () => {
  assert.equal(levenshtein('sunday', 'saturday'), levenshtein('saturday', 'sunday'));
  assert.equal(levenshtein('sunday', 'saturday'), 3);
});

check('similarityRatio', () => {
  near(similarityRatio('kitten', 'sitting'), 1 - 3/7);
  assert.equal(similarityRatio('abc', 'abc'), 1);
  assert.equal(similarityRatio('', ''), 1);
  assert.equal(similarityRatio('abc', ''), 0);
});

check('bigrams', () => {
  assert.deepEqual(bigrams('night'), ['ni','ig','gh','ht']);
  assert.deepEqual(bigrams('a'), []);
  assert.deepEqual(bigrams(''), []);
});

check('diceCoefficient known value night/nacht = 0.25', () => {
  near(diceCoefficient('night', 'nacht'), 0.25);
});

check('diceCoefficient identical and disjoint', () => {
  assert.equal(diceCoefficient('abcd', 'abcd'), 1);
  assert.equal(diceCoefficient('ab', 'cd'), 0);
  assert.equal(diceCoefficient('', ''), 1);
  assert.equal(diceCoefficient('a', 'a'), 1);
  assert.equal(diceCoefficient('a', 'b'), 0);
});

check('diceCoefficient counts shared bigrams with multiplicity', () => {
  // "aaa" -> [aa, aa]; "aa" -> [aa]; inter=1; 2*1/(2+1)=0.6667
  near(diceCoefficient('aaa', 'aa'), 2/3);
});

check('hamming distance and length guard', () => {
  assert.equal(hamming('karolin', 'kathrin'), 3);
  assert.equal(hamming('1011101', '1001001'), 2);
  assert.equal(hamming('abc', 'abc'), 0);
  assert.equal(hamming('abc', 'ab'), null);
});

console.log(`\n${n} checks passed.`);
