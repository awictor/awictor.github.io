import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { isoWeek, weekday, weeksInYear, format } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('2020-01-01 is week 1 of 2020', () => {
  assert.deepEqual(isoWeek(2020, 1, 1), { week: 1, weekYear: 2020 });
});

check('early January can belong to the previous year (2021-01-01 → 2020-W53)', () => {
  assert.deepEqual(isoWeek(2021, 1, 1), { week: 53, weekYear: 2020 });
  assert.deepEqual(isoWeek(2016, 1, 1), { week: 53, weekYear: 2015 });
  assert.deepEqual(isoWeek(2023, 1, 1), { week: 52, weekYear: 2022 });
});

check('late December can belong to the next year (2024-12-30 → 2025-W01)', () => {
  assert.deepEqual(isoWeek(2024, 12, 30), { week: 1, weekYear: 2025 });
});

check('a Monday-start year: 2024-01-01 is week 1', () => {
  assert.deepEqual(isoWeek(2024, 1, 1), { week: 1, weekYear: 2024 });
  assert.equal(weekday(2024, 1, 1), 1);   // Monday
});

check('weekday numbering (Mon=1 … Sun=7)', () => {
  assert.equal(weekday(2023, 1, 1), 7);   // Sunday
  assert.equal(weekday(2024, 6, 14), 5);  // Friday
});

check('weeks in year', () => {
  assert.equal(weeksInYear(2020), 53);
  assert.equal(weeksInYear(2015), 53);
  assert.equal(weeksInYear(2021), 52);
  assert.equal(weeksInYear(2023), 52);
});

check('Dec 28 is always in the last week', () => {
  for(const y of [2019, 2020, 2021, 2024]){
    assert.equal(isoWeek(y, 12, 28).week, weeksInYear(y));
  }
});

check('week numbers stay within 1..53', () => {
  for(let m = 1; m <= 12; m++){
    const w = isoWeek(2024, m, 15).week;
    assert.ok(w >= 1 && w <= 53);
  }
});

check('format renders YYYY-Www with zero padding', () => {
  assert.equal(format(isoWeek(2024, 1, 1)), '2024-W01');
  assert.equal(format(isoWeek(2021, 1, 1)), '2020-W53');
});

check('validation', () => {
  assert.throws(() => isoWeek('x', 1, 1), /valid date/);
  assert.throws(() => weekday(2024, 1.5, 1), /valid date/);
});

console.log(`\n${n} checks passed.`);
