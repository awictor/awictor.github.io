// Headless regression tests for HoursCalc pure functions.
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
const { parseTime, durationMinutes, workedMinutes, minutesToDecimal, minutesToHM, payFor } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('parseTime handles 12h formats', () => {
  assert.equal(parseTime('9:00 AM'), 540);
  assert.equal(parseTime('12:00 AM'), 0);      // midnight
  assert.equal(parseTime('12:00 PM'), 720);    // noon
  assert.equal(parseTime('5:30 PM'), 17 * 60 + 30);
  assert.equal(parseTime('9am'), 540);
  assert.equal(parseTime('11:59 pm'), 23 * 60 + 59);
});

check('parseTime handles 24h formats', () => {
  assert.equal(parseTime('17:30'), 17 * 60 + 30);
  assert.equal(parseTime('0:00'), 0);
  assert.equal(parseTime('23:59'), 23 * 60 + 59);
  assert.equal(parseTime('8'), 8 * 60);
});

check('parseTime rejects invalid input', () => {
  assert.equal(parseTime(''), null);
  assert.equal(parseTime('25:00'), null);
  assert.equal(parseTime('9:60'), null);
  assert.equal(parseTime('13:00 PM'), null);   // 13 invalid with am/pm
  assert.equal(parseTime('abc'), null);
});

check('durationMinutes same-day', () => {
  assert.equal(durationMinutes('9:00 AM', '5:00 PM'), 480);
  assert.equal(durationMinutes('9:00', '9:00'), 0);
});

check('durationMinutes overnight wraps', () => {
  assert.equal(durationMinutes('11:00 PM', '7:00 AM'), 8 * 60);
  assert.equal(durationMinutes('22:00', '2:00'), 4 * 60);
});

check('workedMinutes subtracts break, floors at 0', () => {
  assert.equal(workedMinutes('9:00 AM', '5:30 PM', 30), 8 * 60);   // 8.5h - 30m = 8h
  assert.equal(workedMinutes('9:00 AM', '5:00 PM', 0), 480);
  assert.equal(workedMinutes('9:00 AM', '9:10 AM', 30), 0);        // break > worked
  assert.equal(workedMinutes('9:00 AM', '5:00 PM', -10), 480);     // negative break ignored
});

check('minutesToDecimal rounds to 2dp', () => {
  assert.equal(minutesToDecimal(480), 8);
  assert.equal(minutesToDecimal(510), 8.5);
  assert.equal(minutesToDecimal(485), 8.08);
});

check('minutesToHM formats h and m', () => {
  assert.equal(minutesToHM(480), '8h 00m');
  assert.equal(minutesToHM(510), '8h 30m');
  assert.equal(minutesToHM(65), '1h 05m');
  assert.equal(minutesToHM(0), '0h 00m');
});

check('payFor multiplies decimal hours by rate', () => {
  assert.equal(payFor(480, 25), 200);
  assert.equal(payFor(510, 20), 170);           // 8.5h * 20
  assert.equal(payFor(480, 0), null);
  assert.equal(payFor(480, ''), null);
});

check('end-to-end: 8am-4:30pm, 45m lunch, $30/hr', () => {
  const net = workedMinutes('8:00 AM', '4:30 PM', 45);
  assert.equal(net, 7 * 60 + 45);               // 8.5h - 45m = 7h45m
  assert.equal(minutesToDecimal(net), 7.75);
  assert.equal(minutesToHM(net), '7h 45m');
  assert.equal(payFor(net, 30), 232.5);
});

console.log(`\n${n} checks passed.`);
