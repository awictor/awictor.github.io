import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { category, maxDebtForRatio, analyze } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps = 1e-9) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b}`);

check('front/back ratios', () => {
  const a = analyze(6000, 1500, 500);
  near(a.front, 0.25);              // 1500 / 6000
  near(a.back, 2000 / 6000);       // (1500+500) / 6000
  assert.equal(a.totalDebt, 2000);
});

check('back-end always ≥ front-end (housing is in both)', () => {
  const a = analyze(5000, 1200, 800);
  assert.ok(a.back >= a.front);
});

check('with no other debt, front equals back', () => {
  const a = analyze(4000, 1000, 0);
  near(a.front, a.back);
});

check('28/36 flags', () => {
  const good = analyze(10000, 2000, 500);  // front .20, back .25
  assert.equal(good.frontOk, true);
  assert.equal(good.backOk, true);
  const bad = analyze(4000, 1400, 400);    // front .35, back .45
  assert.equal(bad.frontOk, false);
  assert.equal(bad.backOk, false);
});

check('category by back-end ratio', () => {
  assert.equal(category(0.30).name, 'Good');
  assert.equal(category(0.40).name, 'Manageable');
  assert.equal(category(0.50).name, 'High');
});

check('category boundaries are inclusive (≤)', () => {
  assert.equal(category(0.36).name, 'Good');
  assert.equal(category(0.43).name, 'Manageable');
  assert.equal(category(0.4300001).name, 'High');
});

check('maxDebtForRatio', () => {
  assert.equal(maxDebtForRatio(6000, 0.36), 2160);
  assert.equal(maxDebtForRatio(5000, 0.43), 2150);
});

check('roomTo36 shows remaining borrowing capacity', () => {
  const a = analyze(6000, 1500, 500);      // total 2000, 36% cap = 2160
  near(a.roomTo36, 160);
  const over = analyze(6000, 2000, 500);   // total 2500, cap 2160 -> -340
  near(over.roomTo36, -340);
});

check('category reflects the analyzed back ratio', () => {
  assert.equal(analyze(6000, 1500, 500).category.name, 'Good');   // .333
  assert.equal(analyze(5000, 1500, 600).category.name, 'Manageable'); // .42
  assert.equal(analyze(4000, 1400, 600).category.name, 'High');   // .5
});

check('validation', () => {
  assert.throws(() => analyze(0, 1000, 0), /income/);
  assert.throws(() => analyze(5000, -1, 0), /debts/);
  assert.throws(() => analyze('x', 1000, 0), /numbers/);
  assert.throws(() => maxDebtForRatio(0, 0.36), /income/);
});

console.log(`\n${n} checks passed.`);
