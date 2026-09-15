import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { sumOfDigits, earnedFraction, earnedInterest, unearnedInterest } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, e = 1e-9) => assert.ok(Math.abs(a - b) <= e, `${a} vs ${b}`);

check('the 78 in Rule of 78: sum of 1..12', () => {
  assert.equal(sumOfDigits(12), 78);
  assert.equal(sumOfDigits(11), 66);
  assert.equal(sumOfDigits(1), 1);
});

check('earned fraction is 0 at start, 1 at end', () => {
  near(earnedFraction(12, 0), 0);
  near(earnedFraction(12, 12), 1);
});

check("month 1 earns 12/78 of a 12-month loan's interest", () => {
  near(earnedFraction(12, 1), 12 / 78);
});

check('earned + unearned = total finance charge', () => {
  for (const m of [0, 3, 6, 9, 12]) near(earnedInterest(1000, 12, m) + unearnedInterest(1000, 12, m), 1000);
});

check('unearned is full at start and zero at payoff', () => {
  near(unearnedInterest(1000, 12, 0), 1000);
  near(unearnedInterest(1000, 12, 12), 0);
});

check('the classic example: $1000, 12 mo, paid off at month 6 → $269.23 rebate', () => {
  assert.ok(Math.abs(unearnedInterest(1000, 12, 6) - 269.230769) < 1e-5);
  near(unearnedInterest(1000, 12, 6), 1000 * 6 * 7 / (12 * 13));
});

check('interest is front-loaded (past halfway by mid-term)', () => {
  assert.ok(earnedFraction(12, 6) > 0.5);
  near(earnedFraction(12, 6), 114 / 156);
});

check('earned interest increases monotonically with payments', () => {
  for (let m = 1; m <= 12; m++) assert.ok(earnedInterest(1000, 12, m) > earnedInterest(1000, 12, m - 1));
});

check('unearnedInterest matches the closed form for any term', () => {
  for (const [N, m] of [[24, 10], [36, 12], [6, 3]]) {
    near(unearnedInterest(500, N, m), 500 * (N - m) * (N - m + 1) / (N * (N + 1)));
  }
});

check('validation: bad term, payments, and negative charge throw', () => {
  assert.throws(() => sumOfDigits(0), /positive integer/);
  assert.throws(() => earnedFraction(12, 13), /between 0 and the term/);
  assert.throws(() => earnedFraction(12, -1), /between 0 and the term/);
  assert.throws(() => earnedInterest(-100, 12, 6), /zero or positive/);
});

console.log(`\n${n} checks passed.`);
