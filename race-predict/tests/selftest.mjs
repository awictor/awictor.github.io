// Headless regression tests for RacePredict — Riegel race-time prediction.
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
const { parseTime, formatTime, riegel, pacePerKm } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps = 1e-6) => assert.ok(Math.abs(a - b) < eps, `${a} !~= ${b}`);

check('parseTime — mm:ss and h:mm:ss and seconds', () => {
  assert.equal(parseTime('25:00'), 1500);
  assert.equal(parseTime('1:30:00'), 5400);
  assert.equal(parseTime('0:45'), 45);
  assert.equal(parseTime('90'), 90);
  assert.ok(Number.isNaN(parseTime('')));
  assert.ok(Number.isNaN(parseTime('abc')));
  assert.ok(Number.isNaN(parseTime('1:2:3:4')));
});

check('formatTime', () => {
  assert.equal(formatTime(1500), '25:00');
  assert.equal(formatTime(5400), '1:30:00');
  assert.equal(formatTime(65), '1:05');
  assert.equal(formatTime(0), '0:00');
  assert.equal(formatTime(3661), '1:01:01');
  assert.equal(formatTime(NaN), '—');
});

check('parseTime ∘ formatTime round-trip', () => {
  ['25:00', '1:30:00', '3:07', '2:00:00'].forEach(s => {
    assert.equal(formatTime(parseTime(s)), s.replace(/^0/, '') === s ? s : s);
  });
  assert.equal(formatTime(parseTime('25:00')), '25:00');
});

check('riegel — identity when distances equal', () => {
  near(riegel(1500, 5, 5), 1500);
});

check('riegel — 5K 25:00 -> 10K prediction', () => {
  // 1500 * (10/5)^1.06 = 1500 * 2^1.06
  near(riegel(1500, 5, 10), 1500 * Math.pow(2, 1.06));
  assert.ok(riegel(1500, 5, 10) > 3000); // more than double the time (fatigue)
});

check('riegel — shorter distance is faster', () => {
  assert.ok(riegel(1500, 5, 1) < 1500 / 5 * 1); // faster than pure linear? at least < input
  assert.ok(riegel(1500, 5, 1) < 1500);
});

check('riegel — custom exponent', () => {
  near(riegel(1000, 1, 2, 1), 2000); // exp 1 -> linear
});

check('riegel — invalid input -> NaN', () => {
  assert.ok(Number.isNaN(riegel(0, 5, 10)));
  assert.ok(Number.isNaN(riegel(1500, 0, 10)));
  assert.ok(Number.isNaN(riegel('x', 5, 10)));
});

check('pacePerKm', () => {
  near(pacePerKm(1500, 5), 300); // 5:00/km
  assert.equal(formatTime(pacePerKm(1500, 5)), '5:00');
  assert.ok(Number.isNaN(pacePerKm(1500, 0)));
});

check('end-to-end: half-marathon prediction from 10K', () => {
  const t = riegel(parseTime('40:00'), 10, 21.0975);
  assert.ok(t > 2400); // longer than the 10K time
  assert.match(formatTime(t), /^\d+:\d{2}:\d{2}$/); // over an hour -> h:mm:ss
});

console.log(`\n${n} checks passed.`);
