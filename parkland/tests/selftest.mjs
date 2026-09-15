import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { parkland } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b} (±${eps})`);

check('classic example: 70 kg, 30% TBSA', () => {
  const r = parkland(70, 30);
  assert.equal(r.total, 8400);       // 4 × 70 × 30
  assert.equal(r.first8h, 4200);
  assert.equal(r.next16h, 4200);
  near(r.rateFirst8, 525, 1e-9);     // 4200 / 8
  near(r.rateNext16, 262.5, 1e-9);   // 4200 / 16
});

check('total = 4 × weight × TBSA by default', () => {
  assert.equal(parkland(80, 25).total, 4 * 80 * 25);
});

check('the two halves are equal', () => {
  const r = parkland(65, 40);
  assert.equal(r.first8h, r.next16h);
  near(r.first8h + r.next16h, r.total, 1e-9);
});

check('first-8h rate is double the next-16h rate', () => {
  const r = parkland(90, 50);
  near(r.rateFirst8, 2 * r.rateNext16, 1e-9);
});

check('rates derive correctly (total/16 and total/32)', () => {
  const r = parkland(70, 30);
  near(r.rateFirst8, r.total / 16, 1e-9);
  near(r.rateNext16, r.total / 32, 1e-9);
});

check('linear in weight and TBSA', () => {
  assert.equal(parkland(140, 30).total, 2 * parkland(70, 30).total);
  assert.equal(parkland(70, 60).total, 2 * parkland(70, 30).total);
});

check('custom mL/kg factor (modified Brooke ~2 mL)', () => {
  assert.equal(parkland(70, 30, 2).total, 2 * 70 * 30);
  assert.equal(parkland(70, 30, 3).total, 3 * 70 * 30);
});

check('0% TBSA gives no fluid', () => {
  assert.equal(parkland(70, 0).total, 0);
});

check('100% TBSA is allowed', () => {
  assert.equal(parkland(70, 100).total, 4 * 70 * 100);
});

check('validation', () => {
  assert.throws(() => parkland(0, 30), /positive/);
  assert.throws(() => parkland(70, 120), /between 0 and 100/);
  assert.throws(() => parkland('x', 30), /numbers/);
});

console.log(`\n${n} checks passed.`);
