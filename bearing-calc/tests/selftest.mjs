import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { initialBearing, finalBearing, backBearing, compassPoint } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, e = 1e-6) => assert.ok(Math.abs(a - b) <= e, `${a} vs ${b}`);

check('due east along the equator is 90°', () => {
  near(initialBearing(0, 0, 0, 10), 90);
});

check('due north is 0°, due south is 180°', () => {
  near(initialBearing(0, 0, 10, 0), 0);
  near(initialBearing(0, 0, -10, 0), 180);
});

check('due west is 270°', () => {
  near(initialBearing(0, 0, 0, -10), 270);
});

check('bearing is always in [0, 360)', () => {
  for (const [a, b, c, d] of [[10, 20, -30, 140], [-45, 170, 60, -175], [0, 0, 1, 1]]) {
    const x = initialBearing(a, b, c, d);
    assert.ok(x >= 0 && x < 360, `${x}`);
  }
});

check("Land's End to John o' Groats is about 9°", () => {
  const b = initialBearing(50.06639, -5.71472, 58.64389, -3.07000);
  assert.ok(Math.abs(b - 9) < 1, `got ${b}`);
});

check('final bearing differs from initial along a great circle', () => {
  const i = initialBearing(50.06639, -5.71472, 58.64389, -3.07000);
  const f = finalBearing(50.06639, -5.71472, 58.64389, -3.07000);
  assert.ok(Math.abs(f - i) > 0.5); // curvature means they differ
});

check('back bearing is bearing ± 180', () => {
  near(backBearing(90), 270);
  near(backBearing(270), 90);
  near(backBearing(0), 180);
  near(backBearing(200), 20);
});

check('compass points at the cardinals and diagonals', () => {
  assert.equal(compassPoint(0), 'N');
  assert.equal(compassPoint(90), 'E');
  assert.equal(compassPoint(180), 'S');
  assert.equal(compassPoint(270), 'W');
  assert.equal(compassPoint(45), 'NE');
  assert.equal(compassPoint(360), 'N');
});

check('compass points at the 16-point subdivisions', () => {
  assert.equal(compassPoint(22.5), 'NNE');
  assert.equal(compassPoint(112.5), 'ESE');
  assert.equal(compassPoint(337.5), 'NNW');
});

check('validation: out-of-range coordinates throw', () => {
  assert.throws(() => initialBearing(91, 0, 0, 0), /latitude/);
  assert.throws(() => initialBearing(0, 181, 0, 0), /longitude/);
  assert.throws(() => initialBearing(0, 0, -91, 0), /latitude/);
  assert.throws(() => backBearing(NaN), /finite number/);
});

console.log(`\n${n} checks passed.`);
