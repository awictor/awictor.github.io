import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { TERMS, findTerms, summarize } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('flags a tech term with a suggestion', () => {
  const f = findTerms('add it to the whitelist');
  assert.equal(f.length, 1);
  assert.equal(f[0].term, 'whitelist');
  assert.equal(f[0].suggestion, 'allowlist');
});

check('case-insensitive', () => {
  assert.equal(findTerms('Blacklist the IP').length, 1);
  assert.equal(findTerms('CHAIRMAN').length, 1);
});

check('flags gendered and casual-ableist terms', () => {
  assert.ok(findTerms('hey guys').some(f => f.term === 'guys'));
  assert.ok(findTerms('this is crazy').some(f => f.term === 'crazy'));
  assert.ok(findTerms('manpower shortage').some(f => f.term === 'manpower'));
});

check('multiple terms with positions in order', () => {
  const f = findTerms('the whitelist and the blacklist');
  assert.deepEqual(f.map(x => x.term), ['whitelist', 'blacklist']);
  assert.ok(f[0].index < f[1].index);
});

check('word boundaries — no match inside longer words', () => {
  assert.equal(findTerms('mastermind').filter(f => f.term === 'master').length, 0);
  assert.equal(findTerms('classroom').length, 0);   // not "lame"/"ass" etc.
});

check('clean text finds nothing', () => {
  assert.deepEqual(findTerms('The team reviewed the primary branch calmly.'), []);
});

check('multi-word term with space/hyphen variation', () => {
  assert.equal(findTerms('run a sanity check').length, 1);
  assert.equal(findTerms('man-hours logged').length, 1);
  assert.equal(findTerms('man hours logged').length, 1);
});

check('summarize counts totals and uniques', () => {
  const s = summarize('guys, guys, listen — the whitelist');
  assert.equal(s.total, 3);
  assert.equal(s.items.length, 2);
  assert.equal(s.items.find(i => i.term === 'guys').count, 2);
});

check('no overlap double-counting', () => {
  // "whitelisted" is its own entry; shouldn't also count "whitelist"
  assert.equal(findTerms('it was whitelisted').length, 1);
  assert.equal(findTerms('it was whitelisted')[0].term, 'whitelisted');
});

check('term list is substantial and well-formed', () => {
  assert.ok(TERMS.length >= 25);
  assert.ok(TERMS.every(t => Array.isArray(t) && t.length === 2 && t[0] && t[1]));
});

console.log(`\n${n} checks passed.`);
