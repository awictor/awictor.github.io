// Headless regression tests for BsaCalc — body surface area formulas.
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
const { num, lbToKg, inToCm, mosteller, dubois, haycock, gehanGeorge, bsa } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps) => assert.ok(Math.abs(a - b) < eps, `${a} !~= ${b} (eps ${eps})`);

check('mosteller — exact sqrt formula', () => {
  near(mosteller(180, 75), Math.sqrt(180 * 75 / 3600), 1e-12);
  near(mosteller(180, 75), 1.936491673, 1e-6);   // sqrt(3.75)
  near(mosteller(100, 25), Math.sqrt(2500 / 3600), 1e-9);
});

check('du Bois — known ~1.94 m² for 180cm/75kg', () => {
  near(dubois(180, 75), 1.943, 0.01);
});

check('haycock & gehan-george — agree with others ~1.94', () => {
  near(haycock(180, 75), 1.94, 0.02);
  near(gehanGeorge(180, 75), 1.94, 0.02);
});

check('all four formulas agree within ~5% for a typical adult', () => {
  const vals = [mosteller(175, 70), dubois(175, 70), haycock(175, 70), gehanGeorge(175, 70)];
  const min = Math.min(...vals), max = Math.max(...vals);
  assert.ok((max - min) / min < 0.05, `spread ${((max - min) / min * 100).toFixed(1)}%`);
});

check('bsa dispatches by formula name', () => {
  near(bsa(180, 75, 'mosteller'), mosteller(180, 75), 1e-12);
  near(bsa(180, 75, 'dubois'), dubois(180, 75), 1e-12);
  near(bsa(180, 75, 'haycock'), haycock(180, 75), 1e-12);
  near(bsa(180, 75, 'gehanGeorge'), gehanGeorge(180, 75), 1e-12);
  near(bsa(180, 75, 'unknown'), mosteller(180, 75), 1e-12); // fallback
});

check('bsa — invalid inputs -> NaN', () => {
  assert.ok(Number.isNaN(bsa(0, 75, 'mosteller')));
  assert.ok(Number.isNaN(bsa(180, 0, 'mosteller')));
  assert.ok(Number.isNaN(bsa('x', 75, 'mosteller')));
});

check('BSA grows with size (monotonic)', () => {
  assert.ok(mosteller(190, 90) > mosteller(180, 75));
  assert.ok(mosteller(160, 55) < mosteller(180, 75));
});

check('unit conversions', () => {
  near(lbToKg(165), 74.84, 0.01);
  near(inToCm(70), 177.8, 0.01);
  // 5'11" (~180.3cm) / 165lb (~74.8kg) mosteller ~1.94
  near(mosteller(inToCm(71), lbToKg(165)), 1.94, 0.02);
});

check('num coerces', () => {
  assert.equal(num('180'), 180);
  assert.ok(Number.isNaN(num('abc')));
});

console.log(`\n${n} checks passed.`);
