import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { numeronym, numeronymText } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('the classic numeronyms', () => {
  assert.equal(numeronym('accessibility'), 'a11y');
  assert.equal(numeronym('internationalization'), 'i18n');
  assert.equal(numeronym('kubernetes'), 'k8s');
  assert.equal(numeronym('localization'), 'l10n');
});

check('formula = first + (len-2) + last', () => {
  assert.equal(numeronym('code'), 'c2e');       // 4 letters
  assert.equal(numeronym('cluster'), 'c5r');    // 7 letters
});

check('short words are returned unchanged', () => {
  assert.equal(numeronym('cat'), 'cat');
  assert.equal(numeronym('a'), 'a');
  assert.equal(numeronym('to'), 'to');
});

check('min length threshold', () => {
  assert.equal(numeronym('code', 5), 'code');   // below min → unchanged
  assert.equal(numeronym('cluster', 5), 'c5r'); // at/above min
});

check('numeronymText applies per word', () => {
  assert.equal(numeronymText('the kubernetes cluster'), 'the k8s c5r');
});

check('numeronymText preserves punctuation and spacing', () => {
  assert.equal(numeronymText('accessibility, please!'), 'a11y, p4e!');
});

check('numeronymText preserves case of endpoints', () => {
  assert.equal(numeronymText('Kubernetes'), 'K8s');
  assert.equal(numeronymText('Accessibility'), 'A11y');
});

check('numbers and symbols pass through untouched', () => {
  assert.equal(numeronymText('v2 config-driven'), 'v2 c4g-d4n');
});

check('non-string input coerced', () => {
  assert.equal(numeronym(12345), '135');   // numeronym abbreviates any 4+ char string
  assert.equal(numeronymText(12345), '12345'); // numeronymText only touches [A-Za-z] runs
  assert.equal(numeronymText(''), '');
});

check('round example set', () => {
  assert.deepEqual(['observability', 'configuration', 'authentication'].map(w => numeronym(w)),
    ['o11y', 'c11n', 'a12n']);
});

console.log(`\n${n} checks passed.`);
