// Headless regression tests for Amortize pure functions.
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
const { monthlyPayment, schedule } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps = 0.01) => assert.ok(Math.abs(a - b) < eps, `${a} vs ${b}`);

check('monthlyPayment standard mortgage', () => {
  near(monthlyPayment(100000, 6, 360), 599.55, 0.05);
  near(monthlyPayment(250000, 6.5, 360), 1580.17, 0.1);
});

check('monthlyPayment 0% is principal / months', () => {
  assert.equal(monthlyPayment(1200, 0, 12), 100);
});

check('monthlyPayment guards', () => {
  assert.equal(monthlyPayment(0, 5, 12), null);
  assert.equal(monthlyPayment(1000, 5, 0), null);
  assert.equal(monthlyPayment(-1000, 5, 12), null);
});

check('schedule length equals months', () => {
  assert.equal(schedule(100000, 6, 360).rows.length, 360);
  assert.equal(schedule(1200, 0, 12).rows.length, 12);
});

check('schedule final balance is exactly zero', () => {
  assert.equal(schedule(250000, 6.5, 360).rows[359].balance, 0);
  assert.equal(schedule(100000, 6, 360).rows.at(-1).balance, 0);
});

check('schedule 0% loan: equal principal, no interest', () => {
  const s = schedule(1200, 0, 12);
  assert.equal(s.totalInterest, 0);
  assert.equal(s.totalPaid, 1200);
  s.rows.forEach(r => { assert.equal(r.interest, 0); near(r.principal, 100); });
  assert.equal(s.rows[0].balance, 1100);
  assert.equal(s.rows[11].balance, 0);
});

check('sum of principal payments equals loan amount', () => {
  const s = schedule(100000, 6, 360);
  const sumPrincipal = s.rows.reduce((a, r) => a + r.principal, 0);
  near(sumPrincipal, 100000, 0.01);
});

check('totalPaid = principal + totalInterest and matches payment sum', () => {
  const s = schedule(250000, 6.5, 360);
  near(s.totalPaid, 250000 + s.totalInterest, 0.01);
  const sumPay = s.rows.reduce((a, r) => a + r.payment, 0);
  near(sumPay, s.totalPaid, 0.02);
});

check('interest portion decreases over the life of the loan', () => {
  const s = schedule(100000, 6, 360);
  assert.ok(s.rows[0].interest > s.rows[180].interest);
  assert.ok(s.rows[180].interest > s.rows[359].interest);
});

console.log(`\n${n} checks passed.`);
