import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { isTotalInternalReflection, refractionAngle, criticalAngle } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, e = 1e-6) => assert.ok(Math.abs(a - b) <= e, `${a} vs ${b}`);

check('air → water at 30° refracts to ~22.08°', () => {
  near(refractionAngle(1, 30, 1.33), (180 / Math.PI) * Math.asin(Math.sin(Math.PI / 6) / 1.33));
  assert.ok(Math.abs(refractionAngle(1, 30, 1.33) - 22.08) < 0.02);
});

check('normal incidence passes straight through', () => {
  near(refractionAngle(1, 0, 1.5), 0);
});

check('equal indices leave the angle unchanged', () => {
  near(refractionAngle(1.5, 40, 1.5), 40, 1e-9);
});

check('entering a denser medium bends toward the normal', () => {
  assert.ok(refractionAngle(1, 45, 1.5) < 45);
});

check('leaving a denser medium bends away from the normal', () => {
  assert.ok(refractionAngle(1.5, 20, 1) > 20);
});

check('critical angle water → air ≈ 48.75°', () => {
  near(criticalAngle(1.33, 1), (180 / Math.PI) * Math.asin(1 / 1.33));
  assert.ok(Math.abs(criticalAngle(1.33, 1) - 48.75) < 0.02);
});

check('total internal reflection past the critical angle', () => {
  assert.equal(isTotalInternalReflection(1.33, 60, 1), true);
  assert.equal(isTotalInternalReflection(1.33, 30, 1), false);
  assert.throws(() => refractionAngle(1.33, 60, 1), /total internal reflection/);
});

check('reversibility: air→water then water→air returns the angle', () => {
  const t2 = refractionAngle(1, 35, 1.33);
  near(refractionAngle(1.33, t2, 1), 35, 1e-6);
});

check('no critical angle when going to a denser medium', () => {
  assert.throws(() => criticalAngle(1, 1.33), /n1 must exceed n2/);
});

check('validation: bad index and angle throw', () => {
  assert.throws(() => refractionAngle(0.5, 30, 1.33), /at least 1/);
  assert.throws(() => refractionAngle(1, 100, 1.33), /between 0 and 90/);
  assert.throws(() => criticalAngle(0, 1), /at least 1/);
});

console.log(`\n${n} checks passed.`);
