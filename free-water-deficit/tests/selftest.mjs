import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { tbw, freeWaterDeficit } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b} (±${eps})`);

check('total body water = weight × factor', () => {
  near(tbw(70, 0.6), 42, 1e-9);
  near(tbw(60, 0.5), 30, 1e-9);
});

check('classic example: 70 kg male, Na 154 → 4.2 L', () => {
  near(freeWaterDeficit(70, 0.6, 154, 140), 42 * (154 / 140 - 1), 1e-9);   // 4.2
  near(freeWaterDeficit(70, 0.6, 154, 140), 4.2, 1e-9);
});

check('no deficit when Na equals target', () => {
  near(freeWaterDeficit(70, 0.6, 140, 140), 0, 1e-9);
});

check('default target is 140', () => {
  near(freeWaterDeficit(70, 0.6, 154), freeWaterDeficit(70, 0.6, 154, 140), 1e-12);
});

check('higher sodium → larger deficit', () => {
  assert.ok(freeWaterDeficit(70, 0.6, 160, 140) > freeWaterDeficit(70, 0.6, 150, 140));
});

check('female factor gives smaller TBW and deficit', () => {
  assert.ok(tbw(70, 0.5) < tbw(70, 0.6));
  assert.ok(freeWaterDeficit(70, 0.5, 154, 140) < freeWaterDeficit(70, 0.6, 154, 140));
});

check('Na below target gives a negative value (water excess)', () => {
  assert.ok(freeWaterDeficit(70, 0.6, 130, 140) < 0);
});

check('custom target sodium', () => {
  near(freeWaterDeficit(70, 0.6, 160, 145), 42 * (160 / 145 - 1), 1e-9);
});

check('deficit scales with weight', () => {
  near(freeWaterDeficit(140, 0.6, 154, 140), 2 * freeWaterDeficit(70, 0.6, 154, 140), 1e-9);
});

check('validation', () => {
  assert.throws(() => tbw(0, 0.6), /positive/);
  assert.throws(() => freeWaterDeficit(70, 0.6, 154, 0), /target sodium/);
  assert.throws(() => tbw('x', 0.6), /numbers/);
});

console.log(`\n${n} checks passed.`);
