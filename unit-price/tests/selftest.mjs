// Headless regression tests for UnitPrice — price-per-unit comparison.
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
const { FACTORS, FAMILIES, toBase, unitPrice, rank } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps = 1e-6) => assert.ok(Math.abs(a - b) < eps, `${a} !~= ${b}`);

check('toBase — unit conversions', () => {
  assert.equal(toBase(1, 'kg'), 1000);
  assert.equal(toBase(1, 'g'), 1);
  near(toBase(1, 'lb'), 453.59237);
  near(toBase(16, 'oz'), 453.59237, 1e-4); // 16 oz == 1 lb
  assert.equal(toBase(2, 'l'), 2000);
  assert.ok(Number.isNaN(toBase('x', 'g')));
});

check('unitPrice — price per base unit', () => {
  near(unitPrice(3, 500, 'g'), 0.006);   // $3 / 500g
  near(unitPrice(5, 1, 'kg'), 0.005);    // $5 / 1000g
  assert.ok(Number.isNaN(unitPrice(3, 0, 'g')));
  assert.ok(Number.isNaN(unitPrice('x', 5, 'g')));
});

check('rank — cheapest per unit first', () => {
  const r = rank([
    { label: 'small', price: 3, value: 500, unit: 'g' },   // 0.006/g
    { label: 'big', price: 5, value: 1, unit: 'kg' }       // 0.005/g
  ]);
  assert.equal(r[0].label, 'big');
  assert.equal(r[0].best, true);
  assert.equal(r[0].ratio, 1);
  assert.equal(r[1].label, 'small');
  near(r[1].ratio, 0.006 / 0.005); // 1.2
});

check('rank — ignores invalid rows', () => {
  const r = rank([
    { label: 'ok', price: 2, value: 100, unit: 'g' },
    { label: 'blank', price: '', value: '', unit: 'g' },
    { label: 'zero', price: 5, value: 0, unit: 'g' }
  ]);
  assert.equal(r.length, 1);
  assert.equal(r[0].label, 'ok');
});

check('rank — empty input', () => {
  assert.deepEqual(rank([]), []);
  assert.deepEqual(rank([{ label: 'x', price: '', value: '', unit: 'g' }]), []);
});

check('rank — cross-unit comparison within a family', () => {
  const r = rank([
    { label: 'floz bottle', price: 4, value: 16, unit: 'floz' },
    { label: 'litre bottle', price: 7, value: 1, unit: 'l' }
  ]);
  // 16 floz = 473.18 ml -> 4/473.18 = 0.008454; 1 l = 1000 ml -> 7/1000 = 0.007
  assert.equal(r[0].label, 'litre bottle');
});

check('FAMILIES / FACTORS shape', () => {
  assert.deepEqual(FAMILIES.weight, ['g', 'kg', 'oz', 'lb']);
  assert.equal(FACTORS.ea, 1);
  assert.ok(FACTORS.floz > 29 && FACTORS.floz < 30);
});

check('count family — per-item pricing', () => {
  const r = rank([
    { label: '12-pack', price: 6, value: 12, unit: 'ea' },   // 0.5/item
    { label: '10-pack', price: 4, value: 10, unit: 'ea' }    // 0.4/item
  ]);
  assert.equal(r[0].label, '10-pack');
  near(r[0].unitPrice, 0.4);
});

console.log(`\n${n} checks passed.`);
