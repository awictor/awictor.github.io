import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { MAPS, DELEET, leetify, deleet } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('basic level swaps vowels and s/t', () => {
  assert.equal(leetify('leet', 'basic'), 'l337');   // l unchanged in basic
  assert.equal(leetify('hacker', 'basic'), 'h4ck3r');
  assert.equal(leetify('elite', 'basic'), '3l173');
});

check('full level also swaps l/g/b/z/c', () => {
  assert.equal(leetify('leet', 'full'), '1337');    // l→1 = classic
  assert.equal(leetify('glob', 'full'), '9108');    // g9 l1 o0 b8
});

check('default level is basic', () => {
  assert.equal(leetify('test'), leetify('test', 'basic'));
});

check('case-insensitive, output is the leet symbol', () => {
  assert.equal(leetify('LEET', 'full'), '1337');
  assert.equal(leetify('Hacker', 'basic'), 'H4ck3r'); // H not mapped, keeps case
});

check('non-letters pass through', () => {
  assert.equal(leetify('a b!c', 'basic'), '4 b!c'); // basic has no c mapping
  assert.equal(leetify('a-e-i', 'basic'), '4-3-1');
});

check('spaces and punctuation preserved', () => {
  assert.equal(leetify('hello, world!', 'basic'), 'h3ll0, w0rld!');
});

check('deleet reverses unambiguous leet', () => {
  assert.equal(deleet('h4ck3r'), 'hacker');
  assert.equal(deleet('5p34k'), 'speak');
  assert.equal(deleet('9108'), 'giob'); // 1→i (ambiguous choice)
});

check('deleet leaves plain letters alone', () => {
  assert.equal(deleet('hello'), 'hello');
});

check('maps have the expected core entries', () => {
  assert.equal(MAPS.basic.a, '4');
  assert.equal(MAPS.full.l, '1');
  assert.equal(DELEET['4'], 'a');
});

check('unknown level throws; empty string ok', () => {
  assert.throws(() => leetify('hi', 'ultra'), /unknown level/);
  assert.equal(leetify('', 'basic'), '');
  assert.equal(deleet(''), '');
});

console.log(`\n${n} checks passed.`);
