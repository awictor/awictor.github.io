import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { buildSquare, charToRC, rcToChar, cleanText, bifidEncrypt, bifidDecrypt } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('buildSquare with no keyword is the standard J-less alphabet', () => {
  assert.equal(buildSquare(''), 'ABCDEFGHIKLMNOPQRSTUVWXYZ');
  assert.equal(buildSquare('').length, 25);
});

check('buildSquare seeds a keyword, dedupes, folds J into I, drops non-letters', () => {
  const sq = buildSquare('Jazz Jive!');
  assert.ok(sq.startsWith('IAZV')); // J->I, A, Z, (z dup dropped), then jive -> I dup, V, E... starts IAZV
  assert.equal(sq.length, 25);
  assert.equal(new Set(sq).size, 25); // all unique
  assert.ok(!sq.includes('J'));
});

check('charToRC / rcToChar round-trip for every cell', () => {
  const sq = buildSquare('');
  for (let i = 0; i < 25; i++) {
    const ch = sq[i];
    const [r, c] = charToRC(sq, ch);
    assert.equal(rcToChar(sq, r, c), ch);
    assert.equal(r * 5 + c, i);
  }
});

check('cleanText uppercases, folds J, strips non-letters', () => {
  assert.equal(cleanText('Jazz, 42 Bee!'), 'IAZZBEE');
  assert.equal(cleanText(''), '');
});

check('encrypt("HI") = "GO" (hand-computed)', () => {
  // H=(1,2), I=(1,3) 0-based -> rows[1,1] cols[2,3] -> seq 1,1,2,3 -> (1,2)=G,(2,3)=O
  assert.equal(bifidEncrypt('HI', '', 0), 'GO');
});

check('decrypt("GO") = "HI"', () => {
  assert.equal(bifidDecrypt('GO', '', 0), 'HI');
});

check('a single letter maps to itself', () => {
  assert.equal(bifidEncrypt('A', '', 0), 'A');
  assert.equal(bifidEncrypt('C', '', 0), 'C');
});

check('encrypt then decrypt round-trips (whole message)', () => {
  const msg = 'DEFENDTHEEASTWALL';
  assert.equal(bifidDecrypt(bifidEncrypt(msg, '', 0), '', 0), msg);
});

check('round-trips with a keyword and a period', () => {
  const msg = cleanText('attack at dawn from the north');
  assert.equal(bifidDecrypt(bifidEncrypt(msg, 'FORTIFY', 5), 'FORTIFY', 5), msg);
  assert.equal(bifidDecrypt(bifidEncrypt(msg, 'SECRET', 7), 'SECRET', 7), msg);
});

check('validation and edge cases', () => {
  assert.equal(bifidEncrypt('', '', 0), '');
  assert.throws(() => charToRC(buildSquare(''), 'J'), /not in square/); // J is not stored (folded to I)
});

console.log(`\n${n} checks passed.`);
