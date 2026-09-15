import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { charToGroup, groupToChar, encode, decode } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('letter → 5-bit a/b group (26-letter version)', () => {
  assert.equal(charToGroup('A'), 'aaaaa');   // 0
  assert.equal(charToGroup('B'), 'aaaab');   // 1
  assert.equal(charToGroup('Z'), 'bbaab');   // 25 = 11001
  assert.equal(charToGroup('H'), 'aabbb');   // 7  = 00111
});

check('groupToChar inverts charToGroup for all letters', () => {
  for (let i = 0; i < 26; i++) {
    const ch = String.fromCharCode(65 + i);
    assert.equal(groupToChar(charToGroup(ch)), ch);
  }
});

check('encode produces 5 symbols per letter', () => {
  assert.equal(encode('AB'), 'aaaaaaaaab');
  assert.equal(encode('AB').length, 10);
});

check('encode is case-insensitive', () => {
  assert.equal(encode('a'), encode('A'));
  assert.equal(encode('Hello'), encode('HELLO'));
});

check('encode ignores non-letters', () => {
  assert.equal(encode('A B'), encode('AB'));
  assert.equal(encode('A!1B'), encode('AB'));
});

check('decode inverts encode', () => {
  assert.equal(decode(encode('HELLO')), 'HELLO');
  assert.equal(decode(encode('BACON')), 'BACON');
});

check('decode ignores spaces / formatting between groups', () => {
  assert.equal(decode('aaaaa aaaab'), 'AB');
  assert.equal(decode('aa aaa\naa aab'), 'AB');
});

check('custom symbols (0/1)', () => {
  assert.equal(encode('A', '0', '1'), '00000');
  assert.equal(encode('B', '0', '1'), '00001');
  assert.equal(decode('00000', '0', '1'), 'A');
  assert.equal(decode(encode('SECRET', '0', '1'), '0', '1'), 'SECRET');
});

check('decode drops an incomplete trailing group', () => {
  assert.equal(decode('aaaaaaaaa'), 'A');   // 9 chars → 1 full group + partial
});

check('HELLO reference groups', () => {
  assert.equal(encode('HELLO'), 'aabbb' + 'aabaa' + 'ababb' + 'ababb' + 'abbba');
});

console.log(`\n${n} checks passed.`);
