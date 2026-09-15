import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { raiseAmount, newSalary, pctFromNew, realRaisePct, realNewSalary } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b} (±${eps})`);

check('raise amount and new salary', () => {
  assert.equal(raiseAmount(50000, 5), 2500);
  assert.equal(newSalary(50000, 5), 52500);
});

check('percent from a new salary (inverse)', () => {
  assert.equal(pctFromNew(50000, 52500), 5);
  near(pctFromNew(60000, newSalary(60000, 3.5)), 3.5, 1e-9);
});

check('real raise beats inflation', () => {
  near(realRaisePct(5, 3), ((1.05 / 1.03) - 1) * 100, 1e-9);  // ≈ 1.94
  assert.ok(realRaisePct(5, 3) > 0);
});

check('real raise is zero when it matches inflation', () => {
  near(realRaisePct(3, 3), 0, 1e-9);
});

check('real raise is negative when below inflation', () => {
  assert.ok(realRaisePct(2, 5) < 0);
});

check('real new salary in today\'s dollars', () => {
  near(realNewSalary(50000, 5, 3), 52500 / 1.03, 1e-6);
  near(realNewSalary(50000, 3, 3), 50000, 1e-6);   // flat buying power
});

check('bigger raise → bigger real raise (fixed inflation)', () => {
  assert.ok(realRaisePct(6, 3) > realRaisePct(4, 3));
});

check('higher inflation → smaller real raise (fixed raise)', () => {
  assert.ok(realRaisePct(4, 5) < realRaisePct(4, 2));
});

check('zero raise', () => {
  assert.equal(raiseAmount(60000, 0), 0);
  assert.equal(newSalary(60000, 0), 60000);
  assert.ok(realRaisePct(0, 3) < 0);   // inflation erodes buying power
});

check('validation', () => {
  assert.throws(() => raiseAmount(-1, 5), /≥ 0/);
  assert.throws(() => raiseAmount('x', 5), /numbers/);
  assert.throws(() => realRaisePct(5, -100), /inflation/);
  assert.throws(() => pctFromNew(0, 100), /> 0/);
});

console.log(`\n${n} checks passed.`);
