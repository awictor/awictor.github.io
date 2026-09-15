import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { digitPowerSum, isArmstrong, armstrongUpTo } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('153 is Armstrong (1^3+5^3+3^3)', () => {
  assert.equal(digitPowerSum(153), 153);
  assert.equal(isArmstrong(153), true);
});

check('all four 3-digit Armstrong numbers', () => {
  for (const x of [153, 370, 371, 407]) assert.equal(isArmstrong(x), true);
});

check('every single digit is Armstrong', () => {
  for (let d = 0; d <= 9; d++) assert.equal(isArmstrong(d), true);
});

check('9474 is a 4-digit Armstrong number', () => {
  assert.equal(digitPowerSum(9474), 9474);
  assert.equal(isArmstrong(9474), true);
});

check('non-Armstrong examples', () => {
  for (const x of [10, 100, 154, 200, 9475]) assert.equal(isArmstrong(x), false);
});

check('digitPowerSum uses the digit count as the exponent', () => {
  assert.equal(digitPowerSum(9), 9);       // 9^1
  assert.equal(digitPowerSum(10), 1);      // 1^2 + 0^2
  assert.equal(digitPowerSum(99), 162);    // 9^2 + 9^2
});

check('armstrongUpTo(500)', () => {
  assert.deepEqual(armstrongUpTo(500), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 153, 370, 371, 407]);
});

check('armstrongUpTo is consistent with isArmstrong', () => {
  const list = armstrongUpTo(1000);
  for (let i = 0; i <= 1000; i++) assert.equal(list.includes(i), isArmstrong(i));
});

check('the known 4-digit Armstrong numbers appear', () => {
  const list = armstrongUpTo(10000);
  for (const x of [1634, 8208, 9474]) assert.ok(list.includes(x));
});

check('validation: negatives and non-integers throw', () => {
  assert.throws(() => isArmstrong(-1), /non-negative whole number/);
  assert.throws(() => digitPowerSum(1.5), /non-negative whole number/);
  assert.throws(() => armstrongUpTo('x'), /non-negative whole number/);
});

console.log(`\n${n} checks passed.`);
