import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { sumSquareDigits, chain, isHappy, happyUpTo } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('sum of squared digits', () => {
  assert.equal(sumSquareDigits(19), 82);   // 1 + 81
  assert.equal(sumSquareDigits(7), 49);
  assert.equal(sumSquareDigits(100), 1);
});

check('19 is happy with the expected chain', () => {
  assert.equal(isHappy(19), true);
  assert.deepEqual(chain(19), [19, 82, 68, 100, 1]);
});

check('1 and 7 are happy', () => {
  assert.equal(isHappy(1), true);
  assert.equal(isHappy(7), true);
});

check('4 is unhappy (enters the 4-cycle)', () => {
  assert.equal(isHappy(4), false);
  const c = chain(4);
  assert.equal(c[c.length - 1] !== 1, true);
});

check('a spread of happy numbers', () => {
  for (const x of [10, 13, 23, 28, 31, 32, 44, 49]) assert.equal(isHappy(x), true);
});

check('a spread of unhappy numbers', () => {
  for (const x of [2, 3, 4, 5, 6, 8, 9, 20]) assert.equal(isHappy(x), false);
});

check('happyUpTo(50)', () => {
  assert.deepEqual(happyUpTo(50), [1, 7, 10, 13, 19, 23, 28, 31, 32, 44, 49]);
});

check('chain terminates (never infinite)', () => {
  for (let i = 1; i <= 200; i++) {
    const c = chain(i);
    assert.ok(c.length >= 1 && c.length < 100);
  }
});

check('happyUpTo is consistent with isHappy', () => {
  const set = new Set(happyUpTo(100));
  for (let i = 1; i <= 100; i++) assert.equal(set.has(i), isHappy(i));
});

check('validation: values below 1 and non-integers throw', () => {
  assert.throws(() => isHappy(0), /1 or more/);
  assert.throws(() => sumSquareDigits(-5), /1 or more/);
  assert.throws(() => happyUpTo(2.5), /1 or more/);
});

console.log(`\n${n} checks passed.`);
