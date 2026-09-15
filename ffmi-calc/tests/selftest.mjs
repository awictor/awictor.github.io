import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { fatFreeMass, ffmi, normalizedFFMI, category } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, e = 1e-6) => assert.ok(Math.abs(a - b) <= e, `${a} vs ${b}`);

check('fat-free mass = weight × (1 − bf%)', () => {
  near(fatFreeMass(80, 15), 68);
  near(fatFreeMass(100, 20), 80);
  near(fatFreeMass(90, 0), 90);
});

check('FFMI = fat-free mass / height²', () => {
  near(ffmi(80, 15, 1.80), 68 / (1.8 * 1.8)); // 20.988
  near(ffmi(80, 15, 1.80), 20.987654, 1e-5);
});

check('normalized FFMI equals FFMI at exactly 1.8 m', () => {
  near(normalizedFFMI(80, 15, 1.80), ffmi(80, 15, 1.80));
});

check('normalized FFMI adds 6.1×(1.8−h) for shorter athletes', () => {
  near(normalizedFFMI(68, 0, 1.70), 68 / (1.7 * 1.7) + 6.1 * 0.1);
});

check('shorter athlete gets a higher raw FFMI at equal lean mass', () => {
  assert.ok(ffmi(68, 0, 1.70) > ffmi(68, 0, 1.80));
});

check('leaner at same weight/height raises FFMI', () => {
  assert.ok(ffmi(80, 10, 1.80) > ffmi(80, 20, 1.80));
});

check('category bands', () => {
  assert.equal(category(17), 'Below average');
  assert.equal(category(19), 'Average');
  assert.equal(category(21), 'Fit');
  assert.equal(category(22.5), 'Very muscular');
  assert.equal(category(24), 'Exceptional');
  assert.equal(category(26), 'Beyond natural range');
});

check('category boundaries are half-open at the lower edge', () => {
  assert.equal(category(18), 'Average');
  assert.equal(category(20), 'Fit');
  assert.equal(category(25), 'Beyond natural range');
});

check('a lean, muscular profile lands in a high band', () => {
  const f = ffmi(90, 8, 1.80); // 82.8 / 3.24 = 25.56
  assert.ok(f > 25);
  assert.equal(category(f), 'Beyond natural range');
});

check('validation: bad weight, height, and body fat throw', () => {
  assert.throws(() => ffmi(0, 15, 1.8), /positive/);
  assert.throws(() => ffmi(80, 15, 0), /positive/);
  assert.throws(() => fatFreeMass(80, 100), /between 0 and 100/);
  assert.throws(() => fatFreeMass(80, -5), /between 0 and 100/);
});

console.log(`\n${n} checks passed.`);
