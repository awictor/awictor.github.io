import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { correctedSodium, sodiumStatus } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b} (±${eps})`);

check('Katz 1.6: Na 130, glucose 600 → 138', () => {
  near(correctedSodium(130, 600, 1.6), 138, 1e-9);  // 130 + 1.6×5
});

check('Hillier 2.4: Na 130, glucose 600 → 142', () => {
  near(correctedSodium(130, 600, 2.4), 142, 1e-9);  // 130 + 2.4×5
});

check('glucose at 100 gives no correction', () => {
  near(correctedSodium(140, 100, 1.6), 140, 1e-9);
  near(correctedSodium(140, 100, 2.4), 140, 1e-9);
});

check('default factor is 1.6', () => {
  near(correctedSodium(130, 600), correctedSodium(130, 600, 1.6), 1e-12);
});

check('glucose below 100 gives a small negative correction', () => {
  near(correctedSodium(140, 50, 1.6), 140 - 0.8, 1e-9);  // 1.6 × (-0.5)
});

check('linear in glucose', () => {
  const a = correctedSodium(130, 300, 1.6) - correctedSodium(130, 200, 1.6);
  near(a, 1.6, 1e-9);  // +100 mg/dL → +1.6
});

check('higher glucose → higher corrected sodium', () => {
  assert.ok(correctedSodium(130, 800, 1.6) > correctedSodium(130, 400, 1.6));
});

check('sodium status tiers', () => {
  assert.equal(sodiumStatus(130), 'Hyponatremia');
  assert.equal(sodiumStatus(140), 'Normal');
  assert.equal(sodiumStatus(150), 'Hypernatremia');
});

check('status boundaries at 135 and 145', () => {
  assert.equal(sodiumStatus(134.9), 'Hyponatremia');
  assert.equal(sodiumStatus(135), 'Normal');
  assert.equal(sodiumStatus(145), 'Normal');
  assert.equal(sodiumStatus(145.1), 'Hypernatremia');
});

check('validation', () => {
  assert.throws(() => correctedSodium('x', 600), /numbers/);
  assert.throws(() => sodiumStatus('y'), /numbers/);
});

console.log(`\n${n} checks passed.`);
