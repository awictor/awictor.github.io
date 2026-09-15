import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { buildSquare, prepareText, encrypt, decrypt } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('buildSquare — classic Wikipedia key', () => {
  assert.equal(buildSquare('playfair example'), 'PLAYFIREXMBCDGHKNOQSTUVWZ');
  assert.equal(buildSquare('playfair example').length, 25);
});

check('buildSquare — empty key = alphabet without J', () => {
  assert.equal(buildSquare(''), 'ABCDEFGHIKLMNOPQRSTUVWXYZ');
  assert.ok(!buildSquare('').includes('J'));
});

check('buildSquare — J folds into I, dedupes', () => {
  assert.equal(buildSquare('jazz')[0], 'I');           // J -> I
  assert.ok(!buildSquare('jazz').includes('J'));
  assert.equal(buildSquare('MONARCHY').slice(0, 8), 'MONARCHY'); // no dup, keyword intact
});

check('prepareText — inserts X between doubles', () => {
  assert.deepEqual(prepareText('balloon'), ['BA', 'LX', 'LO', 'ON']);
});

check('prepareText — pads odd final letter', () => {
  assert.deepEqual(prepareText('hi'), ['HI']);
  assert.deepEqual(prepareText('a'), ['AX']);
  assert.deepEqual(prepareText('xx'), ['XZ', 'XZ']); // doubled X uses Z filler, then trailing X padded with Z
});

check('prepareText — J maps to I, non-letters stripped', () => {
  assert.deepEqual(prepareText('J.a-z z'), prepareText('IAZZ'));
  assert.ok(prepareText('jump').every(p => !p.includes('J')));
});

check('encrypt — canonical Playfair vector', () => {
  assert.equal(encrypt('hide the gold in the tree stump', 'playfair example'),
    'BMODZBXDNABEKUDMUIXMMOUVIF');
});

check('rectangle rule: HI -> BM under classic square', () => {
  assert.equal(encrypt('hi', 'playfair example'), 'BM');
});

check('decrypt inverts encrypt (recovers prepared text)', () => {
  const key = 'secretkey';
  const prepared = prepareText('meet me at the cafe').join('');
  const ct = encrypt('meet me at the cafe', key);
  assert.equal(decrypt(ct, key), prepared);
  // canonical decrypt too
  assert.equal(decrypt('BMODZBXDNABEKUDMUIXMMOUVIF', 'playfair example'),
    prepareText('hide the gold in the tree stump').join(''));
});

check('ciphertext length is even and matches digraph count', () => {
  const ct = encrypt('the quick brown fox', 'zebra');
  assert.equal(ct.length % 2, 0);
  assert.equal(ct.length, prepareText('the quick brown fox').length * 2);
});

console.log(`\n${n} checks passed.`);
