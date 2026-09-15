import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { npv, irr } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps = 1e-4) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b}`);

check('npv at 0% is just the sum of cash flows', () => {
  assert.equal(npv(0, [-100, 50, 50, 50]), 50);
});

check('npv discounts future flows', () => {
  near(npv(0.1, [-100, 60, 60]), -100 + 60 / 1.1 + 60 / 1.21);
});

check('npv rejects empty flows and rate <= -1', () => {
  assert.throws(() => npv(0.1, []), /cashflows required/);
  assert.throws(() => npv(-1, [-100, 50]), /greater than -1/);
});

check('irr of [-100, 110] is 10%', () => {
  near(irr([-100, 110]), 0.10);
});

check('irr of [-100, 0, 121] is 10%', () => {
  near(irr([-100, 0, 121]), 0.10);
});

check('irr makes npv(irr) ≈ 0', () => {
  const cf = [-1000, 300, 400, 500, 600];
  const r = irr(cf);
  assert.ok(r > 0 && r < 1);
  near(npv(r, cf), 0, 1e-3);
});

check('irr returns null when there is no sign change', () => {
  assert.equal(irr([100, 200, 300]), null);   // all positive
  assert.equal(irr([-100, -50, -20]), null);  // all negative
});

check('a higher discount rate lowers NPV', () => {
  const cf = [-1000, 300, 400, 500, 600];
  assert.ok(npv(0.05, cf) > npv(0.20, cf));
});

check('NPV equals zero exactly at the IRR', () => {
  const cf = [-500, 200, 200, 200];
  const r = irr(cf);
  near(npv(r, cf), 0, 1e-6);
});

check('negative-then-positive single period behaves', () => {
  near(npv(0.25, [-80, 100]), -80 + 100 / 1.25);
  near(irr([-80, 100]), 0.25);
});

console.log(`\n${n} checks passed.`);
