import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { multiplyingTime, doublingTime, ruleOf, impliedRate } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b} (±${eps})`);

check('exact doubling time = ln2 / ln(1+r)', () => {
  near(doublingTime(10), Math.log(2) / Math.log(1.1), 1e-9);  // ≈ 7.2725
  near(doublingTime(10), 7.2725, 1e-3);
});

check('after the doubling time the balance is exactly doubled', () => {
  const t = doublingTime(8);
  near(Math.pow(1.08, t), 2, 1e-9);
});

check('tripling and 10x times', () => {
  near(multiplyingTime(10, 3), Math.log(3) / Math.log(1.1), 1e-9);  // ≈ 11.527
  near(multiplyingTime(10, 10), Math.log(10) / Math.log(1.1), 1e-9);
});

check('Rule of N estimate = N / rate', () => {
  near(ruleOf(72, 10), 7.2, 1e-9);
  near(ruleOf(70, 10), 7.0, 1e-9);
  near(ruleOf(69.3, 10), 6.93, 1e-9);
});

check('Rule of 72 is close to exact for everyday rates', () => {
  for(const rate of [6, 8, 10]){
    assert.ok(Math.abs(ruleOf(72, rate) - doublingTime(rate)) < 0.5);
  }
});

check('impliedRate inverts doublingTime', () => {
  const t = doublingTime(10);
  near(impliedRate(t, 2), 10, 1e-6);
  near(impliedRate(10, 2), (Math.pow(2, 0.1) - 1) * 100, 1e-9); // ≈ 7.177
});

check('higher rate → shorter doubling time', () => {
  assert.ok(doublingTime(12) < doublingTime(6));
});

check('69.3 rule tracks continuous-compounding intuition', () => {
  // For small rates the exact doubling time sits between rule-of-69.3 and rule-of-72
  const rate = 4;
  assert.ok(ruleOf(69.3, rate) < doublingTime(rate));
  assert.ok(doublingTime(rate) < ruleOf(72, rate));
});

check('multiplyingTime factor > double takes longer', () => {
  assert.ok(multiplyingTime(10, 3) > doublingTime(10));
});

check('validation', () => {
  assert.throws(() => doublingTime(0), /rate/);
  assert.throws(() => doublingTime(-5), /rate/);
  assert.throws(() => multiplyingTime(10, 1), /factor/);
  assert.throws(() => ruleOf(72, 0), /rate/);
  assert.throws(() => impliedRate(0), /years/);
});

console.log(`\n${n} checks passed.`);
