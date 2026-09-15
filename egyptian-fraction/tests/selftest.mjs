import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { gcd, egyptian, sumUnits } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('classic small decompositions', () => {
  assert.deepEqual(egyptian(3, 4), [2, 4]);
  assert.deepEqual(egyptian(5, 6), [2, 3]);
  assert.deepEqual(egyptian(2, 3), [2, 6]);
  assert.deepEqual(egyptian(1, 2), [2]);
});

check('the famous 6/7 = 1/2 + 1/3 + 1/42', () => {
  assert.deepEqual(egyptian(6, 7), [2, 3, 42]);
});

check('4/5 and 7/15', () => {
  assert.deepEqual(egyptian(4, 5), [2, 4, 20]);
  assert.deepEqual(egyptian(7, 15), [3, 8, 120]);
});

check('the fraction is reduced first: 6/8 behaves like 3/4', () => {
  assert.deepEqual(egyptian(6, 8), [2, 4]);
  assert.deepEqual(egyptian(50, 100), [2]);
});

check('denominators are strictly increasing and distinct', () => {
  for (const [a, b] of [[6, 7], [4, 5], [7, 15], [9, 20], [11, 12]]) {
    const t = egyptian(a, b);
    for (let i = 1; i < t.length; i++) assert.ok(t[i] > t[i - 1], `${a}/${b}: ${t}`);
  }
});

check('sumUnits inverts egyptian (exact reconstruction)', () => {
  for (const [a, b] of [[3, 4], [6, 7], [4, 5], [7, 15], [9, 20]]) {
    const g = gcd(a, b);
    assert.deepEqual(sumUnits(egyptian(a, b)), { num: a / g, den: b / g });
  }
});

check('every term is a genuine unit fraction summing correctly', () => {
  assert.deepEqual(sumUnits([2, 3, 42]), { num: 6, den: 7 });
  assert.deepEqual(sumUnits([2]), { num: 1, den: 2 });
});

check('gcd helper', () => {
  assert.equal(gcd(12, 8), 4);
  assert.equal(gcd(17, 5), 1);
  assert.equal(gcd(100, 100), 100);
});

check('a unit fraction expands to itself', () => {
  assert.deepEqual(egyptian(1, 7), [7]);
  assert.deepEqual(egyptian(1, 42), [42]);
});

check('validation: improper fractions and bad inputs throw', () => {
  assert.throws(() => egyptian(5, 4), /proper fraction/);
  assert.throws(() => egyptian(3, 3), /proper fraction/);
  assert.throws(() => egyptian(0, 5), /positive integer/);
  assert.throws(() => egyptian(2, 0), /positive integer/);
  assert.throws(() => egyptian(1.5, 4), /positive integer/);
});

console.log(`\n${n} checks passed.`);
