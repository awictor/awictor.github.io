import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { SYNODIC, NEW_MOON_JD, jdFromMs, moonAge, illumination, phaseName, phase } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b} (±${eps})`);

// Build a date (ms) that is `ageDays` after the reference new moon.
const at = ageDays => (NEW_MOON_JD + ageDays - 2440587.5) * 86400000;

check('reference epoch is a new moon (age ≈ 0)', () => {
  near(moonAge(at(0)), 0, 1e-6);
  near(illumination(moonAge(at(0))), 0, 1e-6);
  assert.equal(phaseName(moonAge(at(0))), 'New Moon');
});

check('half a synodic month later is full', () => {
  const age = moonAge(at(SYNODIC / 2));
  near(age, SYNODIC / 2, 1e-6);
  near(illumination(age), 1, 1e-9);
  assert.equal(phaseName(age), 'Full Moon');
});

check('quarter points are the quarter phases at 50% lit', () => {
  near(illumination(moonAge(at(SYNODIC / 4))), 0.5, 1e-9);
  assert.equal(phaseName(moonAge(at(SYNODIC / 4))), 'First Quarter');
  near(illumination(moonAge(at(3 * SYNODIC / 4))), 0.5, 1e-9);
  assert.equal(phaseName(moonAge(at(3 * SYNODIC / 4))), 'Last Quarter');
});

check('age wraps modulo the synodic month', () => {
  near(moonAge(at(SYNODIC)), 0, 1e-6);
  near(moonAge(at(SYNODIC + 3)), 3, 1e-6);
  near(moonAge(at(2 * SYNODIC + 5)), 5, 1e-6);
});

check('illumination range and symmetry', () => {
  for(const a of [0, 5, 10, 14, 20, 25, 29]){
    const i = illumination(a);
    assert.ok(i >= 0 && i <= 1);
  }
  // symmetric about full moon
  near(illumination(SYNODIC / 2 - 3), illumination(SYNODIC / 2 + 3), 1e-9);
});

check('illumination increases through the waxing half', () => {
  let prev = -1;
  for(let a = 0; a <= SYNODIC / 2; a += 0.5){ const i = illumination(a); assert.ok(i >= prev - 1e-9); prev = i; }
});

check('intermediate phase names', () => {
  assert.equal(phaseName(SYNODIC * 0.10), 'Waxing Crescent');
  assert.equal(phaseName(SYNODIC * 0.35), 'Waxing Gibbous');
  assert.equal(phaseName(SYNODIC * 0.60), 'Waning Gibbous');
  assert.equal(phaseName(SYNODIC * 0.85), 'Waning Crescent');
});

check('phase() bundles age, illumination, name and waxing flag', () => {
  const p = phase(at(SYNODIC / 4));
  assert.equal(p.name, 'First Quarter');
  near(p.illumination, 0.5, 1e-9);
  assert.equal(p.waxing, true);
  assert.equal(phase(at(3 * SYNODIC / 4)).waxing, false);
});

check('jdFromMs matches the Unix epoch Julian Date', () => {
  near(jdFromMs(0), 2440587.5, 1e-9);   // 1970-01-01T00:00Z
});

check('invalid date throws', () => {
  assert.throws(() => moonAge('nope'), /invalid date/);
  assert.throws(() => moonAge(NaN), /invalid date/);
});

console.log(`\n${n} checks passed.`);
