// Headless regression tests for FuelCost — trip fuel cost.
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
  classList:{add(){},remove(){},toggle(){}},
  addEventListener(){},querySelectorAll(){return[];},querySelector(){return null;},closest(){return null;}}; }
globalThis.document = {
  getElementById: () => el(), createElement: () => el(), querySelector: () => el(),
  querySelectorAll: () => [], documentElement: el()
};
globalThis.localStorage = { getItem:()=>null, setItem(){}, removeItem(){} };
globalThis.matchMedia = () => ({ matches:false });
globalThis.window = { matchMedia: globalThis.matchMedia };

eval(js.replace('if(typeof module !== \'undefined\') module.exports =',
  'globalThis.__t =') );
const { num, fuelUsed, tripCost, costPerDistance } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps = 1e-9) => assert.ok(Math.abs(a - b) < eps, `${a} !~= ${b}`);

check('fuelUsed — mpg (gallons)', () => {
  near(fuelUsed(300, 30, 'mpg'), 10);
  near(fuelUsed(0, 30, 'mpg'), 0);
});

check('fuelUsed — km/L (litres)', () => {
  near(fuelUsed(400, 10, 'kml'), 40);
});

check('fuelUsed — L/100km (litres)', () => {
  near(fuelUsed(500, 8, 'l100'), 40);   // 500/100 * 8
  near(fuelUsed(100, 7.5, 'l100'), 7.5);
});

check('fuelUsed — guards', () => {
  assert.ok(Number.isNaN(fuelUsed(300, 0, 'mpg')));   // economy must be > 0
  assert.ok(Number.isNaN(fuelUsed(-5, 30, 'mpg')));
  assert.ok(Number.isNaN(fuelUsed('x', 30, 'mpg')));
});

check('tripCost', () => {
  near(tripCost(300, 30, 3.5, 'mpg'), 35);   // 10 gal * 3.50
  near(tripCost(500, 8, 1.8, 'l100'), 72);   // 40 L * 1.80
  assert.ok(Number.isNaN(tripCost(300, 0, 3.5, 'mpg')));
  assert.ok(Number.isNaN(tripCost(300, 30, -1, 'mpg')));
});

check('costPerDistance', () => {
  near(costPerDistance(300, 30, 3.5, 'mpg'), 35 / 300);
  near(costPerDistance(400, 10, 1.8, 'kml'), (40 * 1.8) / 400);
  assert.ok(Number.isNaN(costPerDistance(0, 30, 3.5, 'mpg')));
});

check('l100 vs kml equivalence at a point', () => {
  // 10 km/L == 10 L/100km? No: 10 km/L uses 100/10=10 L per 100km. So kml=10 <-> l100=10 here.
  near(fuelUsed(100, 10, 'kml'), 10);
  near(fuelUsed(100, 10, 'l100'), 10);
});

check('zero-price trip is free', () => {
  near(tripCost(300, 30, 0, 'mpg'), 0);
});

console.log(`\n${n} checks passed.`);
