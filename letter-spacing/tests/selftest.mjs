import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { trackingToEm, emToTracking, emToPx, pxToEm, convert } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps = 1e-9) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b}`);

check('tracking ⇄ em (1/1000 em)', () => {
  near(trackingToEm(50), 0.05);
  near(emToTracking(0.05), 50);
  near(trackingToEm(0), 0);
});

check('em ⇄ px depends on font size', () => {
  near(emToPx(0.05, 16), 0.8);
  near(pxToEm(0.8, 16), 0.05);
  near(emToPx(0.1, 20), 2);
});

check('convert from tracking + font size', () => {
  const c = convert(100, 20);
  near(c.em, 0.1);
  near(c.px, 2);
});

check('convert 25 @ 16px', () => {
  const c = convert(25, 16);
  near(c.em, 0.025);
  near(c.px, 0.4);
});

check('negative tracking (tighter) is allowed', () => {
  near(trackingToEm(-30), -0.03);
  near(convert(-30, 16).px, -0.48);
});

check('tracking round-trips through em', () => {
  for(const t of [0, 25, 50, -40, 125]) near(emToTracking(trackingToEm(t)), t);
});

check('px round-trips through em', () => {
  for(const px of [0.4, 0.8, 2, -1.2]) near(emToPx(pxToEm(px, 16), 16), px);
});

check('emToPx is linear in font size', () => {
  near(emToPx(0.05, 32), 2 * emToPx(0.05, 16));
});

check('font-size validation', () => {
  assert.throws(() => emToPx(0.05, 0), /font size/);
  assert.throws(() => pxToEm(1, -5), /font size/);
  assert.throws(() => convert(50, 0), /font size/);
});

check('zero tracking gives zero everywhere', () => {
  const c = convert(0, 18);
  assert.equal(c.em, 0);
  assert.equal(c.px, 0);
});

console.log(`\n${n} checks passed.`);
