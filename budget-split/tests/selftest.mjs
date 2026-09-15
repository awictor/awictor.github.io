// Headless regression tests for BudgetSplit — income allocation.
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
const { num, allocate } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps = 1e-9) => assert.ok(Math.abs(a - b) < eps, `${a} !~= ${b}`);

const DEFAULT = [{ label: 'Needs', pct: 50 }, { label: 'Wants', pct: 30 }, { label: 'Savings', pct: 20 }];

check('50/30/20 on 5000', () => {
  const r = allocate(5000, DEFAULT);
  near(r.items[0].amount, 2500);
  near(r.items[1].amount, 1500);
  near(r.items[2].amount, 1000);
  near(r.totalPct, 100);
  near(r.allocated, 5000);
  near(r.leftover, 0);
});

check('custom split 60/20/20', () => {
  const r = allocate(5000, [{ label: 'a', pct: 60 }, { label: 'b', pct: 20 }, { label: 'c', pct: 20 }]);
  near(r.items[0].amount, 3000);
  near(r.leftover, 0);
});

check('under-allocated leaves leftover', () => {
  const r = allocate(5000, [{ label: 'a', pct: 50 }, { label: 'b', pct: 30 }]);
  near(r.totalPct, 80);
  near(r.allocated, 4000);
  near(r.leftover, 1000);
});

check('over-allocated leftover is negative', () => {
  const r = allocate(1000, [{ label: 'a', pct: 70 }, { label: 'b', pct: 60 }]);
  near(r.totalPct, 130);
  near(r.leftover, -300);
});

check('preserves labels', () => {
  const r = allocate(100, DEFAULT);
  assert.deepEqual(r.items.map(i => i.label), ['Needs', 'Wants', 'Savings']);
});

check('non-numeric pct treated as 0', () => {
  const r = allocate(1000, [{ label: 'a', pct: 50 }, { label: 'b', pct: 'x' }]);
  near(r.items[1].amount, 0);
  near(r.totalPct, 50);
});

check('zero income', () => {
  const r = allocate(0, DEFAULT);
  r.items.forEach(i => near(i.amount, 0));
  near(r.leftover, 0);
});

check('invalid income -> null', () => {
  assert.equal(allocate('x', DEFAULT), null);
  assert.equal(allocate(-5, DEFAULT), null);
  assert.equal(allocate(1000, 'nope'), null);
});

check('num helper', () => {
  assert.equal(num('42.5'), 42.5);
  assert.ok(Number.isNaN(num('abc')));
});

console.log(`\n${n} checks passed.`);
