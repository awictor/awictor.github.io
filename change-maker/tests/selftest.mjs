import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { USD, toCents, makeChange, totalCount, changeDue } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('toCents rounds to whole cents', () => {
  assert.equal(toCents(2.87), 287);
  assert.equal(toCents(19.99), 1999);
  assert.equal(toCents(0.1 + 0.2), 30); // float safety
});

check('makeChange of $2.87', () => {
  assert.deepEqual(makeChange(287), [
    { label: '$1', value: 100, count: 2 },
    { label: '25¢', value: 25, count: 3 },
    { label: '10¢', value: 10, count: 1 },
    { label: '1¢', value: 1, count: 2 }
  ]);
});

check('makeChange of exact denominations', () => {
  assert.deepEqual(makeChange(100), [{ label: '$1', value: 100, count: 1 }]);
  assert.deepEqual(makeChange(5000), [{ label: '$50', value: 5000, count: 1 }]);
});

check('makeChange of 0 is empty', () => {
  assert.deepEqual(makeChange(0), []);
});

check('breakdown always sums back to the amount', () => {
  for(const c of [1, 99, 287, 1234, 9999, 100000]){
    const sum = makeChange(c).reduce((s, b) => s + b.value * b.count, 0);
    assert.equal(sum, c);
  }
});

check('totalCount adds up the pieces', () => {
  assert.equal(totalCount(makeChange(287)), 8); // 2+3+1+2
  assert.equal(totalCount(makeChange(0)), 0);
});

check('makeChange rejects non-integer / negative', () => {
  assert.throws(() => makeChange(1.5), /non-negative integer/);
  assert.throws(() => makeChange(-100), /non-negative integer/);
});

check('changeDue subtracts', () => {
  assert.equal(changeDue(1345, 2000), 655);
  assert.equal(changeDue(500, 500), 0);
});

check('changeDue rejects underpayment', () => {
  assert.throws(() => changeDue(2000, 1500), /less than the price/);
});

check('USD denominations are sorted high-to-low', () => {
  for(let i = 1; i < USD.length; i++) assert.ok(USD[i].v < USD[i - 1].v);
  assert.equal(USD[0].v, 10000);
  assert.equal(USD[USD.length - 1].v, 1);
});

console.log(`\n${n} checks passed.`);
