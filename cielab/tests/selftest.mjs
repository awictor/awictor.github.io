import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { hexToRgb, rgbToHex, rgbToLab, labToRgb, deltaE } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b} (±${eps})`);
const labNear = (o, L, a, b, eps) => { near(o.L, L, eps); near(o.a, a, eps); near(o.b, b, eps); };

check('white → L*≈100, a*≈0, b*≈0', () => {
  labNear(rgbToLab([255, 255, 255]), 100, 0, 0, 0.05);
});

check('black → L*≈0', () => {
  labNear(rgbToLab([0, 0, 0]), 0, 0, 0, 0.05);
});

check('reference sRGB red / green / blue', () => {
  labNear(rgbToLab([255, 0, 0]), 53.24, 80.09, 67.20, 0.1);
  labNear(rgbToLab([0, 255, 0]), 87.73, -86.18, 83.18, 0.1);
  labNear(rgbToLab([0, 0, 255]), 32.30, 79.19, -107.86, 0.1);
});

check('mid gray is neutral (a*,b* ≈ 0)', () => {
  const lab = rgbToLab([128, 128, 128]);
  near(lab.a, 0, 0.05); near(lab.b, 0, 0.05);
  assert.ok(lab.L > 50 && lab.L < 55);
});

check('ΔE of identical colors is 0', () => {
  assert.equal(deltaE(rgbToLab([10, 20, 30]), rgbToLab([10, 20, 30])), 0);
});

check('ΔE black vs white = 100', () => {
  near(deltaE(rgbToLab([0, 0, 0]), rgbToLab([255, 255, 255])), 100, 0.05);
});

check('ΔE is symmetric', () => {
  const A = rgbToLab([255, 0, 0]), B = rgbToLab([0, 0, 255]);
  near(deltaE(A, B), deltaE(B, A), 1e-9);
});

check('near-identical colors have small ΔE', () => {
  assert.ok(deltaE(rgbToLab([255, 0, 0]), rgbToLab([254, 2, 1])) < 2);
});

check('labToRgb round-trips within ±1', () => {
  for (const rgb of [[219, 39, 119], [255, 0, 0], [0, 128, 64], [12, 200, 240], [255, 255, 255], [0, 0, 0]]) {
    const back = labToRgb(rgbToLab(rgb));
    for (let i = 0; i < 3; i++) assert.ok(Math.abs(back[i] - rgb[i]) <= 1, `${back} !~ ${rgb}`);
  }
});

check('hex helpers and validation', () => {
  assert.deepEqual(hexToRgb('#db2777'), [219, 39, 119]);
  assert.equal(rgbToHex(219, 39, 119), '#db2777');
  assert.throws(() => hexToRgb('#zz'), /hex/);
});

console.log(`\n${n} checks passed.`);
