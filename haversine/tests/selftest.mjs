import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { EARTH_KM, UNITS, toRad, toDeg, haversineKm, distance, bearing, compass } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, tol) => assert.ok(Math.abs(a - b) <= tol, `${a} not within ${tol} of ${b}`);

check('constants: mean Earth radius and the three units', () => {
  assert.equal(EARTH_KM, 6371);
  assert.deepEqual(Object.keys(UNITS).sort(), ['km', 'mi', 'nmi']);
  assert.equal(UNITS.km, 1);
});

check('radian/degree conversion', () => {
  near(toRad(180), Math.PI, 1e-12);
  near(toDeg(Math.PI), 180, 1e-12);
  near(toRad(0), 0, 1e-12);
});

check('distance from a point to itself is zero', () => {
  assert.equal(haversineKm(40.7128, -74.006, 40.7128, -74.006), 0);
});

check('a quarter of the way around the equator is R*pi/2', () => {
  near(haversineKm(0, 0, 0, 90), EARTH_KM * Math.PI / 2, 1e-6);
});

check('antipodal points along the equator span R*pi', () => {
  near(haversineKm(0, 0, 0, 180), EARTH_KM * Math.PI, 1e-6);
});

check('pole to pole equals half the circumference', () => {
  near(haversineKm(90, 0, -90, 0), EARTH_KM * Math.PI, 1e-6);
});

check('unit conversion matches the km figure', () => {
  const km = haversineKm(0, 0, 0, 90);
  near(distance(0, 0, 0, 90, 'mi'), km * 0.621371192, 1e-6);
  near(distance(0, 0, 0, 90, 'nmi'), km * 0.539956803, 1e-6);
  assert.equal(distance(0, 0, 0, 90, 'km'), km);
});

check('London to Paris is about 344 km', () => {
  near(haversineKm(51.5074, -0.1278, 48.8566, 2.3522), 344, 3);
});

check('initial bearing: due east is 90, due north is 0', () => {
  near(bearing(0, 0, 0, 90), 90, 1e-6);
  near(bearing(0, 0, 90, 0), 0, 1e-6);
  assert.equal(compass(0), 'N');
  assert.equal(compass(90), 'E');
  assert.equal(compass(180), 'S');
  assert.equal(compass(270), 'W');
  assert.equal(compass(45), 'NE');
});

check('validation: bad degrees and unknown units throw', () => {
  assert.throws(() => toRad('x'), /finite number/);
  assert.throws(() => toRad(NaN), /finite number/);
  assert.throws(() => distance(0, 0, 0, 90, 'furlongs'), /unknown unit/);
});

console.log(`\n${n} checks passed.`);
