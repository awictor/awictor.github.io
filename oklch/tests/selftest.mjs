import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { hexToRgb255, rgb255ToHex, srgbToLinear, linearToSrgb, hexToOklch, oklchToHex, formatOklch } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b} (±${eps})`);

check('hex parsing incl. shorthand', () => {
  assert.deepEqual(hexToRgb255('#ff0000'), { r: 255, g: 0, b: 0 });
  assert.deepEqual(hexToRgb255('#f00'), { r: 255, g: 0, b: 0 });
  assert.equal(rgb255ToHex(255, 0, 0), '#ff0000');
  assert.throws(() => hexToRgb255('nope'), /invalid hex/);
});

check('sRGB gamma transfer round-trips', () => {
  near(srgbToLinear(0), 0, 1e-12);
  near(srgbToLinear(1), 1, 1e-9);
  near(linearToSrgb(srgbToLinear(0.5)), 0.5, 1e-9);
  near(srgbToLinear(0.5), 0.21404, 1e-4);
});

check('white and black map to L≈1 and L≈0, C≈0', () => {
  const w = hexToOklch('#ffffff'), k = hexToOklch('#000000');
  near(w.L, 1, 0.002); near(w.C, 0, 0.002);
  near(k.L, 0, 0.002); near(k.C, 0, 0.002);
});

check('sRGB red matches published OKLCH values', () => {
  const o = hexToOklch('#ff0000');
  near(o.L, 0.6279, 0.003);
  near(o.C, 0.2577, 0.003);
  near(o.H, 29.23, 0.5);
});

check('sRGB green and blue hues', () => {
  near(hexToOklch('#00ff00').H, 142.50, 0.6);
  near(hexToOklch('#0000ff').H, 264.05, 0.6);
});

check('grays are achromatic (C≈0)', () => {
  for(const g of ['#808080', '#404040', '#cccccc']) assert.ok(hexToOklch(g).C < 0.002);
});

check('lightness ordering white > gray > black', () => {
  assert.ok(hexToOklch('#ffffff').L > hexToOklch('#808080').L);
  assert.ok(hexToOklch('#808080').L > hexToOklch('#000000').L);
});

check('hex → OKLCH → hex round-trips exactly for in-gamut colors', () => {
  for(const hex of ['#ffffff', '#000000', '#ff0000', '#00ff00', '#0000ff', '#808080', '#3b82f6']){
    const { L, C, H } = hexToOklch(hex);
    assert.equal(oklchToHex(L, C, H), hex);
  }
});

check('oklchToHex clamps out-of-gamut requests to valid hex', () => {
  const hex = oklchToHex(0.7, 0.35, 30);   // very high chroma → out of sRGB gamut
  assert.match(hex, /^#[0-9a-f]{6}$/);
});

check('formatOklch renders a valid oklch() string', () => {
  assert.equal(formatOklch(0.6279, 0.2577, 29.23), 'oklch(62.8% 0.2577 29.23)');
});

console.log(`\n${n} checks passed.`);
