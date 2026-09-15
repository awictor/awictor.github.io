// Headless regression tests for IdealWeight pure functions.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');

const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)]
  .map(m => m[1]).sort((a, b) => b.length - a.length)[0];

function el(){ return {value:'',textContent:'',innerHTML:'',style:{},className:'',
  appendChild(){},getAttribute(){return null;},setAttribute(){},removeAttribute(){},
  addEventListener(){},querySelectorAll(){return[];}}; }
globalThis.document = {
  getElementById: () => el(), createElement: () => el(),
  querySelectorAll: () => [], documentElement: el()
};
globalThis.localStorage = { getItem:()=>null, setItem(){}, removeItem(){} };
globalThis.matchMedia = () => ({ matches:false });
globalThis.window = { matchMedia: globalThis.matchMedia };

eval(js.replace('if(typeof module !== \'undefined\') module.exports =',
  'globalThis.__t =') );
const { inchesOver5ft, idealWeights, healthyRange, averageIdeal } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps = 0.1) => assert.ok(Math.abs(a - b) < eps, `${a} vs ${b}`);

check('inchesOver5ft', () => {
  near(inchesOver5ft(152.4), 0);
  near(inchesOver5ft(175), 8.8976);
  near(inchesOver5ft(162.56), 4); // 152.4 + 4*2.54
});

check('idealWeights male at 175cm', () => {
  const w = idealWeights('male', 175);
  near(w.devine, 70.46);
  near(w.robinson, 68.91);
  near(w.miller, 68.75);
  near(w.hamwi, 72.02);
});

check('idealWeights female at 165cm', () => {
  const over = inchesOver5ft(165); // ~4.9606
  const w = idealWeights('female', 165);
  near(w.devine, 45.5 + 2.3 * over);
  near(w.robinson, 49 + 1.7 * over);
  near(w.miller, 53.1 + 1.36 * over);
  near(w.hamwi, 45.5 + 2.2 * over);
});

check('at exactly 5ft (152.4cm) formulas equal their base', () => {
  const m = idealWeights('male', 152.4);
  near(m.devine, 50); near(m.robinson, 52); near(m.miller, 56.2); near(m.hamwi, 48);
  const f = idealWeights('female', 152.4);
  near(f.devine, 45.5); near(f.robinson, 49);
});

check('idealWeights guards bad height', () => {
  assert.equal(idealWeights('male', 0), null);
  assert.equal(idealWeights('male', -5), null);
  assert.equal(idealWeights('male', 'x'), null);
});

check('healthyRange from BMI 18.5-24.9', () => {
  const r = healthyRange(175);
  near(r.min, 18.5 * 1.75 * 1.75);   // 56.66
  near(r.max, 24.9 * 1.75 * 1.75);   // 76.26
  assert.ok(r.max > r.min);
  assert.equal(healthyRange(0), null);
});

check('averageIdeal is the mean of the four', () => {
  const w = idealWeights('male', 175);
  near(averageIdeal('male', 175), (w.devine + w.robinson + w.miller + w.hamwi) / 4);
  assert.equal(averageIdeal('male', 0), null);
});

check('taller person has higher ideal weight', () => {
  assert.ok(idealWeights('male', 190).devine > idealWeights('male', 160).devine);
});

console.log(`\n${n} checks passed.`);
