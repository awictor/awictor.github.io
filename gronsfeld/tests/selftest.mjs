import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { encrypt, decrypt } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('basic shifts (HELLO / 12345)', () => {
  // H+1=I, E+2=G, L+3=O, L+4=P, O+5=T
  assert.equal(encrypt('HELLO', '12345'), 'IGOPT');
});

check('decrypt inverts encrypt', () => {
  assert.equal(decrypt('IGOPT', '12345'), 'HELLO');
  assert.equal(decrypt(encrypt('ATTACKATDAWN', '31415'), '31415'), 'ATTACKATDAWN');
});

check('digit 0 leaves the letter unchanged', () => {
  assert.equal(encrypt('ABC', '000'), 'ABC');
});

check('wraps around Z', () => {
  assert.equal(encrypt('Z', '1'), 'A');
  assert.equal(decrypt('A', '1'), 'Z');
});

check('key cycles over the message', () => {
  // ABCDEF with key 12 → A+1,B+2,C+1,D+2,E+1,F+2
  assert.equal(encrypt('ABCDEF', '12'), 'BDDFFH');
});

check('case is preserved', () => {
  assert.equal(encrypt('abc', '111'), 'bcd');
  assert.equal(encrypt('Hello', '11111'), 'Ifmmp');
});

check('non-letters pass through and do not consume a key digit', () => {
  // key "12": A uses 1 → B, space passes, B uses 2 → D
  assert.equal(encrypt('A B', '12'), 'B D');
  assert.equal(encrypt('a-b', '12'), 'b-d');
});

check('round-trips across mixed content', () => {
  const msg = 'The Quick Brown Fox 42!';
  assert.equal(decrypt(encrypt(msg, '31415'), '31415'), msg);
});

check('non-digit characters in the key are ignored', () => {
  assert.equal(encrypt('HELLO', '1-2-3-4-5'), encrypt('HELLO', '12345'));
});

check('empty key throws', () => {
  assert.throws(() => encrypt('HELLO', 'abc'), /at least one digit/);
  assert.throws(() => encrypt('HELLO', ''), /at least one digit/);
});

console.log(`\n${n} checks passed.`);
