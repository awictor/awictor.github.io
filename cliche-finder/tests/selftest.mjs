import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { CLICHES, findCliches, summarize } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('finds a multi-word cliché', () => {
  const f = findCliches('At the end of the day, we ship.');
  assert.equal(f.length, 1);
  assert.equal(f[0].phrase, 'at the end of the day');
});

check('finds single-word business-speak', () => {
  assert.ok(findCliches('It is pure synergy').some(c => c.phrase === 'synergy'));
  assert.ok(findCliches('we must leverage this').some(c => c.phrase === 'leverage'));
});

check('case-insensitive', () => {
  assert.equal(findCliches('THINK OUTSIDE THE BOX').length, 1);
});

check('finds multiple clichés with positions in order', () => {
  const f = findCliches('Circle back and touch base.');
  assert.deepEqual(f.map(c => c.phrase), ['circle back', 'touch base']);
  assert.ok(f[0].index < f[1].index);
});

check('clean text finds nothing', () => {
  assert.deepEqual(findCliches('The cat sat quietly on the warm windowsill.'), []);
});

check('handles hyphen/space variation in low-hanging fruit', () => {
  assert.equal(findCliches('grab the low-hanging fruit').length, 1);
  assert.equal(findCliches('grab the low hanging fruit').length, 1);
});

check('word boundaries — does not match inside longer words', () => {
  // "leverage" should not fire on "leverages"/"leveraged"
  assert.equal(findCliches('she leverages data').filter(c => c.phrase === 'leverage').length, 0);
});

check('no double-counting from overlapping list entries', () => {
  // "low-hanging fruit" and "low hanging fruit" are both in the list; a single occurrence counts once
  assert.equal(findCliches('the low-hanging fruit').length, 1);
});

check('summarize counts totals and uniques', () => {
  const s = summarize('synergy and more synergy, plus a game changer');
  assert.equal(s.total, 3);
  assert.equal(s.unique, 2);
  assert.equal(s.counts['synergy'], 2);
});

check('cliché list is substantial and lowercase', () => {
  assert.ok(CLICHES.length >= 40);
  assert.ok(CLICHES.every(c => c === c.toLowerCase()));
});

console.log(`\n${n} checks passed.`);
