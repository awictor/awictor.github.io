// Headless regression tests for ApyApr — APR<->APY conversion.
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
const { aprToApy, apyToApr } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps = 1e-6) => assert.ok(Math.abs(a - b) < eps, `${a} !~= ${b}`);

check('aprToApy — monthly 12% -> 12.6825%', () => {
  near(aprToApy(12, 12), (Math.pow(1.01, 12) - 1) * 100);
  near(aprToApy(12, 12), 12.682503013196972, 1e-9);
});

check('aprToApy — annual is identity', () => {
  near(aprToApy(5, 1), 5);
  near(aprToApy(12, 1), 12);
});

check('aprToApy — continuous compounding uses e^r', () => {
  near(aprToApy(100, Infinity), (Math.E - 1) * 100);
  near(aprToApy(5, Infinity), (Math.exp(0.05) - 1) * 100);
});

check('aprToApy — more frequent compounding => higher APY', () => {
  const annual = aprToApy(10, 1);
  const monthly = aprToApy(10, 12);
  const daily = aprToApy(10, 365);
  const cont = aprToApy(10, Infinity);
  assert.ok(annual < monthly && monthly < daily && daily < cont);
});

check('apyToApr — inverse of aprToApy', () => {
  near(apyToApr(aprToApy(12, 12), 12), 12);
  near(apyToApr(aprToApy(5, 365), 365), 5);
  near(apyToApr(aprToApy(7.5, Infinity), Infinity), 7.5);
});

check('apyToApr — continuous uses ln(1+y)', () => {
  near(apyToApr(100, Infinity), Math.log(2) * 100); // 100% APY continuous -> ln(2)
});

check('apyToApr — annual is identity', () => {
  near(apyToApr(8, 1), 8);
});

check('guards -> NaN', () => {
  assert.ok(Number.isNaN(aprToApy(5, 0)));
  assert.ok(Number.isNaN(aprToApy('x', 12)));
  assert.ok(Number.isNaN(apyToApr(-150, 12))); // y <= -1
  assert.ok(Number.isNaN(apyToApr(5, 0)));
});

check('zero rate -> zero either way', () => {
  near(aprToApy(0, 12), 0);
  near(apyToApr(0, 12), 0);
});

console.log(`\n${n} checks passed.`);
