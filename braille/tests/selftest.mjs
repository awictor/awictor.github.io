import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { LETTERS, toBraille, fromBraille } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('letters map to standard patterns', () => {
  assert.equal(toBraille('a'), '⠁');
  assert.equal(toBraille('hi'), '⠓⠊');
  assert.equal(LETTERS.z, '⠵');
});

check('capital sign before uppercase', () => {
  assert.equal(toBraille('A'), '⠠⠁');
  assert.equal(toBraille('Hi'), '⠠⠓⠊');
});

check('number sign starts a digit run; digits reuse a–j', () => {
  assert.equal(toBraille('1'), '⠼⠁');
  assert.equal(toBraille('123'), '⠼⠁⠃⠉');
  assert.equal(toBraille('0'), '⠼⠚');
});

check('space resets number mode and uses the blank cell', () => {
  assert.equal(toBraille('a b'), '⠁⠀⠃');
  assert.equal(toBraille('1 2'), '⠼⠁⠀⠼⠃');   // number sign repeats after space
});

check('punctuation', () => {
  assert.equal(toBraille('a.'), '⠁⠲');
  assert.equal(toBraille('hi!'), '⠓⠊⠖');
});

check('fromBraille decodes letters', () => {
  assert.equal(fromBraille('⠓⠊'), 'hi');
  assert.equal(fromBraille('⠠⠓⠊'), 'Hi');
});

check('fromBraille decodes numbers', () => {
  assert.equal(fromBraille('⠼⠁⠃⠉'), '123');
  assert.equal(fromBraille('⠼⠚'), '0');
});

check('round-trips text with caps, numbers, spaces, punctuation', () => {
  for(const s of ['Hello World 123', 'The cat sat.', 'ABC xyz 0', 'a, b; c: d?']){
    assert.equal(fromBraille(toBraille(s)), s);
  }
});

check('lowercase and spacing preserved', () => {
  assert.equal(fromBraille(toBraille('cat')), 'cat');
  assert.equal(fromBraille(toBraille('two words')), 'two words');
});

check('unmapped characters pass through both ways', () => {
  assert.equal(toBraille('~'), '~');
  assert.equal(fromBraille('~'), '~');
  assert.equal(fromBraille(toBraille('a~b')), 'a~b');
});

console.log(`\n${n} checks passed.`);
