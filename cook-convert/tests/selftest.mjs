import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { VOL, WT, DENSITY, toGrams, fromGrams, convert } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps = 1e-3) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b}`);

check('1 cup of water is 236.588 g', () => {
  near(convert({ amount: 1, from: 'cup', to: 'g', ingredient: 'water' }), 236.588);
});

check('grams → cups is the inverse for water', () => {
  near(convert({ amount: 236.588, from: 'g', to: 'cup', ingredient: 'water' }), 1);
});

check('1 cup of flour ≈ 125 g (density 0.53)', () => {
  near(convert({ amount: 1, from: 'cup', to: 'g', ingredient: 'flour (all-purpose)' }), 236.588 * 0.53);
});

check('volume→volume cancels density: 1 cup = 16 tbsp for any ingredient', () => {
  near(convert({ amount: 1, from: 'cup', to: 'tbsp', ingredient: 'water' }), 16);
  near(convert({ amount: 1, from: 'cup', to: 'tbsp', ingredient: 'honey' }), 16);
  near(convert({ amount: 1, from: 'tbsp', to: 'tsp', ingredient: 'butter' }), 3);
});

check('weight→weight cancels density: 1 lb = 16 oz', () => {
  near(convert({ amount: 1, from: 'lb', to: 'oz', ingredient: 'flour (all-purpose)' }), 16);
  near(convert({ amount: 1, from: 'kg', to: 'g', ingredient: 'water' }), 1000);
});

check('weight → volume uses density (100 g butter → ml)', () => {
  near(convert({ amount: 100, from: 'g', to: 'ml', ingredient: 'butter' }), 100 / 0.911, 0.01);
});

check('round-trip cup → g → cup returns the original', () => {
  const g = convert({ amount: 2.5, from: 'cup', to: 'g', ingredient: 'sugar (granulated)' });
  near(convert({ amount: g, from: 'g', to: 'cup', ingredient: 'sugar (granulated)' }), 2.5);
});

check('toGrams / fromGrams are inverses', () => {
  const g = toGrams(3, 'tbsp', 1.42);   // honey
  near(fromGrams(g, 'tbsp', 1.42), 3);
});

check('convert rejects unknown ingredient and unit', () => {
  assert.throws(() => convert({ amount: 1, from: 'cup', to: 'g', ingredient: 'unobtainium' }), /unknown ingredient/);
  assert.throws(() => convert({ amount: 1, from: 'furlong', to: 'g', ingredient: 'water' }), /unknown unit/);
});

check('convert rejects negative amount and defaults ingredient to water', () => {
  assert.throws(() => convert({ amount: -1, from: 'cup', to: 'g', ingredient: 'water' }), /non-negative/);
  near(convert({ amount: 1, from: 'cup', to: 'ml' }), 236.588); // no ingredient → water, vol→vol
});

console.log(`\n${n} checks passed.`);
