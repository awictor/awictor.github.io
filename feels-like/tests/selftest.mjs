import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { cToF, fToC, windChill, heatIndex, feelsLike } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps = 0.5) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b}`);

check('temperature conversions round-trip', () => {
  assert.equal(cToF(0), 32);
  assert.equal(cToF(100), 212);
  assert.equal(fToC(32), 0);
  near(fToC(cToF(21)), 21, 1e-9);
});

check('wind chill matches NWS chart values', () => {
  near(windChill(0, 15), -19.4);
  near(windChill(40, 10), 33.6);
});

check('wind chill is colder than the air temperature', () => {
  assert.ok(windChill(20, 20) < 20);
});

check('heat index matches a known NWS value (90°F / 70%)', () => {
  near(heatIndex(90, 70), 105.9);
});

check('heat index rises with humidity and exceeds air temp when hot', () => {
  assert.ok(heatIndex(90, 70) > 90);
  assert.ok(heatIndex(90, 80) > heatIndex(90, 40));
});

check('feelsLike picks wind chill when cold and windy', () => {
  const r = feelsLike(30, { wind: 20, humidity: 50 });
  assert.equal(r.mode, 'wind chill');
  near(r.feelsF, windChill(30, 20));
});

check('feelsLike picks heat index when hot and humid', () => {
  const r = feelsLike(95, { humidity: 60 });
  assert.equal(r.mode, 'heat index');
  near(r.feelsF, heatIndex(95, 60));
});

check('feelsLike does nothing in the neutral range', () => {
  const r = feelsLike(65, { wind: 10, humidity: 50 });
  assert.equal(r.mode, 'none');
  assert.equal(r.feelsF, 65);
});

check('feelsLike ignores light wind for chill', () => {
  const r = feelsLike(45, { wind: 2 });
  assert.equal(r.mode, 'none');
  assert.equal(r.feelsF, 45);
});

check('feelsLike needs humidity for heat index', () => {
  const r = feelsLike(85, {});
  assert.equal(r.mode, 'none');
  assert.equal(r.feelsF, 85);
});

console.log(`\n${n} checks passed.`);
