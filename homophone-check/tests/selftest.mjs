import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { GROUPS, normalizeWord, homophonesOf, findHomophones } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('normalizeWord lowercases and strips apostrophes/punctuation', () => {
  assert.equal(normalizeWord("They're,"), 'theyre');
  assert.equal(normalizeWord('YOUR'), 'your');
});

check('homophonesOf returns the other group members', () => {
  assert.deepEqual(homophonesOf('their'), ['there', 'theyre']);
  assert.deepEqual(homophonesOf('your'), ['youre']);
  assert.deepEqual(homophonesOf('cat'), []);
});

check('to/too/two are one group', () => {
  assert.deepEqual(homophonesOf('too').sort(), ['to', 'two']);
});

check('findHomophones flags group words with alternatives', () => {
  const f = findHomophones('their dog');
  assert.equal(f.length, 1);
  assert.equal(f[0].word, 'their');
  assert.deepEqual(f[0].alternatives, ['there', 'theyre']);
});

check('normal words are not flagged', () => {
  assert.equal(findHomophones('the quick brown dog runs').length, 0);
});

check('case-insensitive and apostrophe-aware', () => {
  const f = findHomophones("They're here");
  assert.ok(f.some(x => x.normalized === 'theyre'));
  assert.ok(f.some(x => x.normalized === 'here'));
});

check('multiple flags in a sentence', () => {
  const f = findHomophones('your going to there house too');
  const words = f.map(x => x.normalized);
  assert.ok(words.includes('your'));
  assert.ok(words.includes('to'));
  assert.ok(words.includes('there'));
  assert.ok(words.includes('too'));
});

check('alternatives never include the word itself', () => {
  findHomophones('their there theyre your youre to too two').forEach(f => {
    assert.ok(!f.alternatives.includes(f.normalized));
  });
});

check('every group has at least two members and no dup normalized forms across a group', () => {
  GROUPS.forEach(g => {
    assert.ok(g.length >= 2);
    assert.equal(new Set(g).size, g.length);
  });
});

check('validation', () => {
  assert.throws(() => findHomophones(42), /must be a string/);
  assert.deepEqual(findHomophones(''), []);
});

console.log(`\n${n} checks passed.`);
