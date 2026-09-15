// Headless regression tests for RecipeScaler — fraction parsing, scaling.
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
const { normalizeVulgar, parseFraction, toFraction, scaleLine, scaleRecipe, scaleFactor } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps = 1e-9) => assert.ok(Math.abs(a - b) < eps, `${a} !~= ${b}`);

check('parseFraction — integers, decimals, fractions, mixed', () => {
  assert.equal(parseFraction('2'), 2);
  assert.equal(parseFraction('0.25'), 0.25);
  assert.equal(parseFraction('3/4'), 0.75);
  assert.equal(parseFraction('1 1/2'), 1.5);
  assert.equal(parseFraction('2 3/4'), 2.75);
  assert.ok(Number.isNaN(parseFraction('')));
  assert.ok(Number.isNaN(parseFraction('flour')));
});

check('toFraction — clean cooking fractions', () => {
  assert.equal(toFraction(1.5), '1 1/2');
  assert.equal(toFraction(0.75), '3/4');
  assert.equal(toFraction(0.5), '1/2');
  assert.equal(toFraction(0.25), '1/4');
  assert.equal(toFraction(2), '2');
  assert.equal(toFraction(0), '0');
  assert.equal(toFraction(3.75), '3 3/4');
  assert.equal(toFraction(1 / 3), '1/3');
  assert.equal(toFraction(2 / 3), '2/3');
  assert.equal(toFraction(0.125), '1/8');
});

check('toFraction — carry when fraction rounds up to a whole', () => {
  assert.equal(toFraction(0.99), '1');
  assert.equal(toFraction(1.98), '2');
});

check('parseFraction ∘ toFraction round-trips exact cooking values', () => {
  ['1/2', '1/3', '2/3', '1/4', '3/4', '1/8', '3/8', '5/8', '7/8', '1 1/2', '2 3/4'].forEach(s => {
    near(parseFraction(toFraction(parseFraction(s))), parseFraction(s), 1e-6);
  });
});

check('normalizeVulgar converts unicode fractions', () => {
  assert.equal(normalizeVulgar('1½ cups'), '1 1/2 cups');
  assert.equal(normalizeVulgar('½ tsp salt'), '1/2 tsp salt');
  assert.equal(normalizeVulgar('¾ cup sugar'), '3/4 cup sugar');
  assert.equal(normalizeVulgar('2 eggs'), '2 eggs');
});

check('scaleLine — doubling and halving', () => {
  assert.equal(scaleLine('1 1/2 cups all-purpose flour', 2), '3 cups all-purpose flour');
  assert.equal(scaleLine('1/4 tsp salt', 2), '1/2 tsp salt');
  assert.equal(scaleLine('2 eggs', 0.5), '1 eggs');
  assert.equal(scaleLine('3/4 cup sugar', 2), '1 1/2 cup sugar');
  assert.equal(scaleLine('0.5 cup butter', 3), '1 1/2 cup butter');
});

check('scaleLine — non-quantity lines pass through untouched', () => {
  assert.equal(scaleLine('Preheat oven to 350F', 2), 'Preheat oven to 350F');
  assert.equal(scaleLine('For the topping:', 2), 'For the topping:');
  assert.equal(scaleLine('', 2), '');
});

check('scaleLine — only the leading quantity is scaled', () => {
  // "350" mid-sentence must not change
  assert.equal(scaleLine('1 cup flour, bake at 350', 2), '2 cup flour, bake at 350');
});

check('scaleRecipe — multiline', () => {
  const input = '1 1/2 cups flour\n2 eggs\n1/4 tsp salt';
  const out = scaleRecipe(input, 2);
  assert.equal(out, '3 cups flour\n4 eggs\n1/2 tsp salt');
});

check('scaleRecipe — factor 1 leaves quantities equivalent', () => {
  const out = scaleRecipe('1/2 cup milk\n3 apples', 1);
  assert.equal(out, '1/2 cup milk\n3 apples');
});

check('scaleFactor — servings ratio with guards', () => {
  assert.equal(scaleFactor(4, 6), 1.5);
  assert.equal(scaleFactor(2, 1), 0.5);
  assert.equal(scaleFactor(4, 8), 2);
  assert.ok(Number.isNaN(scaleFactor(0, 5)));   // original servings must be > 0
  assert.equal(scaleFactor(4, ''), 0);           // Number('') is 0 -> factor 0
  assert.ok(Number.isNaN(scaleFactor('', 5)));   // empty original -> NaN
});

console.log(`\n${n} checks passed.`);
