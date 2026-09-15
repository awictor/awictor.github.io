// Headless regression tests for BizDays — business-day date math (UTC).
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
const { parseUTC, fmt, isWeekend, isBusinessDay, addBusinessDays, businessDaysBetween, parseHolidays, weekdayName } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('parseUTC — valid & rejects impossible dates', () => {
  assert.equal(fmt(parseUTC('2024-01-05')), '2024-01-05');
  assert.equal(parseUTC('2024-02-30'), null);   // Feb has no 30th
  assert.equal(parseUTC('2024-13-01'), null);
  assert.equal(parseUTC('not-a-date'), null);
  assert.equal(parseUTC('2024-1-5'), null);      // requires zero-padding
});

check('isWeekend — Jan 2024 (Mon 1st)', () => {
  assert.equal(isWeekend(parseUTC('2024-01-06')), true);  // Saturday
  assert.equal(isWeekend(parseUTC('2024-01-07')), true);  // Sunday
  assert.equal(isWeekend(parseUTC('2024-01-08')), false); // Monday
  assert.equal(weekdayName('2024-01-01'), 'Monday');
});

check('addBusinessDays — forward, skips weekends', () => {
  assert.equal(addBusinessDays('2024-01-01', 1), '2024-01-02'); // Mon -> Tue
  assert.equal(addBusinessDays('2024-01-05', 1), '2024-01-08'); // Fri -> Mon
  assert.equal(addBusinessDays('2024-01-05', 5), '2024-01-12'); // Fri -> next Fri
  assert.equal(addBusinessDays('2024-01-01', 10), '2024-01-15');
});

check('addBusinessDays — backward and zero', () => {
  assert.equal(addBusinessDays('2024-01-08', -1), '2024-01-05'); // Mon -> Fri
  assert.equal(addBusinessDays('2024-01-08', -5), '2024-01-01');
  assert.equal(addBusinessDays('2024-01-06', 0), '2024-01-06');  // unchanged even on a weekend
});

check('addBusinessDays — respects holidays', () => {
  assert.equal(addBusinessDays('2024-01-01', 1, ['2024-01-02']), '2024-01-03'); // skip Tue holiday
  assert.equal(addBusinessDays('2024-01-05', 1, ['2024-01-08']), '2024-01-09'); // skip Mon holiday
  assert.equal(addBusinessDays('bad', 1), null);
});

check('businessDaysBetween — counts working days after start through end', () => {
  assert.equal(businessDaysBetween('2024-01-01', '2024-01-05'), 4); // Tue..Fri
  assert.equal(businessDaysBetween('2024-01-05', '2024-01-08'), 1); // just Mon (Sat/Sun skipped)
  assert.equal(businessDaysBetween('2024-01-01', '2024-01-08'), 5); // Tue..Fri + Mon
  assert.equal(businessDaysBetween('2024-01-05', '2024-01-05'), 0);
});

check('businessDaysBetween — order-independent magnitude', () => {
  assert.equal(businessDaysBetween('2024-01-08', '2024-01-01'),
               businessDaysBetween('2024-01-01', '2024-01-08'));
});

check('businessDaysBetween — respects holidays', () => {
  assert.equal(businessDaysBetween('2024-01-01', '2024-01-05', ['2024-01-03']), 3); // Tue,Thu,Fri
  assert.equal(businessDaysBetween('bad', '2024-01-05'), null);
});

check('full month sanity — Jan 2024 has 23 working days', () => {
  // From Jan 1 (exclusive) to Jan 31 (inclusive) = 22; plus Jan 1 itself is a business day.
  assert.equal(businessDaysBetween('2024-01-01', '2024-01-31'), 22);
  assert.equal(businessDaysBetween('2023-12-31', '2024-01-31'), 23); // includes all of Jan
});

check('parseHolidays — keeps only valid ISO dates', () => {
  assert.deepEqual(parseHolidays('2024-01-15\n  2024-02-19  \ngarbage\n2024-13-40\n'),
    ['2024-01-15', '2024-02-19']);
  assert.deepEqual(parseHolidays(''), []);
});

console.log(`\n${n} checks passed.`);
