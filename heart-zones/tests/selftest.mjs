// Headless regression tests for HeartZones pure functions.
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
const { maxHeartRate, karvonen, zones, ZONE_DEFS } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('maxHeartRate formulas', () => {
  assert.equal(maxHeartRate(30), 190);                 // 220 - 30
  assert.equal(maxHeartRate(30, 'haskell'), 190);
  assert.equal(maxHeartRate(30, 'tanaka'), 187);       // 208 - 21
  assert.equal(maxHeartRate(30, 'gulati'), 180);       // 206 - 26.4 -> 180
  assert.equal(maxHeartRate(50, 'tanaka'), 173);       // 208 - 35
});

check('maxHeartRate rejects bad ages', () => {
  assert.equal(maxHeartRate(0), null);
  assert.equal(maxHeartRate(-5), null);
  assert.equal(maxHeartRate(200), null);
  assert.equal(maxHeartRate('abc'), null);
});

check('karvonen target heart rate', () => {
  assert.equal(karvonen(190, 60, 0.7), 151);   // 130*0.7 + 60 = 151
  assert.equal(karvonen(190, 60, 0), 60);      // resting at 0% intensity
  assert.equal(karvonen(190, 60, 1), 190);     // max at 100%
  assert.equal(karvonen(190, 60, 0.5), 125);   // 65 + 60
  assert.equal(karvonen(190, NaN, 0.5), null);
});

check('zones (% of max) for maxHR 190', () => {
  const zs = zones(190);
  assert.equal(zs.length, 5);
  assert.deepEqual(
    { zone: zs[0].zone, low: zs[0].low, high: zs[0].high, pctLow: zs[0].pctLow, pctHigh: zs[0].pctHigh },
    { zone: 1, low: 95, high: 114, pctLow: 50, pctHigh: 60 });
  assert.equal(zs[4].low, 171);   // 90%
  assert.equal(zs[4].high, 190);  // 100%
  assert.equal(zs[0].method, 'pctmax');
});

check('zones (Karvonen) when resting HR provided', () => {
  const zs = zones(190, 60);
  assert.equal(zs[0].method, 'karvonen');
  assert.equal(zs[0].low, 125);   // karvonen 50%: 65 + 60
  assert.equal(zs[0].high, 138);  // karvonen 60%: 78 + 60
  assert.equal(zs[4].low, 177);   // karvonen 90%: 117 + 60
  assert.equal(zs[4].high, 190);  // karvonen 100%
});

check('zones falls back to %max for invalid resting HR', () => {
  assert.equal(zones(190, 0)[0].method, 'pctmax');
  assert.equal(zones(190, 200)[0].method, 'pctmax'); // rest >= max
  assert.equal(zones(190, NaN)[0].method, 'pctmax');
});

check('zones are contiguous and increasing', () => {
  const zs = zones(190, 55);
  for(let i = 1; i < zs.length; i++){
    assert.equal(zs[i].low, zs[i-1].high);         // each zone starts where the last ended
    assert.ok(zs[i].high > zs[i].low);
  }
});

check('zones returns null for invalid max', () => {
  assert.equal(zones(0), null);
  assert.equal(zones(NaN), null);
});

check('ZONE_DEFS shape', () => {
  assert.equal(ZONE_DEFS.length, 5);
  assert.equal(ZONE_DEFS[0].low, 0.5);
  assert.equal(ZONE_DEFS[4].high, 1.0);
});

console.log(`\n${n} checks passed.`);
