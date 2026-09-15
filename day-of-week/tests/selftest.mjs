import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { isLeapYear, daysInMonth, dayOfWeekIndex, dayName, dayOfYear } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('leap year rules (÷4, except centuries not ÷400)', () => {
  assert.equal(isLeapYear(2000), true);
  assert.equal(isLeapYear(1900), false);
  assert.equal(isLeapYear(2024), true);
  assert.equal(isLeapYear(2023), false);
});

check('days in month, including leap February', () => {
  assert.equal(daysInMonth(2024, 2), 29);
  assert.equal(daysInMonth(2023, 2), 28);
  assert.equal(daysInMonth(2024, 4), 30);
  assert.equal(daysInMonth(2024, 1), 31);
});

check('anchor dates: Jan 1 2000 = Saturday, Jan 1 1970 = Thursday', () => {
  assert.equal(dayName(2000, 1, 1), 'Saturday');
  assert.equal(dayName(1970, 1, 1), 'Thursday');
});

check('the moon landing (Jul 20, 1969) was a Sunday', () => {
  assert.equal(dayName(1969, 7, 20), 'Sunday');
});

check('leap day Feb 29 2024 was a Thursday', () => {
  assert.equal(dayName(2024, 2, 29), 'Thursday');
});

check('weekday index is 0=Sunday .. 6=Saturday', () => {
  assert.equal(dayOfWeekIndex(2000, 1, 1), 6); // Saturday
  assert.equal(dayOfWeekIndex(1970, 1, 1), 4); // Thursday
  assert.equal(dayOfWeekIndex(2026, 9, 11), 5); // Friday
});

check('consecutive days advance the weekday by one (mod 7)', () => {
  for (let d = 1; d < 28; d++) {
    assert.equal(dayOfWeekIndex(2025, 6, d + 1), (dayOfWeekIndex(2025, 6, d) + 1) % 7);
  }
});

check('day of year', () => {
  assert.equal(dayOfYear(2024, 1, 1), 1);
  assert.equal(dayOfYear(2024, 3, 1), 61);  // leap: 31 + 29 + 1
  assert.equal(dayOfYear(2023, 3, 1), 60);  // non-leap
  assert.equal(dayOfYear(2024, 12, 31), 366);
});

check('a full week of names round-trips through the index', () => {
  const names = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  // 2023-01-01 was a Sunday; the next 7 days cover every name in order
  for (let i = 0; i < 7; i++) assert.equal(dayName(2023, 1, 1 + i), names[i]);
});

check('validation: bad month, day, and non-integer year throw', () => {
  assert.throws(() => dayName(2024, 13, 1), /month must be 1-12/);
  assert.throws(() => dayName(2023, 2, 29), /out of range/); // 2023 not leap
  assert.throws(() => dayName(2024, 4, 31), /out of range/); // April has 30
  assert.throws(() => dayName(2024.5, 1, 1), /year must be an integer/);
});

console.log(`\n${n} checks passed.`);
