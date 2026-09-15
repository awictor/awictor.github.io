import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { pluralize, singularize, withCount } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('regular plurals', () => {
  assert.equal(pluralize('cat'), 'cats');
  assert.equal(pluralize('dog'), 'dogs');
});

check('-s/-x/-z/-ch/-sh add -es', () => {
  assert.equal(pluralize('bus'), 'buses');
  assert.equal(pluralize('box'), 'boxes');
  assert.equal(pluralize('church'), 'churches');
  assert.equal(pluralize('dish'), 'dishes');
});

check('consonant + y → -ies, vowel + y → -s', () => {
  assert.equal(pluralize('baby'), 'babies');
  assert.equal(pluralize('city'), 'cities');
  assert.equal(pluralize('day'), 'days');
  assert.equal(pluralize('key'), 'keys');
});

check('-f / -fe → -ves', () => {
  assert.equal(pluralize('knife'), 'knives');
  assert.equal(pluralize('leaf'), 'leaves');
  assert.equal(pluralize('shelf'), 'shelves');
});

check('irregulars and uncountables', () => {
  assert.equal(pluralize('child'), 'children');
  assert.equal(pluralize('person'), 'people');
  assert.equal(pluralize('mouse'), 'mice');
  assert.equal(pluralize('sheep'), 'sheep');
});

check('singularize reverses regular plurals', () => {
  assert.equal(singularize('cats'), 'cat');
  assert.equal(singularize('buses'), 'bus');
  assert.equal(singularize('boxes'), 'box');
  assert.equal(singularize('babies'), 'baby');
  assert.equal(singularize('churches'), 'church');
});

check('singularize reverses irregulars and -ves', () => {
  assert.equal(singularize('children'), 'child');
  assert.equal(singularize('people'), 'person');
  assert.equal(singularize('knives'), 'knife');
  assert.equal(singularize('leaves'), 'leaf');
  assert.equal(singularize('sheep'), 'sheep');
});

check('case is preserved', () => {
  assert.equal(pluralize('Cat'), 'Cats');
  assert.equal(pluralize('Person'), 'People');
  assert.equal(pluralize('CHILD'), 'CHILDREN');
  assert.equal(singularize('Children'), 'Child');
});

check('withCount agrees with the number', () => {
  assert.equal(withCount(1, 'cat'), '1 cat');
  assert.equal(withCount(3, 'cat'), '3 cats');
  assert.equal(withCount(0, 'child'), '0 children');
  assert.equal(withCount(1, 'child'), '1 child');
});

check('round-trip pluralize→singularize for common words', () => {
  for(const w of ['cat', 'box', 'baby', 'knife', 'child', 'church', 'wolf']){
    assert.equal(singularize(pluralize(w)), w, w);
  }
});

console.log(`\n${n} checks passed.`);
