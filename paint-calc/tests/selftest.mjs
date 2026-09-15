import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { wallArea, ceilingArea, netArea, paintVolume, paintForRoom } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b} (±${eps})`);

check('wall area = perimeter × height', () => {
  near(wallArea(12, 10, 8), 2 * (12 + 10) * 8, 1e-9);  // 352
  near(wallArea(12, 10, 8), 352, 1e-9);
});

check('ceiling area = length × width', () => {
  near(ceilingArea(12, 10), 120, 1e-9);
});

check('net area subtracts openings and never goes negative', () => {
  near(netArea(352, 36), 316, 1e-9);
  near(netArea(100, 500), 0, 1e-9);   // clamped
});

check('paint volume = area × coats / coverage', () => {
  near(paintVolume(352, 2, 350), 704 / 350, 1e-9);   // ≈ 2.011
  near(paintVolume(350, 1, 350), 1, 1e-9);
});

check('more coats need more paint (linear)', () => {
  near(paintVolume(300, 2, 350), 2 * paintVolume(300, 1, 350), 1e-9);
});

check('higher coverage needs less paint', () => {
  assert.ok(paintVolume(300, 1, 400) < paintVolume(300, 1, 350));
});

check('paintForRoom: walls only', () => {
  const r = paintForRoom({ length: 12, width: 10, height: 8, coats: 2, coverage: 350, openings: 36 });
  near(r.paintableArea, 352 - 36, 1e-9);           // 316
  near(r.volume, 316 * 2 / 350, 1e-9);
  assert.equal(r.cans, Math.ceil(316 * 2 / 350));  // rounded up
});

check('paintForRoom: include ceiling adds L×W', () => {
  const walls = paintForRoom({ length: 12, width: 10, height: 8, coats: 1, coverage: 350, openings: 0 });
  const withCeil = paintForRoom({ length: 12, width: 10, height: 8, coats: 1, coverage: 350, openings: 0, includeCeiling: true });
  near(withCeil.paintableArea - walls.paintableArea, 120, 1e-9);
});

check('cans rounds gallons up to whole units', () => {
  const r = paintForRoom({ length: 12, width: 10, height: 8, coats: 2, coverage: 350, openings: 36 });
  assert.ok(Number.isInteger(r.cans) && r.cans >= r.volume);
});

check('validation', () => {
  assert.throws(() => wallArea('x', 10, 8), /numbers/);
  assert.throws(() => paintVolume(300, 2, 0), /positive/);
});

console.log(`\n${n} checks passed.`);
