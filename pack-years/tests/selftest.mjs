import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { packYears, totalPackYears, category, meetsScreening } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps = 1e-9) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b}`);

check('one pack a day for a year = 1 pack-year', () => {
  near(packYears(20, 1), 1);
});

check('formula: (cigs/day ÷ 20) × years', () => {
  near(packYears(20, 10), 10);
  near(packYears(40, 10), 20);
  near(packYears(10, 20), 10);
  near(packYears(10, 1), 0.5);   // half a pack
});

check('zero cigarettes or zero years = 0', () => {
  assert.equal(packYears(0, 30), 0);
  assert.equal(packYears(30, 0), 0);
});

check('totalPackYears sums periods', () => {
  near(totalPackYears([{ cigsPerDay: 20, years: 10 }, { cigsPerDay: 40, years: 5 }]), 20);
  near(totalPackYears([]), 0);
});

check('category bands', () => {
  assert.equal(category(0).name, 'None');
  assert.equal(category(5).name, 'Light');
  assert.equal(category(15).name, 'Moderate');
  assert.equal(category(25).name, 'Heavy');
  assert.equal(category(40).name, 'Very heavy');
});

check('category boundaries (half-open at 10/20/30)', () => {
  assert.equal(category(10).name, 'Moderate');
  assert.equal(category(20).name, 'Heavy');
  assert.equal(category(30).name, 'Very heavy');
});

check('USPSTF screening threshold at 20 pack-years', () => {
  assert.equal(meetsScreening(20), true);
  assert.equal(meetsScreening(19.9), false);
  assert.equal(meetsScreening(35), true);
});

check('fractional daily amount', () => {
  near(packYears(30, 10), 15);   // 1.5 packs/day × 10y
});

check('multi-period reaching screening threshold', () => {
  const py = totalPackYears([{ cigsPerDay: 10, years: 20 }, { cigsPerDay: 20, years: 10 }]);
  near(py, 20);                  // 10 + 10
  assert.equal(meetsScreening(py), true);
});

check('validation', () => {
  assert.throws(() => packYears(-1, 10), /≥ 0/);
  assert.throws(() => packYears(20, -5), /≥ 0/);
  assert.throws(() => packYears('x', 10), /numbers/);
});

console.log(`\n${n} checks passed.`);
