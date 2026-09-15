import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { dividendYield, annualIncome, yieldOnCost, dividendFromYield, perPayment } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b} (±${eps})`);

check('dividend yield = dividend / price', () => {
  near(dividendYield(2, 50), 4, 1e-9);
  near(dividendYield(1.5, 30), 5, 1e-9);
});

check('annual income = shares × dividend', () => {
  near(annualIncome(100, 2), 200, 1e-9);
  near(annualIncome(0, 2), 0, 1e-9);
});

check('yield on cost uses the original cost basis', () => {
  near(yieldOnCost(2, 40), 5, 1e-9);   // higher than 4% current yield
  assert.ok(yieldOnCost(2, 40) > dividendYield(2, 50));
});

check('dividend from yield inverts dividend yield', () => {
  near(dividendFromYield(50, 4), 2, 1e-9);
  near(dividendFromYield(50, dividendYield(2, 50)), 2, 1e-9);
});

check('per-payment splits annual by frequency', () => {
  near(perPayment(200, 4), 50, 1e-9);    // quarterly
  near(perPayment(240, 12), 20, 1e-9);   // monthly
});

check('zero dividend → zero yield and income', () => {
  near(dividendYield(0, 50), 0, 1e-9);
  near(annualIncome(100, 0), 0, 1e-9);
});

check('income scales with shares', () => {
  near(annualIncome(200, 2), 2 * annualIncome(100, 2), 1e-9);
});

check('yield scales inversely with price', () => {
  assert.ok(dividendYield(2, 25) > dividendYield(2, 50));
  near(dividendYield(2, 25), 8, 1e-9);
});

check('per-payment and monthly consistency', () => {
  const income = annualIncome(100, 2);   // 200
  near(perPayment(income, 12), income / 12, 1e-9);
});

check('validation', () => {
  assert.throws(() => dividendYield(2, 0), /positive/);
  assert.throws(() => yieldOnCost(2, 0), /positive/);
  assert.throws(() => perPayment(200, 0), /positive/);
  assert.throws(() => dividendYield('x', 50), /numbers/);
});

console.log(`\n${n} checks passed.`);
