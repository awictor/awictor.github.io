// Headless regression tests for DueDate pure functions.
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
const { parseDate, addDays, daysBetween, dueDate, conceptionDate, gestationalAge, trimester } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('parseDate validates format', () => {
  assert.ok(parseDate('2025-01-01'));
  assert.equal(parseDate('2025-1-1'), null);
  assert.equal(parseDate('not a date'), null);
  assert.equal(parseDate(''), null);
});

check('addDays / daysBetween across month boundaries', () => {
  assert.equal(addDays('2025-01-01', 280), '2025-10-08');
  assert.equal(addDays('2025-01-31', 1), '2025-02-01');
  assert.equal(daysBetween('2025-01-01', '2025-02-12'), 42);
  assert.equal(daysBetween('2025-01-01', '2024-12-31'), -1);
});

check('addDays handles leap year', () => {
  assert.equal(addDays('2024-02-28', 1), '2024-02-29');
  assert.equal(addDays('2024-02-28', 2), '2024-03-01');
});

check('dueDate = LMP + 280 days', () => {
  assert.equal(dueDate('2025-01-01'), '2025-10-08');
  assert.equal(dueDate('2024-03-10'), addDays('2024-03-10', 280));
  assert.equal(dueDate('bad'), null);
});

check('conceptionDate = LMP + 14 days', () => {
  assert.equal(conceptionDate('2025-01-01'), '2025-01-15');
});

check('gestationalAge weeks + days', () => {
  assert.deepEqual(gestationalAge('2025-01-01', '2025-02-12'), { weeks: 6, days: 0, totalDays: 42 });
  assert.deepEqual(gestationalAge('2025-01-01', '2025-01-11'), { weeks: 1, days: 3, totalDays: 10 });
  assert.equal(gestationalAge('2025-01-01', '2024-12-25').totalDays, -7);
});

check('trimester boundaries', () => {
  assert.equal(trimester(0), 1);
  assert.equal(trimester(97), 1);      // 13w6d
  assert.equal(trimester(98), 2);      // 14w0d
  assert.equal(trimester(195), 2);
  assert.equal(trimester(196), 3);     // 28w0d
  assert.equal(trimester(280), 3);
  assert.equal(trimester(-1), null);
});

check('full flow: 40 weeks after LMP is the due date', () => {
  const lmp = '2025-01-01';
  const ga = gestationalAge(lmp, dueDate(lmp));
  assert.equal(ga.weeks, 40);
  assert.equal(ga.days, 0);
});

console.log(`\n${n} checks passed.`);
