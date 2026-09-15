// Headless regression tests for MarkupMargin — pricing math.
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
const { num, priceFromMargin, priceFromMarkup, marginFromPrice, markupFromPrice, marginToMarkup, markupToMargin, analyze } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps = 1e-9) => assert.ok(Math.abs(a - b) < eps, `${a} !~= ${b}`);

check('canonical cost 80 / price 100', () => {
  near(marginFromPrice(80, 100), 20);
  near(markupFromPrice(80, 100), 25);
  const a = analyze(80, 100);
  near(a.profit, 20); near(a.marginPct, 20); near(a.markupPct, 25);
});

check('priceFromMargin / priceFromMarkup', () => {
  near(priceFromMargin(80, 20), 100);
  near(priceFromMarkup(80, 25), 100);
  near(priceFromMargin(50, 50), 100);   // 50% margin doubles cost
  near(priceFromMarkup(50, 100), 100);  // 100% markup doubles cost
});

check('margin <-> markup conversion', () => {
  near(marginToMarkup(20), 25);
  near(markupToMargin(25), 20);
  near(marginToMarkup(50), 100);
  near(markupToMargin(100), 50);
  near(markupToMargin(marginToMarkup(33)), 33); // round-trip
});

check('round-trip price <-> margin <-> price', () => {
  const price = priceFromMargin(37.5, 40);
  near(marginFromPrice(37.5, price), 40);
  const p2 = priceFromMarkup(37.5, 60);
  near(markupFromPrice(37.5, p2), 60);
});

check('zero markup/margin -> price equals cost', () => {
  near(priceFromMargin(80, 0), 80);
  near(priceFromMarkup(80, 0), 80);
  near(marginFromPrice(80, 80), 0);
  near(markupFromPrice(80, 80), 0);
});

check('negative markup (loss) allowed; below-cost price', () => {
  near(priceFromMarkup(100, -10), 90);
  near(markupFromPrice(100, 90), -10);
  near(marginFromPrice(100, 80), -25); // selling below cost
});

check('guards -> NaN', () => {
  assert.ok(Number.isNaN(priceFromMargin(80, 100)));  // margin 100% impossible
  assert.ok(Number.isNaN(priceFromMargin(80, 150)));
  assert.ok(Number.isNaN(marginFromPrice(80, 0)));    // price must be > 0
  assert.ok(Number.isNaN(markupFromPrice(0, 100)));   // cost must be > 0
  assert.ok(Number.isNaN(marginToMarkup(100)));
});

check('num coerces', () => {
  assert.equal(num('80'), 80);
  assert.ok(Number.isNaN(num('abc')));
});

console.log(`\n${n} checks passed.`);
