import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { tokenize, types, ttr, hapax, guiraud, mostCommon, summarize } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b} (±${eps})`);

check('tokenize lowercases and ignores punctuation', () => {
  assert.deepEqual(tokenize('The the THE, cat!'), ['the', 'the', 'the', 'cat']);
});

check('types = unique words', () => {
  assert.equal(types(tokenize('the the the cat')), 2);
  assert.equal(types(tokenize('a b c d')), 4);
});

check('TTR = types / tokens', () => {
  near(ttr(tokenize('a a b')), 2 / 3, 1e-9);
  near(ttr(tokenize('a b c')), 1, 1e-9);   // all unique
});

check('hapax = words used exactly once', () => {
  assert.equal(hapax(tokenize('a a b c')), 2);   // b, c
  assert.equal(hapax(tokenize('x x x')), 0);
  assert.equal(hapax(tokenize('one two three')), 3);
});

check('Guiraud index = types / sqrt(tokens)', () => {
  near(guiraud(tokenize('a a b b')), 2 / Math.sqrt(4), 1e-9);   // 1
});

check('most common word (ties broken alphabetically)', () => {
  assert.deepEqual(mostCommon(tokenize('cat cat dog')), { word: 'cat', count: 2 });
  assert.deepEqual(mostCommon(tokenize('banana apple')), { word: 'apple', count: 1 });  // tie → alpha
});

check('case-insensitive counting', () => {
  assert.equal(types(tokenize('The THE the')), 1);
});

check('empty text', () => {
  const s = summarize('');
  assert.equal(s.tokens, 0);
  assert.equal(s.ttr, 0);
  assert.equal(s.mostCommon, null);
});

check('summarize wires everything together', () => {
  const s = summarize('the quick brown fox the fox');   // tokens 6, types 4 (the,quick,brown,fox)
  assert.equal(s.tokens, 6);
  assert.equal(s.types, 4);
  near(s.ttr, 4 / 6, 1e-9);
  assert.equal(s.hapax, 2);   // quick, brown
});

check('more repetition lowers TTR', () => {
  assert.ok(ttr(tokenize('a b c d e')) > ttr(tokenize('a a a a b')));
});

console.log(`\n${n} checks passed.`);
