import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { weeklyPay } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps = 1e-9) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b}`);

check('exactly at the threshold: all regular', () => {
  const p = weeklyPay({ hours: 40, rate: 20 });
  assert.equal(p.regularHours, 40);
  assert.equal(p.otHours, 0);
  assert.equal(p.gross, 800);
});

check('overtime at 1.5x above 40', () => {
  const p = weeklyPay({ hours: 45, rate: 20 });
  assert.equal(p.regularHours, 40);
  assert.equal(p.otHours, 5);
  assert.equal(p.regularPay, 800);
  assert.equal(p.otPay, 5 * 20 * 1.5); // 150
  assert.equal(p.gross, 950);
});

check('under threshold: only regular', () => {
  const p = weeklyPay({ hours: 30, rate: 20 });
  assert.equal(p.regularHours, 30);
  assert.equal(p.otHours, 0);
  assert.equal(p.gross, 600);
});

check('double-time band above dtThreshold', () => {
  const p = weeklyPay({ hours: 50, rate: 20, dtThreshold: 48 });
  assert.equal(p.regularHours, 40);
  assert.equal(p.otHours, 8);   // 48 - 40
  assert.equal(p.dtHours, 2);   // 50 - 48
  assert.equal(p.otPay, 8 * 20 * 1.5);  // 240
  assert.equal(p.dtPay, 2 * 20 * 2);    // 80
  assert.equal(p.gross, 800 + 240 + 80); // 1120
});

check('custom OT threshold and multiplier', () => {
  const p = weeklyPay({ hours: 40, rate: 10, otThreshold: 35, otMultiplier: 2 });
  assert.equal(p.regularHours, 35);
  assert.equal(p.otHours, 5);
  assert.equal(p.gross, 35 * 10 + 5 * 10 * 2); // 350 + 100 = 450
});

check('zero hours → zero pay', () => {
  assert.equal(weeklyPay({ hours: 0, rate: 20 }).gross, 0);
});

check('no DT threshold means no double-time', () => {
  const p = weeklyPay({ hours: 60, rate: 20 });
  assert.equal(p.dtHours, 0);
  assert.equal(p.otHours, 20);
});

check('fractional hours', () => {
  const p = weeklyPay({ hours: 40.5, rate: 20 });
  near(p.otHours, 0.5);
  near(p.gross, 800 + 0.5 * 20 * 1.5);
});

check('rejects negative hours and rate', () => {
  assert.throws(() => weeklyPay({ hours: -1, rate: 20 }), /hours/);
  assert.throws(() => weeklyPay({ hours: 40, rate: -5 }), /rate/);
});

check('bands always sum to total hours', () => {
  const p = weeklyPay({ hours: 55, rate: 15, dtThreshold: 50 });
  near(p.regularHours + p.otHours + p.dtHours, 55);
});

console.log(`\n${n} checks passed.`);
