import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { PX, toPx, convert } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b} (±${eps})`);

check('1 inch = 96px / 72pt / 6pc / 2.54cm / 25.4mm', () => {
  near(convert(1, 'in', 'px'), 96, 1e-9);
  near(convert(1, 'in', 'pt'), 72, 1e-9);
  near(convert(1, 'in', 'pc'), 6, 1e-9);
  near(convert(1, 'in', 'cm'), 2.54, 1e-9);
  near(convert(1, 'in', 'mm'), 25.4, 1e-9);
});

check('12pt = 16px', () => {
  near(convert(12, 'pt', 'px'), 16, 1e-9);
});

check('1pc = 12pt = 16px', () => {
  near(convert(1, 'pc', 'pt'), 12, 1e-9);
  near(convert(1, 'pc', 'px'), 16, 1e-9);
});

check('96px = 1in', () => {
  near(convert(96, 'px', 'in'), 1, 1e-9);
});

check('cm ↔ mm', () => {
  near(convert(1, 'cm', 'mm'), 10, 1e-9);
  near(convert(10, 'mm', 'cm'), 1, 1e-9);
});

check('same unit is identity', () => {
  near(convert(37.5, 'px', 'px'), 37.5, 1e-12);
});

check('round-trips', () => {
  near(convert(convert(16, 'px', 'pt'), 'pt', 'px'), 16, 1e-9);
  near(convert(convert(5, 'cm', 'in'), 'in', 'cm'), 5, 1e-9);
});

check('toPx factors', () => {
  near(toPx(1, 'in'), 96, 1e-9);
  near(toPx(1, 'pt'), 96 / 72, 1e-9);
  near(toPx(2, 'px'), 2, 1e-9);
});

check('scales linearly', () => {
  near(convert(2, 'in', 'px'), 2 * convert(1, 'in', 'px'), 1e-9);
});

check('validation', () => {
  assert.throws(() => convert(1, 'in', 'furlong'), /unknown unit/);
  assert.throws(() => toPx(1, 'xx'), /unknown unit/);
  assert.throws(() => toPx('x', 'px'), /numbers/);
});

console.log(`\n${n} checks passed.`);
