// Headless regression tests for PositionSize — position sizing & risk:reward.
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
const { num, positionSize, riskReward } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps = 1e-9) => assert.ok(Math.abs(a - b) < eps, `${a} !~= ${b}`);

check('canonical long trade', () => {
  const r = positionSize({ account: 10000, riskPct: 1, entry: 100, stop: 95 });
  near(r.riskAmount, 100);
  near(r.perUnitRisk, 5);
  assert.equal(r.shares, 20);
  near(r.positionValue, 2000);
  near(r.positionPct, 20);
  assert.equal(r.direction, 'long');
});

check('shares floor down (never round up risk)', () => {
  // riskAmount 100, perUnitRisk 7 -> 14.28 -> 14 shares
  const r = positionSize({ account: 10000, riskPct: 1, entry: 50, stop: 43 });
  assert.equal(r.perUnitRisk, 7);
  assert.equal(r.shares, 14);
  // 14 * 7 = 98 <= 100 risk budget; 15 would exceed
  assert.ok(r.shares * r.perUnitRisk <= r.riskAmount);
});

check('short trade (stop above entry)', () => {
  const r = positionSize({ account: 20000, riskPct: 2, entry: 90, stop: 100 });
  near(r.riskAmount, 400);
  near(r.perUnitRisk, 10);
  assert.equal(r.shares, 40);
  assert.equal(r.direction, 'short');
});

check('entry equals stop -> no position, flat', () => {
  const r = positionSize({ account: 10000, riskPct: 1, entry: 100, stop: 100 });
  assert.equal(r.perUnitRisk, 0);
  assert.equal(r.shares, 0);
  assert.equal(r.positionValue, 0);
  assert.equal(r.direction, 'flat');
});

check('invalid / empty inputs return zeroed result', () => {
  const r = positionSize({ account: 0, riskPct: 1, entry: 100, stop: 95 });
  assert.equal(r.shares, 0);
  assert.equal(r.riskAmount, 0);
  const r2 = positionSize({});
  assert.equal(r2.shares, 0);
  assert.equal(r2.direction, null);
});

check('risk budget is respected across many perUnit values', () => {
  for(let stop = 90; stop < 100; stop++){
    const r = positionSize({ account: 10000, riskPct: 1.5, entry: 100, stop });
    assert.ok(r.shares * r.perUnitRisk <= r.riskAmount + 1e-9, `overshot at stop ${stop}`);
    assert.ok((r.shares + 1) * r.perUnitRisk > r.riskAmount - 1e-9, `undershot at stop ${stop}`);
  }
});

check('positionPct scales with account', () => {
  const r = positionSize({ account: 5000, riskPct: 1, entry: 100, stop: 90 });
  // riskAmount 50, perUnit 10 -> 5 shares -> value 500 -> 10% of 5000
  assert.equal(r.shares, 5);
  near(r.positionPct, 10);
});

check('riskReward — long', () => {
  const rr = riskReward(100, 95, 110);
  near(rr.risk, 5);
  near(rr.reward, 10);
  near(rr.ratio, 2);
});

check('riskReward — short', () => {
  const rr = riskReward(90, 100, 70);
  near(rr.risk, 10);
  near(rr.reward, 20);
  near(rr.ratio, 2);
});

check('riskReward — zero risk -> NaN ratio', () => {
  const rr = riskReward(100, 100, 120);
  assert.ok(Number.isNaN(rr.ratio));
});

check('num coerces and rejects garbage', () => {
  assert.equal(num('42'), 42);
  assert.equal(num('3.5'), 3.5);
  assert.ok(Number.isNaN(num('abc')));
  assert.equal(num(''), 0);   // Number('') is 0; positionSize's account>0 guard rejects it
});

console.log(`\n${n} checks passed.`);
