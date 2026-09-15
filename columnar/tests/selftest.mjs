import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { columnOrder, encrypt, decrypt } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('column order by alphabetical key', () => {
  assert.deepEqual(columnOrder('CAB'), [1, 2, 0]);              // A,B,C
  assert.deepEqual(columnOrder('ZEBRAS'), [4, 2, 1, 3, 5, 0]);  // A,B,E,R,S,Z
});

check('duplicate key letters break ties left-to-right', () => {
  // "BATBOY": B(0) A(1) T(2) B(3) O(4) Y(5) → A,B,B,O,T,Y = [1,0,3,4,2,5]
  assert.deepEqual(columnOrder('BATBOY'), [1, 0, 3, 4, 2, 5]);
});

check('hand-computed vector (HELLOWORLD, key CAB)', () => {
  assert.equal(encrypt('HELLOWORLD', 'CAB'), 'EORXLWLXHLOD');
});

check('canonical ZEBRAS example', () => {
  assert.equal(encrypt('WE ARE DISCOVERED FLEE AT ONCE', 'ZEBRAS'),
    'EVLNXACDTXESEAXROFOXDEECXWIREE');
});

check('decrypt inverts encrypt (recovers padded plaintext)', () => {
  assert.equal(decrypt(encrypt('HELLOWORLD', 'CAB'), 'CAB'), 'HELLOWORLDXX');
  assert.equal(decrypt('EVLNXACDTXESEAXROFOXDEECXWIREE', 'ZEBRAS'),
    'WEAREDISCOVEREDFLEEATONCEXXXXX');   // 25 letters padded to 30 (5 X)
});

check('round-trip across keys and messages', () => {
  const key = 'SECRET';
  for (const msg of ['ATTACKATDAWN', 'THEQUICKBROWNFOX', 'A']) {
    const clean = msg.toUpperCase().replace(/[^A-Z]/g, '');
    const rt = decrypt(encrypt(msg, key), key);
    assert.ok(rt.startsWith(clean), `${rt} should start with ${clean}`);
  }
});

check('single-column key returns the letters unchanged', () => {
  assert.equal(encrypt('ABCDE', 'K'), 'ABCDE');
  assert.equal(decrypt('ABCDE', 'K'), 'ABCDE');
});

check('non-letters in the message are stripped', () => {
  assert.equal(encrypt('a b!c', 'CAB'), encrypt('ABC', 'CAB'));
});

check('padding fills the grid with X so columns are equal length', () => {
  const ct = encrypt('HELLO', 'CAB');   // 5 letters, 3 cols → 2 rows, pad 1
  assert.equal(ct.length, 6);
});

check('empty key throws', () => {
  assert.throws(() => encrypt('HELLO', '123'), /letters/);
  assert.throws(() => decrypt('HELLO', ''), /letters/);
});

console.log(`\n${n} checks passed.`);
