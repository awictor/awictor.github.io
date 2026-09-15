import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { backoffDelay, schedule, totalWait } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('attempt 0 equals the base delay', () => {
  assert.equal(backoffDelay(0, { base: 1000, factor: 2 }), 1000);
});

check('doubling schedule', () => {
  assert.equal(backoffDelay(1, { base: 1000, factor: 2 }), 2000);
  assert.equal(backoffDelay(2, { base: 1000, factor: 2 }), 4000);
  assert.equal(backoffDelay(3, { base: 1000, factor: 2 }), 8000);
});

check('cap limits the delay', () => {
  assert.equal(backoffDelay(3, { base: 1000, factor: 2, maxDelay: 5000 }), 5000);
  assert.equal(backoffDelay(10, { base: 100, factor: 3, maxDelay: 1000 }), 1000);
});

check('multiplier of 1 is a constant delay', () => {
  for(const a of [0, 1, 5]) assert.equal(backoffDelay(a, { base: 500, factor: 1 }), 500);
});

check('non-integer factor works', () => {
  assert.equal(backoffDelay(2, { base: 100, factor: 1.5 }), 100 * 2.25);
});

check('schedule builds attempts 0..n-1', () => {
  assert.deepEqual(schedule({ base: 100, factor: 2, maxDelay: 1000 }, 5), [100, 200, 400, 800, 1000]);
});

check('totalWait sums the schedule', () => {
  assert.equal(totalWait(schedule({ base: 100, factor: 2, maxDelay: 1000 }, 5)), 1500 + 1000);
});

check('schedule is non-decreasing', () => {
  const s = schedule({ base: 50, factor: 2, maxDelay: 4000 }, 12);
  for(let i = 1; i < s.length; i++) assert.ok(s[i] >= s[i - 1]);
});

check('default maxDelay is unbounded', () => {
  assert.equal(backoffDelay(10, { base: 1, factor: 2 }), 1024); // 2^10, no cap
});

check('validation', () => {
  assert.throws(() => backoffDelay(-1, { base: 100, factor: 2 }), /non-negative integer/);
  assert.throws(() => backoffDelay(0, { base: 0, factor: 2 }), /base/);
  assert.throws(() => backoffDelay(0, { base: 100, factor: 0.5 }), /multiplier/);
  assert.throws(() => schedule({ base: 100, factor: 2 }, 0), /positive integer/);
});

console.log(`\n${n} checks passed.`);
