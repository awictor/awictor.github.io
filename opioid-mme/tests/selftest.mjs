import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { FACTORS, methadoneFactor, mmeDaily, totalMME, riskLevel } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b} (±${eps})`);

check('morphine factor is 1', () => {
  near(mmeDaily('morphine', 30, 2), 60, 1e-9);
});

check('oxycodone factor 1.5', () => {
  near(mmeDaily('oxycodone', 30, 2), 90, 1e-9);   // 60 mg × 1.5
});

check('hydromorphone factor 4, codeine 0.15, tramadol 0.1', () => {
  near(mmeDaily('hydromorphone', 4, 2), 32, 1e-9);   // 8 × 4
  near(mmeDaily('codeine', 60, 4), 240 * 0.15, 1e-9);
  near(mmeDaily('tramadol', 50, 2), 100 * 0.1, 1e-9);
});

check('methadone tiers are dose-dependent', () => {
  assert.equal(methadoneFactor(10), 4);
  assert.equal(methadoneFactor(30), 8);
  assert.equal(methadoneFactor(50), 10);
  assert.equal(methadoneFactor(80), 12);
});

check('methadone tier boundaries (≤20, ≤40, ≤60)', () => {
  assert.equal(methadoneFactor(20), 4);
  assert.equal(methadoneFactor(21), 8);
  assert.equal(methadoneFactor(40), 8);
  assert.equal(methadoneFactor(60), 10);
  assert.equal(methadoneFactor(61), 12);
});

check('methadone MME uses daily-dose tier', () => {
  near(mmeDaily('methadone', 5, 2), 10 * 4, 1e-9);    // 10 mg/day → ×4
  near(mmeDaily('methadone', 15, 2), 30 * 8, 1e-9);   // 30 mg/day → ×8
});

check('totalMME sums entries', () => {
  const t = totalMME([{ drug: 'oxycodone', dose: 15, perDay: 4 }, { drug: 'morphine', dose: 30, perDay: 1 }]);
  near(t, 90 + 30, 1e-9);   // 120
});

check('risk levels', () => {
  assert.equal(riskLevel(40), 'lower');
  assert.equal(riskLevel(60), 'increased');
  assert.equal(riskLevel(120), 'high');
});

check('risk boundaries at 50 and 90', () => {
  assert.equal(riskLevel(49.9), 'lower');
  assert.equal(riskLevel(50), 'increased');
  assert.equal(riskLevel(89.9), 'increased');
  assert.equal(riskLevel(90), 'high');
});

check('unknown drug throws; factor table present', () => {
  assert.throws(() => mmeDaily('aspirin', 100, 1), /unknown opioid/);
  assert.equal(FACTORS.morphine, 1);
});

console.log(`\n${n} checks passed.`);
