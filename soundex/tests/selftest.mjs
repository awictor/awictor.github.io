import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { soundex, soundsAlike } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('canonical Robert / Rupert = R163', () => {
  assert.equal(soundex('Robert'), 'R163');
  assert.equal(soundex('Rupert'), 'R163');
});

check('Rubin = R150 (padded)', () => {
  assert.equal(soundex('Rubin'), 'R150');
});

check('adjacent same-code after first letter is dropped (Pfister = P236)', () => {
  assert.equal(soundex('Pfister'), 'P236');
});

check('doubled coded letters count once (Tymczak = T522)', () => {
  assert.equal(soundex('Tymczak'), 'T522');
});

check('vowels separate equal codes (Honeyman = H555)', () => {
  assert.equal(soundex('Honeyman'), 'H555');
});

check('H/W merge equal codes (Ashcraft = A261)', () => {
  assert.equal(soundex('Ashcraft'), 'A261');
  assert.equal(soundex('Ashcroft'), 'A261');
});

check('always a letter + 3 digits', () => {
  for(const w of ['Lee', 'Gauss', 'Wu', 'Jackson', 'Washington']){
    assert.match(soundex(w), /^[A-Z][0-9]{3}$/);
  }
});

check('case-insensitive and ignores non-letters', () => {
  assert.equal(soundex('robert'), soundex('ROBERT'));
  assert.equal(soundex("O'Brien"), soundex('OBrien'));
});

check('soundsAlike groups similar names', () => {
  assert.equal(soundsAlike('Robert', 'Rupert'), true);
  assert.equal(soundsAlike('Smith', 'Smyth'), true);
  assert.equal(soundsAlike('Robert', 'Smith'), false);
});

check('empty / non-alpha input', () => {
  assert.equal(soundex(''), '');
  assert.equal(soundex('123'), '');
  assert.equal(soundsAlike('', ''), false);
  assert.equal(soundex('A'), 'A000');
});

console.log(`\n${n} checks passed.`);
