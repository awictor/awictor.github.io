import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { mcv, mch, mchc, mcvCategory, analyze } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, tol = 1e-6) => assert.ok(Math.abs(a - b) <= tol, `${a} not within ${tol} of ${b}`);

check('MCV = Hct/RBC*10', () => {
  near(mcv(45, 5), 90);
  near(mcv(36, 4.5), 80);
});

check('MCH = Hgb/RBC*10', () => {
  near(mch(15, 5), 30);
  near(mch(12, 4), 30);
});

check('MCHC = Hgb/Hct*100', () => {
  near(mchc(15, 45), 33.333333, 1e-4);
  near(mchc(12, 36), 33.333333, 1e-4);
});

check('MCV categories at the 80/100 boundaries', () => {
  assert.equal(mcvCategory(79), 'microcytic');
  assert.equal(mcvCategory(80), 'normocytic');
  assert.equal(mcvCategory(100), 'normocytic');
  assert.equal(mcvCategory(101), 'macrocytic');
});

check('a normocytic worked example', () => {
  const r = analyze({ hgb: 15, hct: 45, rbc: 5 });
  near(r.mcv, 90);
  near(r.mch, 30);
  near(r.mchc, 33.3333, 1e-3);
  assert.equal(r.category, 'normocytic');
});

check('a microcytic example (iron deficiency)', () => {
  const r = analyze({ hgb: 9, hct: 30, rbc: 5 });
  near(r.mcv, 60);
  assert.equal(r.category, 'microcytic');
});

check('a macrocytic example', () => {
  const r = analyze({ hgb: 14, hct: 44, rbc: 4 });
  near(r.mcv, 110);
  assert.equal(r.category, 'macrocytic');
});

check('MCHC relates MCH and MCV: MCHC = MCH/MCV*100', () => {
  const o = { hgb: 15, hct: 45, rbc: 5 };
  near(mchc(o.hgb, o.hct), mch(o.hgb, o.rbc) / mcv(o.hct, o.rbc) * 100, 1e-6);
});

check('higher RBC (same Hgb/Hct) lowers MCV and MCH', () => {
  assert.ok(mcv(45, 6) < mcv(45, 5));
  assert.ok(mch(15, 6) < mch(15, 5));
});

check('validation: non-positive inputs throw', () => {
  assert.throws(() => mcv(45, 0), /RBC count must be a positive/);
  assert.throws(() => mch(0, 5), /hemoglobin must be a positive/);
  assert.throws(() => mchc(15, 0), /hematocrit must be a positive/);
});

console.log(`\n${n} checks passed.`);
