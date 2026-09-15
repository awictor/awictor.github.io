import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { MAP, toSmallCaps } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('the map covers all 26 lowercase letters', () => {
  for (let c = 97; c <= 122; c++) assert.ok(MAP[String.fromCharCode(c)] !== undefined);
  assert.equal(Object.keys(MAP).length, 26);
});

check('specific mappings', () => {
  assert.equal(MAP.a, 'ᴀ');
  assert.equal(MAP.b, 'ʙ');
  assert.equal(MAP.s, 'ꜱ');
});

check('converts a lowercase word', () => {
  assert.equal(toSmallCaps('hello'), 'ʜᴇʟʟᴏ');
});

check('uppercase letters are left as full capitals', () => {
  assert.equal(toSmallCaps('ABC'), 'ABC');
  assert.equal(toSmallCaps('Hello'), 'H' + 'ᴇʟʟᴏ');
});

check('digits and punctuation pass through', () => {
  assert.equal(toSmallCaps('a1!'), 'ᴀ1!');
  assert.equal(toSmallCaps('to-do 2'), 'ᴛᴏ-ᴅᴏ 2');
});

check('q and x are kept as-is (no standard small cap)', () => {
  assert.equal(toSmallCaps('x'), 'x');
});

check('each source character maps to exactly one output character', () => {
  const s = 'abcdefghijklmnopqrstuvwxyz';
  assert.equal(toSmallCaps(s).length, s.length);
});

check('spaces and newlines are preserved', () => {
  assert.equal(toSmallCaps('a b'), 'ᴀ ʙ');
  assert.equal(toSmallCaps('a\nb'), 'ᴀ\nʙ');
});

check('empty string', () => {
  assert.equal(toSmallCaps(''), '');
});

check('validation', () => {
  assert.throws(() => toSmallCaps(42), /must be a string/);
  assert.throws(() => toSmallCaps(null), /must be a string/);
});

console.log(`\n${n} checks passed.`);
