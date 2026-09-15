import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { firstVowelIndex, translateWord, translate } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('single leading consonant moves to the end + ay', () => {
  assert.equal(translateWord('pig'), 'igpay');
  assert.equal(translateWord('banana'), 'ananabay');
});

check('consonant clusters move together', () => {
  assert.equal(translateWord('smile'), 'ilesmay');
  assert.equal(translateWord('string'), 'ingstray');
  assert.equal(translateWord('glove'), 'oveglay');
});

check('vowel-initial words take way', () => {
  assert.equal(translateWord('apple'), 'appleway');
  assert.equal(translateWord('egg'), 'eggway');
  assert.equal(translateWord('out'), 'outway');
});

check('qu stays together', () => {
  assert.equal(translateWord('quick'), 'ickquay');
  assert.equal(translateWord('square'), 'aresquay');
});

check('y is a vowel except at the start', () => {
  assert.equal(translateWord('my'), 'ymay');       // y vowel (index 1)
  assert.equal(translateWord('yellow'), 'ellowyay'); // y consonant at start
  assert.equal(firstVowelIndex('my'), 1);
  assert.equal(firstVowelIndex('yellow'), 1);
});

check('words with no vowel just take ay', () => {
  assert.equal(translateWord('nth'), 'nthay');
  assert.equal(firstVowelIndex('nth'), -1);
});

check('preserves capitalization', () => {
  assert.equal(translateWord('Pig'), 'Igpay');
  assert.equal(translateWord('Hello'), 'Ellohay');
  assert.equal(translateWord('HELLO'), 'ELLOHAY');
});

check('translate preserves spaces and punctuation', () => {
  assert.equal(translate('Hello, world!'), 'Ellohay, orldway!');
  assert.equal(translate('I am here.'), 'Iway amway erehay.');
});

check('digits and symbols pass through untouched', () => {
  assert.equal(translate('abc 123 xyz!'), 'abcway 123 yzxay!'); // "abc" starts with a vowel
  assert.equal(translate('...'), '...');
});

check('empty input returns empty', () => {
  assert.equal(translate(''), '');
  assert.equal(translateWord(''), '');
});

console.log(`\n${n} checks passed.`);
