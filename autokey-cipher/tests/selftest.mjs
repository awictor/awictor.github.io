import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { clean, autokeyEncrypt, autokeyDecrypt } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('clean keeps only letters, upper-cased', () => {
  assert.equal(clean('He llo!23'), 'HELLO');
  assert.equal(clean(''), '');
});

check('hand-computed vector: HELLO with key KEY -> RIJSS', () => {
  assert.equal(autokeyEncrypt('HELLO', 'KEY'), 'RIJSS');
});

check('decrypt reverses the hand-computed vector', () => {
  assert.equal(autokeyDecrypt('RIJSS', 'KEY'), 'HELLO');
});

check('encrypt/decrypt round-trips', () => {
  for (const [pt, key] of [['ATTACKATDAWN', 'LEMON'], ['MEETMEATTHEFOUNTAIN', 'KILT'], ['A', 'Z'], ['THEQUICKBROWNFOX', 'KEY']]) {
    assert.equal(autokeyDecrypt(autokeyEncrypt(pt, key), key), pt);
  }
});

check('non-letters are stripped before enciphering', () => {
  assert.equal(autokeyEncrypt('he-llo', 'key'), 'RIJSS');
});

check('keyword is case-insensitive', () => {
  assert.equal(autokeyEncrypt('HELLO', 'key'), autokeyEncrypt('HELLO', 'KEY'));
});

check('a keyword longer than the text still works', () => {
  const ct = autokeyEncrypt('HI', 'VERYLONGKEYWORD');
  assert.equal(autokeyDecrypt(ct, 'VERYLONGKEYWORD'), 'HI');
});

check('a single-letter keyword round-trips', () => {
  assert.equal(autokeyDecrypt(autokeyEncrypt('SECRETMESSAGE', 'A'), 'A'), 'SECRETMESSAGE');
  // key 'A' = shift 0 for the first char, then plaintext keys the rest
});

check('ciphertext preserves length and generally differs from plaintext', () => {
  const pt = 'ATTACKATDAWN';
  const ct = autokeyEncrypt(pt, 'LEMON');
  assert.equal(ct.length, pt.length);
  assert.notEqual(ct, pt);
});

check('validation: empty keyword throws', () => {
  assert.throws(() => autokeyEncrypt('HELLO', ''), /at least one letter/);
  assert.throws(() => autokeyDecrypt('RIJSS', '123'), /at least one letter/);
});

console.log(`\n${n} checks passed.`);
