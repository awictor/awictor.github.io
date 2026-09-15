import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { correctedCalcium, correctedCalciumSI, category } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps = 1e-9) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b}`);

check('low albumin raises corrected calcium', () => {
  near(correctedCalcium(8.0, 2.0), 9.6);      // 8 + 0.8*2
  near(correctedCalcium(7.5, 2.5), 7.5 + 0.8 * 1.5);
});

check('normal albumin = no correction', () => {
  near(correctedCalcium(9.0, 4.0), 9.0);
  near(correctedCalcium(10.0, 4.0), 10.0);
});

check('high albumin lowers corrected calcium', () => {
  near(correctedCalcium(10.0, 5.0), 9.2);     // 10 + 0.8*(-1)
});

check('SI formula', () => {
  near(correctedCalciumSI(2.0, 20), 2.4);     // 2 + 0.02*20
  near(correctedCalciumSI(2.2, 40), 2.2);     // no correction at 40 g/L
});

check('category (US) bands', () => {
  assert.equal(category(9.0).name, 'Normal');
  assert.equal(category(8.0).name.startsWith('Low') ? 'Low' : 'x', 'Low');
  assert.equal(category(11.0).name.startsWith('High') ? 'High' : 'x', 'High');
});

check('category (US) boundaries', () => {
  assert.equal(category(8.5).name, 'Normal');
  assert.equal(category(10.2).name, 'Normal');
  assert.ok(category(8.4).name.startsWith('Low'));
  assert.ok(category(10.3).name.startsWith('High'));
});

check('category (SI) bands', () => {
  assert.equal(category(2.3, true).name, 'Normal');
  assert.ok(category(2.0, true).name.startsWith('Low'));
  assert.ok(category(2.7, true).name.startsWith('High'));
});

check('masked hypocalcemia surfaces after correction', () => {
  // measured 8.6 (looks "normal-ish") with low albumin 2.0 → corrected 10.2 (still normal top)
  near(correctedCalcium(8.6, 2.0), 10.2);
  // measured 7.0 with albumin 2.0 → corrected 8.6 (normal) despite low measured
  near(correctedCalcium(7.0, 2.0), 8.6);
  assert.equal(category(correctedCalcium(7.0, 2.0)).name, 'Normal');
});

check('linear in albumin (0.8 per g/dL)', () => {
  near(correctedCalcium(9, 3) - correctedCalcium(9, 4), 0.8);
});

check('validation', () => {
  assert.throws(() => correctedCalcium(9, 0), /albumin/);
  assert.throws(() => correctedCalcium(-1, 4), /calcium/);
  assert.throws(() => correctedCalcium('x', 4), /numbers/);
  assert.throws(() => correctedCalciumSI(2, -1), /albumin/);
});

console.log(`\n${n} checks passed.`);
