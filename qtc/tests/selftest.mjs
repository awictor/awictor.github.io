import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { rrSeconds, bazett, fridericia, framingham, hodges, correctAll, category } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b} (±${eps})`);

check('RR interval = 60 / HR', () => {
  assert.equal(rrSeconds(60), 1);
  assert.equal(rrSeconds(120), 0.5);
});

check('at HR 60 all formulas equal the QT', () => {
  const all = correctAll(400, 60);
  for(const v of Object.values(all)) near(v, 400, 1e-9);
});

check('Bazett at HR 100 (RR 0.6)', () => {
  near(bazett(400, 100), 400 / Math.sqrt(0.6), 1e-6);  // ≈ 516.4
  near(bazett(400, 100), 516.40, 0.1);
});

check('Fridericia at HR 100', () => {
  near(fridericia(400, 100), 400 / Math.cbrt(0.6), 1e-6); // ≈ 474.3
});

check('Framingham at HR 100', () => {
  near(framingham(400, 100), 400 + 154 * (1 - 0.6), 1e-9); // 461.6
});

check('Hodges at HR 100', () => {
  near(hodges(400, 100), 400 + 1.75 * 40, 1e-9);   // 470
});

check('Bazett rises with heart rate', () => {
  assert.ok(bazett(400, 100) > bazett(400, 60));
  assert.ok(bazett(400, 60) > bazett(400, 50));
});

check('category thresholds (sex-aware)', () => {
  assert.equal(category(430, 'male').name, 'Normal');
  assert.equal(category(455, 'male').name, 'Borderline');   // ≥450 male
  assert.equal(category(455, 'female').name, 'Normal');      // <460 female
  assert.equal(category(490, 'male').name, 'Prolonged');
  assert.equal(category(520, 'male').name.startsWith('Markedly') ? 'Markedly' : 'x', 'Markedly');
});

check('correctAll returns all four formulas', () => {
  const all = correctAll(420, 75);
  assert.deepEqual(Object.keys(all).sort(), ['bazett', 'framingham', 'fridericia', 'hodges']);
});

check('validation', () => {
  assert.throws(() => bazett(0, 60), /QT/);
  assert.throws(() => bazett(400, 0), /heart rate/);
  assert.throws(() => rrSeconds(-5), /heart rate/);
});

console.log(`\n${n} checks passed.`);
