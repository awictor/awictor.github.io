import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { YEAR_MS, PERIODS, earthYearsBetween, ageOnPlanet, allAges } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b} (±${eps})`);

check('one Julian year of elapsed time = 1 Earth year', () => {
  const birth = 0, now = YEAR_MS;
  near(earthYearsBetween(birth, now), 1, 1e-9);
});

check('earthYearsBetween scales linearly', () => {
  near(earthYearsBetween(0, YEAR_MS * 10), 10, 1e-9);
  near(earthYearsBetween(0, YEAR_MS * 0.5), 0.5, 1e-9);
});

check('Mercury year is shorter, so you are older there', () => {
  near(ageOnPlanet(1, 'Mercury'), 1 / 0.2408467, 1e-6);   // ≈ 4.152
  assert.ok(ageOnPlanet(1, 'Mercury') > 1);
});

check('Mars and outer planets make you younger', () => {
  near(ageOnPlanet(1, 'Mars'), 1 / 1.8808158, 1e-6);      // ≈ 0.532
  near(ageOnPlanet(10, 'Neptune'), 10 / 164.79132, 1e-6); // ≈ 0.0607
  assert.ok(ageOnPlanet(1, 'Jupiter') < 1);
});

check('Earth age equals the input earth-years', () => {
  near(ageOnPlanet(37, 'Earth'), 37, 1e-12);
});

check('allAges returns all eight planets', () => {
  const a = allAges(30);
  assert.deepEqual(Object.keys(a).sort(), Object.keys(PERIODS).sort());
  assert.equal(Object.keys(a).length, 8);
});

check('allAges matches ageOnPlanet per planet', () => {
  const a = allAges(25);
  for(const p of Object.keys(PERIODS)) near(a[p], ageOnPlanet(25, p), 1e-12);
});

check('more elapsed time → older on every planet (monotonic)', () => {
  const young = allAges(20), old = allAges(40);
  for(const p of Object.keys(PERIODS)) assert.ok(old[p] > young[p]);
});

check('validation: future birthdate and unknown planet', () => {
  assert.throws(() => earthYearsBetween(YEAR_MS, 0), /future/);
  assert.throws(() => ageOnPlanet(1, 'Pluto'), /unknown planet/);
  assert.throws(() => earthYearsBetween('x', 0), /invalid date/);
});

check('period table sanity (ordered outward)', () => {
  assert.ok(PERIODS.Mercury < PERIODS.Venus);
  assert.ok(PERIODS.Venus < PERIODS.Earth);
  assert.ok(PERIODS.Earth < PERIODS.Mars);
  assert.ok(PERIODS.Jupiter < PERIODS.Saturn);
  assert.ok(PERIODS.Uranus < PERIODS.Neptune);
});

console.log(`\n${n} checks passed.`);
