import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { pxToVw, vwToPx, pxToVh, vhToPx, pxToVmin, pxToVmax } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b} (±${eps})`);

check('px → vw', () => {
  near(pxToVw(192, 1920), 10, 1e-9);
  near(pxToVw(24, 1200), 2, 1e-9);
});

check('vw → px', () => {
  near(vwToPx(10, 1920), 192, 1e-9);
  near(vwToPx(50, 800), 400, 1e-9);
});

check('px ↔ vw inverse', () => {
  near(vwToPx(pxToVw(24, 1440), 1440), 24, 1e-9);
});

check('px → vh and back', () => {
  near(pxToVh(108, 1080), 10, 1e-9);
  near(vhToPx(pxToVh(50, 900), 900), 50, 1e-9);
});

check('vmin uses the smaller dimension', () => {
  near(pxToVmin(108, 1920, 1080), 108 / 1080 * 100, 1e-9);   // 10
  near(pxToVmin(108, 1080, 1920), 108 / 1080 * 100, 1e-9);   // same, portrait
});

check('vmax uses the larger dimension', () => {
  near(pxToVmax(192, 1920, 1080), 192 / 1920 * 100, 1e-9);   // 10
  near(pxToVmax(192, 1080, 1920), 192 / 1920 * 100, 1e-9);
});

check('square viewport: vmin = vmax = vw = vh', () => {
  const p = 50, s = 1000;
  near(pxToVmin(p, s, s), pxToVmax(p, s, s), 1e-9);
  near(pxToVmin(p, s, s), pxToVw(p, s), 1e-9);
});

check('scaling: double px → double vw', () => {
  near(pxToVw(48, 1920), 2 * pxToVw(24, 1920), 1e-9);
});

check('narrower viewport → larger vw for same px', () => {
  assert.ok(pxToVw(24, 375) > pxToVw(24, 1920));
});

check('validation', () => {
  assert.throws(() => pxToVw(24, 0), /positive/);
  assert.throws(() => pxToVh(24, 0), /positive/);
  assert.throws(() => pxToVw('x', 1920), /numbers/);
});

console.log(`\n${n} checks passed.`);
