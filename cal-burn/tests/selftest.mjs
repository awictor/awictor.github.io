// Headless regression tests for CalBurn pure functions.
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
  addEventListener(){},querySelectorAll(){return[];},closest(){return null;}}; }
globalThis.document = {
  getElementById: () => el(), createElement: () => el(),
  querySelectorAll: () => [], documentElement: el()
};
globalThis.localStorage = { getItem:()=>null, setItem(){}, removeItem(){} };
globalThis.matchMedia = () => ({ matches:false });
globalThis.window = { matchMedia: globalThis.matchMedia };

eval(js.replace('if(typeof module !== \'undefined\') module.exports =',
  'globalThis.__t =') );
const { ACTIVITIES, lbToKg, perMinute, caloriesBurned } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps = 0.01) => assert.ok(Math.abs(a - b) < eps, `${a} vs ${b}`);

check('perMinute = MET * 3.5 * kg / 200', () => {
  near(perMinute(9.8, 70), 12.005);
  near(perMinute(1, 200), 3.5);
  assert.equal(perMinute(0, 70), null);
  assert.equal(perMinute(8, 0), null);
});

check('caloriesBurned worked examples', () => {
  near(caloriesBurned(9.8, 70, 30), 360.15);
  near(caloriesBurned(3.5, 80, 60), 294);
  near(caloriesBurned(8, 70, 45), 8 * 3.5 * 70 / 200 * 45);
});

check('caloriesBurned zero minutes = 0', () => {
  assert.equal(caloriesBurned(8, 70, 0), 0);
});

check('caloriesBurned guards', () => {
  assert.equal(caloriesBurned(8, 70, -5), null);
  assert.equal(caloriesBurned(0, 70, 30), null);
  assert.equal(caloriesBurned(8, 'x', 30), null);
});

check('lbToKg', () => {
  near(lbToKg(100), 45.359237);
  near(lbToKg(154), 69.85, 0.01);
});

check('ACTIVITIES table shape', () => {
  assert.ok(ACTIVITIES.length >= 15);
  ACTIVITIES.forEach(a => { assert.equal(typeof a[0], 'string'); assert.ok(a[1] > 0); });
  const running = ACTIVITIES.find(a => a[0] === 'Running (6 mph)');
  assert.equal(running[1], 9.8);
});

check('heavier person burns more for same activity', () => {
  assert.ok(caloriesBurned(8, 90, 30) > caloriesBurned(8, 60, 30));
});

check('longer duration scales linearly', () => {
  near(caloriesBurned(7, 70, 60), 2 * caloriesBurned(7, 70, 30));
});

console.log(`\n${n} checks passed.`);
