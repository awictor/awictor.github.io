import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { SPECIAL, removeDiacritics, hasDiacritics } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('common accented words fold to ASCII', () => {
  assert.equal(removeDiacritics('café'), 'cafe');
  assert.equal(removeDiacritics('naïve'), 'naive');
  assert.equal(removeDiacritics('Zürich'), 'Zurich');
  assert.equal(removeDiacritics('résumé'), 'resume');
});

check('tildes and cedillas', () => {
  assert.equal(removeDiacritics('piñata'), 'pinata');
  assert.equal(removeDiacritics('français'), 'francais');
  assert.equal(removeDiacritics('São Paulo'), 'Sao Paulo');
});

check('a full phrase with mixed accents', () => {
  assert.equal(removeDiacritics('Crème brûlée'), 'Creme brulee');
  assert.equal(removeDiacritics('Motörhead'), 'Motorhead');
});

check('special non-decomposing letters via the map', () => {
  assert.equal(removeDiacritics('Øystein'), 'Oystein');
  assert.equal(removeDiacritics('Straße'), 'Strasse');
  assert.equal(removeDiacritics('æther'), 'aether');
  assert.equal(removeDiacritics('Þór'), 'Thor');
});

check('plain ASCII is unchanged', () => {
  assert.equal(removeDiacritics('hello world 123!'), 'hello world 123!');
  assert.equal(removeDiacritics(''), '');
});

check('whitespace, punctuation, and newlines are preserved', () => {
  assert.equal(removeDiacritics('à\tb\nç'), 'a\tb\nc');
});

check('uppercase accents fold to uppercase', () => {
  assert.equal(removeDiacritics('ÀÉÎÕÜ'), 'AEIOU');
});

check('hasDiacritics detects accents', () => {
  assert.equal(hasDiacritics('café'), true);
  assert.equal(hasDiacritics('Straße'), true);
  assert.equal(hasDiacritics('plain'), false);
});

check('the operation is idempotent', () => {
  for (const s of ['café', 'Crème brûlée', 'Straße', 'hello']) {
    assert.equal(removeDiacritics(removeDiacritics(s)), removeDiacritics(s));
  }
  assert.ok(Object.keys(SPECIAL).length > 10);
});

check('validation: non-string input throws', () => {
  assert.throws(() => removeDiacritics(42), /must be a string/);
  assert.throws(() => removeDiacritics(null), /must be a string/);
});

console.log(`\n${n} checks passed.`);
