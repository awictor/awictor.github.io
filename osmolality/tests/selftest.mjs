import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { osmolality, osmolalitySI, osmolarGap } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b} (±${eps})`);

check('normal values ≈ 290', () => {
  near(osmolality(140, 90, 14), 2 * 140 + 90 / 18 + 14 / 2.8, 1e-9);  // = 290
  near(osmolality(140, 90, 14), 290, 1e-9);
});

check('higher glucose / BUN raise osmolality', () => {
  near(osmolality(140, 180, 28), 280 + 10 + 10, 1e-9);   // 300
  assert.ok(osmolality(140, 200, 14) > osmolality(140, 90, 14));
});

check('ethanol term (/3.7)', () => {
  near(osmolality(140, 90, 14, 37), 290 + 10, 1e-9);     // 37/3.7 = 10
  near(osmolality(140, 90, 14), osmolality(140, 90, 14, 0), 1e-12);
});

check('SI formula', () => {
  near(osmolalitySI(140, 5, 5), 280 + 10, 1e-9);         // 290
});

check('osmolar gap', () => {
  near(osmolarGap(300, 290), 10, 1e-9);
  near(osmolarGap(295, osmolality(140, 90, 14)), 5, 1e-9);
});

check('sodium dominates (×2)', () => {
  near(osmolality(145, 90, 14) - osmolality(140, 90, 14), 10, 1e-9);  // 5 mmol Na → +10
});

check('monotonic in each component', () => {
  assert.ok(osmolality(141, 90, 14) > osmolality(140, 90, 14));
  assert.ok(osmolality(140, 91, 14) > osmolality(140, 90, 14));
  assert.ok(osmolality(140, 90, 15) > osmolality(140, 90, 14));
});

check('DKA-style high osmolality', () => {
  near(osmolality(130, 600, 40), 260 + 600 / 18 + 40 / 2.8, 1e-9);
  assert.ok(osmolality(130, 600, 40) > 300);
});

check('zero solutes = 2·Na', () => {
  assert.equal(osmolality(140, 0, 0, 0), 280);
});

check('validation', () => {
  assert.throws(() => osmolality('x', 90, 14), /numbers/);
  assert.throws(() => osmolalitySI(140, 'y', 5), /numbers/);
});

console.log(`\n${n} checks passed.`);
