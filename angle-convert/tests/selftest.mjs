import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { FACTOR, toRadians, fromRadians, convert, allUnits } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps = 1e-9) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b}`);

check('degrees ↔ radians', () => {
  near(convert(180, 'deg', 'rad'), Math.PI);
  near(convert(Math.PI, 'rad', 'deg'), 180);
  near(convert(90, 'deg', 'rad'), Math.PI / 2);
});

check('turns', () => {
  near(convert(1, 'turn', 'deg'), 360);
  near(convert(1, 'turn', 'rad'), Math.PI * 2);
  near(convert(0.5, 'turn', 'deg'), 180);
});

check('gradians (400 per turn)', () => {
  near(convert(200, 'grad', 'deg'), 180);
  near(convert(400, 'grad', 'turn'), 1);
});

check('arcminutes and arcseconds', () => {
  near(convert(1, 'deg', 'arcmin'), 60);
  near(convert(1, 'deg', 'arcsec'), 3600);
  near(convert(60, 'arcmin', 'deg'), 1);
  near(convert(3600, 'arcsec', 'deg'), 1);
});

check('same unit is identity', () => {
  assert.equal(convert(42, 'deg', 'deg'), 42);
});

check('toRadians / fromRadians are inverses', () => {
  near(fromRadians(toRadians(123, 'grad'), 'grad'), 123);
  near(toRadians(90, 'deg'), Math.PI / 2);
});

check('allUnits returns every unit', () => {
  const all = allUnits(90, 'deg');
  assert.equal(all.length, Object.keys(FACTOR).length);
  const rad = all.find(u => u.unit === 'rad');
  near(rad.value, Math.PI / 2);
});

check('conversion is transitive (deg→grad→deg)', () => {
  const g = convert(137, 'deg', 'grad');
  near(convert(g, 'grad', 'deg'), 137);
});

check('unknown units throw', () => {
  assert.throws(() => convert(1, 'deg', 'mrad'), /unknown unit/);
  assert.throws(() => toRadians(1, 'foo'), /unknown unit/);
});

check('factor table is correct for radians', () => {
  assert.equal(FACTOR.rad, 1);
  near(FACTOR.deg, Math.PI / 180);
  near(FACTOR.turn, Math.PI * 2);
});

console.log(`\n${n} checks passed.`);
