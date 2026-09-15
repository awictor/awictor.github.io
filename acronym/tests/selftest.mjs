import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { acronym } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('skips small words by default (NASA)', () => {
  assert.equal(acronym('National Aeronautics and Space Administration'), 'NASA');
});

check('keeps small words when told to', () => {
  assert.equal(acronym('National Aeronautics and Space Administration', { skipStopwords: false }), 'NAASA');
});

check('common examples', () => {
  assert.equal(acronym('World Health Organization'), 'WHO');
  assert.equal(acronym('Portable Document Format'), 'PDF');
  assert.equal(acronym('as soon as possible'), 'ASAP'); // "as" is not a stopword here
});

check('the-quick-brown-fox with and without stopwords', () => {
  assert.equal(acronym('the quick brown fox'), 'QBF');
  assert.equal(acronym('the quick brown fox', { skipStopwords: false }), 'TQBF');
});

check('dotted form', () => {
  assert.equal(acronym('National Aeronautics and Space Administration', { dotted: true }), 'N.A.S.A.');
  assert.equal(acronym('World Health Organization', { dotted: true }), 'W.H.O.');
});

check('single word', () => {
  assert.equal(acronym('Hello'), 'H');
});

check('punctuation and hyphens are word separators', () => {
  assert.equal(acronym('Portable Document Format!'), 'PDF');
  assert.equal(acronym('e-mail service provider'), 'EMSP');
});

check('digits are kept as-is', () => {
  assert.equal(acronym('3D Systems'), '3S');
});

check('empty / stopword-only input', () => {
  assert.equal(acronym(''), '');
  assert.equal(acronym('the of and'), '');           // all skipped
  assert.equal(acronym('the of and', { skipStopwords: false }), 'TOA');
});

check('is uppercase regardless of input case', () => {
  assert.equal(acronym('light amplification by stimulated emission of radiation'), 'LASER');
});

console.log(`\n${n} checks passed.`);
