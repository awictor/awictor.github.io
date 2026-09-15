import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { waveY, wavePoints, wavePath, r2 } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b} (±${eps})`);

check('waveY at x=0, phase 0 equals baseline', () => {
  near(waveY(0, 40, 480, 0, 100), 100, 1e-9);
});

check('waveY at quarter wavelength = baseline + amplitude', () => {
  // x = wavelength/4 -> sin(pi/2) = 1
  near(waveY(120, 40, 480, 0, 100), 140, 1e-9);
});

check('waveY at half wavelength returns to baseline', () => {
  // x = wavelength/2 -> sin(pi) = 0
  near(waveY(240, 40, 480, 0, 100), 100, 1e-9);
});

check('wavePoints length is segments + 1', () => {
  assert.equal(wavePoints(1440, 40, 480, 0, 100, 60).length, 61);
});

check('wavePoints spans 0..width', () => {
  const pts = wavePoints(1440, 40, 480, 0, 100, 60);
  near(pts[0][0], 0, 1e-9);
  near(pts[pts.length - 1][0], 1440, 1e-9);
});

check('wavePath starts at first point and closes with Z', () => {
  const d = wavePath(1440, 180, 40, 480, 0, 100, 60);
  assert.ok(d.startsWith('M0,'));
  assert.ok(d.trim().endsWith('Z'));
});

check('wavePath fills down to the bottom corners', () => {
  const d = wavePath(1440, 180, 40, 480, 0, 100, 60);
  assert.ok(d.includes('L1440,180'), 'missing bottom-right corner');
  assert.ok(d.includes('L0,180'), 'missing bottom-left corner');
});

check('larger amplitude produces a bigger peak deviation', () => {
  const small = waveY(120, 20, 480, 0, 100);
  const big = waveY(120, 60, 480, 0, 100);
  assert.ok(Math.abs(big - 100) > Math.abs(small - 100));
});

check('phase shift changes y at x=0', () => {
  const a = waveY(0, 40, 480, 0, 100);
  const b = waveY(0, 40, 480, Math.PI / 2, 100);
  assert.ok(Math.abs(a - b) > 1e-6);
  near(b, 140, 1e-9); // sin(pi/2) = 1
});

check('validation', () => {
  assert.throws(() => waveY(0, 40, 0, 0, 100), /wavelength/);
  assert.throws(() => wavePoints(1440, 40, 480, 0, 100, 0), /segments/);
  assert.throws(() => waveY('x', 40, 480, 0, 100), /numbers/);
});

console.log(`\n${n} checks passed.`);
