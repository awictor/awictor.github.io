import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { isParticiple, analyze } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const phrases = t => analyze(t).matches.map(m => m.phrase);

check('isParticiple: regular -ed and irregulars', () => {
  assert.equal(isParticiple('painted'), true);
  assert.equal(isParticiple('thrown'), true);
  assert.equal(isParticiple('made'), true);
  assert.equal(isParticiple('wrote'), false);   // not a participle
  assert.equal(isParticiple('happy'), false);
});

check('isParticiple: does not flag short words or be-verbs', () => {
  assert.equal(isParticiple('bed'), false);      // < 4 chars
  assert.equal(isParticiple('be'), false);
});

check('detects simple passive (be + irregular participle)', () => {
  assert.deepEqual(phrases('The ball was thrown by John.'), ['was thrown']);
});

check('detects passive with regular -ed participle', () => {
  assert.deepEqual(phrases('The house was painted last year.'), ['was painted']);
});

check('active voice is not flagged', () => {
  assert.equal(analyze('She wrote the letter. They completed the project.').passiveCount, 0);
});

check('allows an adverb between be-verb and participle', () => {
  assert.deepEqual(phrases('The bill was quickly passed.'), ['was quickly passed']);
});

check('"being" + participle counts once', () => {
  const a = analyze('The cake is being eaten.');
  assert.equal(a.passiveCount, 1);
  assert.deepEqual(a.matches.map(m => m.phrase), ['being eaten']);
});

check('multiple passives across sentences', () => {
  const a = analyze('Mistakes were made. The deadline was missed. We shipped it.');
  assert.equal(a.passiveCount, 2);
  assert.deepEqual(a.matches.map(m => m.phrase), ['were made', 'was missed']);
});

check('counts words and sentences', () => {
  const a = analyze('One two three. Four five!');
  assert.equal(a.wordCount, 5);
  assert.equal(a.sentenceCount, 2);
});

check('empty text is zeroed and never throws', () => {
  const a = analyze('');
  assert.equal(a.passiveCount, 0);
  assert.equal(a.wordCount, 0);
  assert.equal(a.sentenceCount, 0);
  assert.deepEqual(a.matches, []);
});

console.log(`\n${n} checks passed.`);
