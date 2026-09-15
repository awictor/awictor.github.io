import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { doughRecipe } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b} (±${eps})`);

check('total dough = balls × ball weight', () => {
  assert.equal(doughRecipe({ balls: 4, ballWeight: 250, hydration: 60, salt: 2, yeast: 0.5 }).totalDough, 1000);
  assert.equal(doughRecipe({ balls: 1, ballWeight: 250, hydration: 60, salt: 2, yeast: 0.5 }).totalDough, 250);
});

check('components sum to total dough', () => {
  const r = doughRecipe({ balls: 4, ballWeight: 250, hydration: 62, salt: 2.5, yeast: 0.3, oil: 2 });
  near(r.flour + r.water + r.salt + r.yeast + r.oil, r.totalDough, 1e-6);
});

check('single-ball flour math (60% / 2% / 0.5%)', () => {
  const r = doughRecipe({ balls: 1, ballWeight: 250, hydration: 60, salt: 2, yeast: 0.5, oil: 0 });
  near(r.flour, 250 / 1.625, 1e-6);   // 1 + .60 + .02 + .005
  near(r.water, r.flour * 0.60, 1e-9);
  near(r.salt, r.flour * 0.02, 1e-9);
  near(r.yeast, r.flour * 0.005, 1e-9);
});

check('water/flour ratio equals hydration', () => {
  const r = doughRecipe({ balls: 2, ballWeight: 300, hydration: 70, salt: 2, yeast: 0.4, oil: 3 });
  near(r.water / r.flour * 100, 70, 1e-9);
  near(r.salt / r.flour * 100, 2, 1e-9);
  near(r.oil / r.flour * 100, 3, 1e-9);
});

check('zero everything but flour → flour equals total, water 0', () => {
  const r = doughRecipe({ balls: 1, ballWeight: 500, hydration: 0, salt: 0, yeast: 0, oil: 0 });
  near(r.flour, 500, 1e-9);
  near(r.water, 0, 1e-9);
});

check('ball count scales flour linearly', () => {
  const one = doughRecipe({ balls: 1, ballWeight: 250, hydration: 62, salt: 2.5, yeast: 0.3 });
  const four = doughRecipe({ balls: 4, ballWeight: 250, hydration: 62, salt: 2.5, yeast: 0.3 });
  near(four.flour, one.flour * 4, 1e-6);
});

check('higher hydration means less flour for the same total', () => {
  const lo = doughRecipe({ balls: 1, ballWeight: 300, hydration: 55, salt: 2, yeast: 0.3 });
  const hi = doughRecipe({ balls: 1, ballWeight: 300, hydration: 80, salt: 2, yeast: 0.3 });
  assert.ok(hi.flour < lo.flour);
});

check('oil is included when present, excluded implicitly at 0', () => {
  const withOil = doughRecipe({ balls: 1, ballWeight: 300, hydration: 62, salt: 2, yeast: 0.3, oil: 5 });
  near(withOil.oil, withOil.flour * 0.05, 1e-9);
  const noOil = doughRecipe({ balls: 1, ballWeight: 300, hydration: 62, salt: 2, yeast: 0.3 });
  near(noOil.oil, 0, 1e-9);
});

check('Neapolitan-ish recipe is reasonable', () => {
  const r = doughRecipe({ balls: 4, ballWeight: 250, hydration: 62, salt: 2.8, yeast: 0.2 });
  assert.equal(r.totalDough, 1000);
  assert.ok(r.flour > 590 && r.flour < 620);   // ~608 g
});

check('validation throws', () => {
  assert.throws(() => doughRecipe({ balls: 'x', ballWeight: 250, hydration: 60 }), /numbers/);
  assert.throws(() => doughRecipe({ balls: 0, ballWeight: 250, hydration: 60 }), /positive/);
});

console.log(`\n${n} checks passed.`);
