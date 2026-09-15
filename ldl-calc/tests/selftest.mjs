import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { ldlFriedewald, nonHdl, cholRatio, classifyLdl } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b} (±${eps})`);

check('Friedewald in mg/dL: TC - HDL - TG/5', () => {
  near(ldlFriedewald(200, 50, 150, 'mg'), 120, 1e-9); // 200-50-30
  near(ldlFriedewald(240, 40, 200, 'mg'), 160, 1e-9);
});

check('Friedewald in mmol/L uses TG/2.19', () => {
  near(ldlFriedewald(5.2, 1.3, 1.5, 'mmol'), 5.2 - 1.3 - 1.5 / 2.19, 1e-9);
});

check('throws when triglycerides are too high (mg/dL)', () => {
  assert.throws(() => ldlFriedewald(300, 40, 400, 'mg'), /not valid/);
  assert.throws(() => ldlFriedewald(300, 40, 500, 'mg'), /not valid/);
});

check('throws when triglycerides are too high (mmol/L)', () => {
  assert.throws(() => ldlFriedewald(8, 1, 4.6, 'mmol'), /not valid/);
});

check('nonHdl = TC - HDL', () => {
  near(nonHdl(200, 50), 150, 1e-9);
});

check('cholRatio = TC / HDL', () => {
  near(cholRatio(200, 50), 4, 1e-9);
  near(cholRatio(180, 60), 3, 1e-9);
});

check('LDL relates to non-HDL minus TG/5', () => {
  const tc = 220, hdl = 55, tg = 180;
  near(ldlFriedewald(tc, hdl, tg, 'mg'), nonHdl(tc, hdl) - tg / 5, 1e-9);
});

check('higher triglycerides lower the LDL estimate', () => {
  assert.ok(ldlFriedewald(200, 50, 250, 'mg') < ldlFriedewald(200, 50, 100, 'mg'));
});

check('classifyLdl boundaries', () => {
  assert.equal(classifyLdl(99), 'optimal');
  assert.equal(classifyLdl(100), 'near optimal');
  assert.equal(classifyLdl(129), 'near optimal');
  assert.equal(classifyLdl(130), 'borderline high');
  assert.equal(classifyLdl(159), 'borderline high');
  assert.equal(classifyLdl(160), 'high');
  assert.equal(classifyLdl(189), 'high');
  assert.equal(classifyLdl(190), 'very high');
});

check('validation', () => {
  assert.throws(() => ldlFriedewald(0, 50, 100, 'mg'), /must be positive/);
  assert.throws(() => nonHdl(200, 0), /must be positive/);
  assert.throws(() => cholRatio(200, 0), /HDL must be positive/);
});

console.log(`\n${n} checks passed.`);
