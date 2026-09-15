import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { SPECIALS, removeDiacritics, toAscii } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('removeDiacritics strips accents', () => {
  assert.equal(removeDiacritics('café'), 'cafe');
  assert.equal(removeDiacritics('résumé'), 'resume');
  assert.equal(removeDiacritics('Zürich'), 'Zurich');
  assert.equal(removeDiacritics('piñata'), 'pinata');
  assert.equal(removeDiacritics('Åström'), 'Astrom');
});

check('removeDiacritics leaves plain ASCII untouched', () => {
  assert.equal(removeDiacritics('Hello, world 123!'), 'Hello, world 123!');
});

check('removeDiacritics does NOT fold ß/æ (needs full ascii)', () => {
  assert.equal(removeDiacritics('Straße'), 'Straße');
});

check('toAscii folds ß to ss', () => {
  assert.equal(toAscii('Straße'), 'Strasse');
});

check('toAscii folds ligatures and slashed letters', () => {
  assert.equal(toAscii('Æther'), 'AEther');
  assert.equal(toAscii('œuvre'), 'oeuvre');
  assert.equal(toAscii('Øystein'), 'Oystein');
  assert.equal(toAscii('Łódź'), 'Lodz');
});

check('toAscii also removes accents', () => {
  assert.equal(toAscii('café Æther'), 'cafe AEther');
  assert.equal(toAscii('naïve résumé'), 'naive resume');
});

check('toAscii preserves punctuation, digits, spaces', () => {
  assert.equal(toAscii('a-b_c 1.2, x!'), 'a-b_c 1.2, x!');
});

check('SPECIALS map has the expected entries', () => {
  assert.equal(SPECIALS['ß'], 'ss');
  assert.equal(SPECIALS['æ'], 'ae');
  assert.equal(SPECIALS['ø'], 'o');
});

check('handles combined multi-accent strings', () => {
  assert.equal(toAscii('Crème brûlée'), 'Creme brulee');
});

check('non-string input is coerced', () => {
  assert.equal(toAscii(123), '123');
  assert.equal(removeDiacritics(true), 'true');
});

console.log(`\n${n} checks passed.`);
