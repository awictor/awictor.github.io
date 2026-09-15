// Headless regression tests for PregnancyDue — Naegele date math.
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
const { parseUTC, fmt, addDays, eddFromLmp, conceptionFromLmp, lmpFromEdd, lmpFromConception, daysBetween, gestationalAge, trimester } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('addDays / parseUTC', () => {
  assert.equal(addDays('2024-01-01', 14), '2024-01-15');
  assert.equal(addDays('2024-01-01', -1), '2023-12-31');
  assert.equal(addDays('2024-02-28', 1), '2024-02-29'); // leap
  assert.equal(parseUTC('2024-13-01'), null);
});

check('eddFromLmp — Naegele +280 days (leap year)', () => {
  assert.equal(eddFromLmp('2024-01-01'), '2024-10-07'); // 280 days later
  assert.equal(eddFromLmp('2023-01-01'), '2023-10-08'); // non-leap
});

check('eddFromLmp — cycle-length adjustment', () => {
  assert.equal(eddFromLmp('2024-01-01', 28), '2024-10-07');
  assert.equal(eddFromLmp('2024-01-01', 35), addDays('2024-10-07', 7)); // longer cycle -> later
  assert.equal(eddFromLmp('2024-01-01', 21), addDays('2024-10-07', -7));
});

check('conceptionFromLmp — LMP + 14 days', () => {
  assert.equal(conceptionFromLmp('2024-01-01'), '2024-01-15');
  assert.equal(conceptionFromLmp('2024-01-01', 35), '2024-01-22'); // +14+7
});

check('lmpFromEdd is inverse of eddFromLmp (28-day)', () => {
  const edd = eddFromLmp('2024-03-10');
  assert.equal(lmpFromEdd(edd), '2024-03-10');
});

check('lmpFromConception is inverse of conceptionFromLmp', () => {
  const c = conceptionFromLmp('2024-03-10', 30);
  assert.equal(lmpFromConception(c, 30), '2024-03-10');
});

check('gestationalAge — weeks + days from LMP', () => {
  assert.deepEqual(gestationalAge('2024-01-01', '2024-01-15'), { days: 14, weeks: 2, remDays: 0 });
  assert.deepEqual(gestationalAge('2024-01-01', '2024-01-11'), { days: 10, weeks: 1, remDays: 3 });
  assert.deepEqual(gestationalAge('2024-01-01', '2024-01-01'), { days: 0, weeks: 0, remDays: 0 });
});

check('trimester boundaries', () => {
  assert.equal(trimester(0), 1);
  assert.equal(trimester(13), 1);
  assert.equal(trimester(14), 2);
  assert.equal(trimester(27), 2);
  assert.equal(trimester(28), 3);
  assert.equal(trimester(40), 3);
});

check('daysBetween', () => {
  assert.equal(daysBetween('2024-01-01', '2024-10-07'), 280);
  assert.equal(daysBetween('2024-10-07', '2024-01-01'), -280);
  assert.equal(daysBetween('bad', '2024-01-01'), null);
});

check('full flow: LMP -> EDD is 40 weeks gestation', () => {
  const lmp = '2024-01-01';
  const edd = eddFromLmp(lmp);
  assert.deepEqual(gestationalAge(lmp, edd), { days: 280, weeks: 40, remDays: 0 });
});

console.log(`\n${n} checks passed.`);
