import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { buildSquare, charToCoord, coordToChar, clean, trifidEncrypt, trifidDecrypt } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('buildSquare with no keyword is the 27-symbol alphabet', () => {
  assert.equal(buildSquare(''), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ+');
  assert.equal(buildSquare('').length, 27);
});

check('buildSquare seeds a keyword, dedupes, keeps 27 unique symbols', () => {
  const sq = buildSquare('FELIX');
  assert.ok(sq.startsWith('FELIX'));
  assert.equal(sq.length, 27);
  assert.equal(new Set(sq).size, 27);
  assert.ok(sq.includes('+'));
});

check('charToCoord / coordToChar round-trip over all 27 cells', () => {
  const sq = buildSquare('');
  for (let i = 0; i < 27; i++) {
    const ch = sq[i];
    const [l, r, c] = charToCoord(sq, ch);
    assert.equal(coordToChar(sq, l, r, c), ch);
    assert.equal(l * 9 + r * 3 + c, i);
    assert.ok(l >= 0 && l < 3 && r >= 0 && r < 3 && c >= 0 && c < 3);
  }
});

check('clean keeps A-Z and +, upper-cases, drops the rest', () => {
  assert.equal(clean('De fend!23'), 'DEFEND');
  assert.equal(clean('a+b'), 'A+B');
});

check('hand-computed vector: HI -> CX (whole message)', () => {
  assert.equal(trifidEncrypt('HI', '', 0), 'CX');
});

check('decrypt reverses the vector', () => {
  assert.equal(trifidDecrypt('CX', '', 0), 'HI');
});

check('encrypt then decrypt round-trips (whole message)', () => {
  const msg = 'DEFENDTHEEASTWALL';
  assert.equal(trifidDecrypt(trifidEncrypt(msg, '', 0), '', 0), msg);
});

check('round-trips with a keyword and period 5', () => {
  const msg = clean('attack at dawn from the north');
  assert.equal(trifidDecrypt(trifidEncrypt(msg, 'FELIX', 5), 'FELIX', 5), msg);
});

check('round-trips with period 3', () => {
  const msg = 'THEQUICKBROWNFOX';
  assert.equal(trifidDecrypt(trifidEncrypt(msg, 'CIPHER', 3), 'CIPHER', 3), msg);
  assert.equal(trifidEncrypt(msg, 'CIPHER', 3).length, msg.length);
});

check('validation and edges', () => {
  assert.equal(trifidEncrypt('', '', 0), '');
  assert.throws(() => charToCoord(buildSquare(''), '#'), /not in cube/);
});

console.log(`\n${n} checks passed.`);
