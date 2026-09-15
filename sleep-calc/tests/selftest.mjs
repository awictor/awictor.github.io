// Headless regression tests for SleepCalc pure functions.
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
  addEventListener(){},querySelectorAll(){return[];},closest(){return null;}}; }
globalThis.document = {
  getElementById: () => el(), createElement: () => el(),
  querySelectorAll: () => [], documentElement: el()
};
globalThis.localStorage = { getItem:()=>null, setItem(){}, removeItem(){} };
globalThis.matchMedia = () => ({ matches:false });
globalThis.window = { matchMedia: globalThis.matchMedia };

eval(js.replace('if(typeof module !== \'undefined\') module.exports =',
  'globalThis.__t =') );
const { parseTime, mod1440, formatTime, bedtimes, waketimes } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('parseTime 12h/24h', () => {
  assert.equal(parseTime('7:00 AM'), 420);
  assert.equal(parseTime('11:00 PM'), 23 * 60);
  assert.equal(parseTime('23:00'), 23 * 60);
  assert.equal(parseTime('12:00 AM'), 0);
  assert.equal(parseTime('12:00 PM'), 720);
  assert.equal(parseTime('bad'), null);
});

check('mod1440 wraps', () => {
  assert.equal(mod1440(-134), 1306);
  assert.equal(mod1440(1500), 60);
  assert.equal(mod1440(0), 0);
});

check('formatTime 12h', () => {
  assert.equal(formatTime(1306), '9:46 PM');
  assert.equal(formatTime(46), '12:46 AM');
  assert.equal(formatTime(494), '8:14 AM');
  assert.equal(formatTime(0), '12:00 AM');
  assert.equal(formatTime(720), '12:00 PM');
});

check('bedtimes for a 7:00 AM wake', () => {
  const bt = bedtimes(420);
  assert.deepEqual(bt.map(b => b.cycles), [6, 5, 4, 3]);
  assert.equal(bt[0].time, mod1440(420 - (6 * 90 + 14)));   // 1306 = 9:46 PM
  assert.equal(formatTime(bt[0].time), '9:46 PM');
  assert.equal(formatTime(bt[1].time), '11:16 PM');          // 5 cycles
  assert.equal(bt[0].hours, 9);
  assert.equal(bt[1].hours, 7.5);
});

check('waketimes for an 11:00 PM bedtime', () => {
  const wt = waketimes(23 * 60);
  // 11pm + 14 + 6*90 = 1380 + 554 = 1934 -> 494 = 8:14 AM
  assert.equal(formatTime(wt[0].time), '8:14 AM');
  assert.equal(wt[0].hours, 9);
});

check('custom options (cycle, fallAsleep, cycles list)', () => {
  const bt = bedtimes(600, { fallAsleep: 0, cycle: 100, cycles: [5] });
  assert.equal(bt.length, 1);
  assert.equal(bt[0].time, mod1440(600 - 500));   // 100
});

check('bedtimes wrap across midnight', () => {
  // wake 6:00 AM (360), 4 cycles -> 360 - 374 = -14 -> 1426 = 11:46 PM
  assert.equal(formatTime(bedtimes(360)[2].time), '11:46 PM');
});

console.log(`\n${n} checks passed.`);
