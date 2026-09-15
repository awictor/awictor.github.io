import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { paybackPeriod, discountedPaybackPeriod, cumulative } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b} (±${eps})`);

check('even cash flows', () => {
  near(paybackPeriod(1000, [500, 500, 500]), 2, 1e-9);
});

check('fractional final period', () => {
  near(paybackPeriod(1000, [600, 600]), 1 + 400 / 600, 1e-9);
  near(paybackPeriod(1000, [2000]), 0.5, 1e-9);
});

check('single flow that exactly covers = 1.0', () => {
  near(paybackPeriod(1000, [1000]), 1, 1e-9);
});

check('never recovered returns null', () => {
  assert.equal(paybackPeriod(1000, [300, 300]), null);
});

check('uneven flows', () => {
  // 1000 investment, flows 300,400,400 → after 2 periods cum=700, need 300 of the 400 → 2 + 300/400
  near(paybackPeriod(1000, [300, 400, 400]), 2 + 300 / 400, 1e-9);
});

check('discounted payback is longer than simple', () => {
  const s = paybackPeriod(1000, [500, 500, 500]);
  const d = discountedPaybackPeriod(1000, [500, 500, 500], 10);
  assert.ok(d > s);
});

check('discounted at 0% equals simple', () => {
  near(discountedPaybackPeriod(1000, [400, 400, 400], 0), paybackPeriod(1000, [400, 400, 400]), 1e-9);
});

check('cumulative series', () => {
  assert.deepEqual(cumulative(1000, [300, 400, 400]), [-700, -300, 100]);
});

check('zero investment pays back immediately', () => {
  assert.equal(paybackPeriod(0, [100]), 0);
});

check('validation', () => {
  assert.throws(() => paybackPeriod(-5, [100]), /non-negative/);
  assert.throws(() => paybackPeriod('x', [100]), /numbers/);
});

console.log(`\n${n} checks passed.`);
