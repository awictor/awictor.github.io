// Headless regression tests for VatCalc — add / extract tax.
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
const { num, addTax, extractTax } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps = 1e-9) => assert.ok(Math.abs(a - b) < eps, `${a} !~= ${b}`);

check('addTax — 20% on 100', () => {
  const r = addTax(100, 20);
  near(r.net, 100); near(r.tax, 20); near(r.gross, 120);
});

check('extractTax — 20% out of 120', () => {
  const r = extractTax(120, 20);
  near(r.net, 100); near(r.tax, 20); near(r.gross, 120);
});

check('extractTax — 20% out of 100 (net < gross)', () => {
  const r = extractTax(100, 20);
  near(r.net, 100 / 1.2);
  near(r.tax, 100 - 100 / 1.2);
  near(r.gross, 100);
});

check('addTax then extractTax round-trips', () => {
  const a = addTax(37.5, 8.875);
  const b = extractTax(a.gross, 8.875);
  near(b.net, 37.5);
});

check('zero rate -> no tax', () => {
  assert.deepEqual(addTax(50, 0), { net: 50, tax: 0, gross: 50, rate: 0 });
  const e = extractTax(50, 0);
  near(e.net, 50); near(e.tax, 0);
});

check('zero amount', () => {
  near(addTax(0, 20).gross, 0);
  near(extractTax(0, 20).net, 0);
});

check('invalid inputs -> null', () => {
  assert.equal(addTax(-5, 20), null);
  assert.equal(addTax(100, -1), null);
  assert.equal(extractTax('x', 20), null);
  assert.equal(addTax(100, 'y'), null);
});

check('num coerces', () => {
  assert.equal(num('12.5'), 12.5);
  assert.ok(Number.isNaN(num('abc')));
});

check('gross always >= net; tax = gross - net', () => {
  [ [100, 5], [250, 20], [99.99, 7.5] ].forEach(function(p){
    const r = addTax(p[0], p[1]);
    assert.ok(r.gross >= r.net);
    near(r.tax, r.gross - r.net);
  });
});

console.log(`\n${n} checks passed.`);
