import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { gcd, ppi, dotPitchMm, megapixels, aspectRatio } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps = 0.1) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b}`);

check('ppi of 1080p 15.6" ≈ 141', () => {
  near(ppi(1920, 1080, 15.6), 141.2);
});

check('ppi of 1440p 27" ≈ 109', () => {
  near(ppi(2560, 1440, 27), 108.8);
});

check('ppi formula = diagonal-pixels / diagonal-inches', () => {
  near(ppi(3, 4, 5), 1); // 3-4-5 triangle: sqrt(9+16)=5, /5 = 1
});

check('dotPitchMm is 25.4 / ppi', () => {
  near(dotPitchMm(141.2), 25.4 / 141.2, 1e-6);
  near(dotPitchMm(100), 0.254, 1e-6);
});

check('megapixels = w*h / 1e6', () => {
  near(megapixels(1920, 1080), 2.0736, 1e-6);
  near(megapixels(3840, 2160), 8.2944, 1e-6);
});

check('gcd works', () => {
  assert.equal(gcd(1920, 1080), 120);
  assert.equal(gcd(2560, 1440), 160);
});

check('aspectRatio simplifies correctly', () => {
  assert.equal(aspectRatio(1920, 1080), '16:9');
  assert.equal(aspectRatio(2560, 1440), '16:9');
  assert.equal(aspectRatio(1280, 1024), '5:4');
  assert.equal(aspectRatio(1440, 900), '8:5');
});

check('ppi rejects non-positive inputs', () => {
  assert.throws(() => ppi(0, 1080, 15.6), /resolution/);
  assert.throws(() => ppi(1920, 1080, 0), /diagonal/);
});

check('other functions validate inputs too', () => {
  assert.throws(() => dotPitchMm(0), /ppi must be positive/);
  assert.throws(() => megapixels(-1, 100), /resolution/);
  assert.throws(() => aspectRatio(1920, 0), /resolution/);
});

check('higher PPI has a smaller dot pitch', () => {
  assert.ok(dotPitchMm(200) < dotPitchMm(100));
});

console.log(`\n${n} checks passed.`);
