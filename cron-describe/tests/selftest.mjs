import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { describe, fmtTime } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('every minute / every N minutes', () => {
  assert.equal(describe('* * * * *'), 'Every minute');
  assert.equal(describe('*/5 * * * *'), 'Every 5 minutes');
});

check('every hour and every N hours', () => {
  assert.equal(describe('0 * * * *'), 'Every hour');
  assert.equal(describe('30 * * * *'), 'Every hour at minute 30');
  assert.equal(describe('0 */2 * * *'), 'Every 2 hours');
});

check('fixed daily time in 12-hour clock', () => {
  assert.equal(describe('0 0 * * *'), 'At 12:00 AM, every day');
  assert.equal(describe('30 9 * * *'), 'At 9:30 AM, every day');
  assert.equal(describe('0 13 * * *'), 'At 1:00 PM, every day');
});

check('weekday range', () => {
  assert.equal(describe('0 9 * * 1-5'), 'At 9:00 AM, Monday through Friday');
});

check('single weekday (0 = Sunday, 7 = Sunday)', () => {
  assert.equal(describe('0 0 * * 0'), 'At 12:00 AM, only on Sunday');
  assert.equal(describe('0 0 * * 7'), 'At 12:00 AM, only on Sunday');
  assert.equal(describe('0 0 * * 3'), 'At 12:00 AM, only on Wednesday');
});

check('day of month and month', () => {
  assert.equal(describe('0 0 1 * *'), 'At 12:00 AM, on day 1 of the month');
  assert.equal(describe('0 0 1 1 *'), 'At 12:00 AM, on day 1 of the month, in January');
});

check('weekday list', () => {
  assert.equal(describe('0 12 * * 1,3,5'), 'At 12:00 PM, on Monday, Wednesday, Friday');
});

check('fmtTime 12-hour conversion', () => {
  assert.equal(fmtTime(0, 0), '12:00 AM');
  assert.equal(fmtTime(12, 0), '12:00 PM');
  assert.equal(fmtTime(13, 5), '1:05 PM');
  assert.equal(fmtTime(23, 59), '11:59 PM');
});

check('rejects wrong field count', () => {
  assert.throws(() => describe('* * * *'), /5 fields/);
  assert.throws(() => describe('* * * * * *'), /5 fields/);
});

check('rejects invalid field characters', () => {
  assert.throws(() => describe('0 9 * * MON'), /invalid field/);
});

console.log(`\n${n} checks passed.`);
