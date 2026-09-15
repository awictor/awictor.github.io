import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { addDays, predict, nextCycles } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('addDays does basic and month-boundary arithmetic', () => {
  assert.equal(addDays('2026-01-01', 14), '2026-01-15');
  assert.equal(addDays('2026-01-29', 3), '2026-02-01');
  assert.equal(addDays('2026-03-01', -1), '2026-02-28');
});

check('addDays handles leap years', () => {
  assert.equal(addDays('2024-02-28', 1), '2024-02-29');
  assert.equal(addDays('2024-02-29', 1), '2024-03-01');
});

check('addDays rejects invalid dates', () => {
  assert.throws(() => addDays('not-a-date', 1), /invalid date/);
});

check('predict: 28-day cycle, 14-day luteal', () => {
  const r = predict({ lastPeriod: '2026-01-01', cycleLength: 28, lutealPhase: 14 });
  assert.equal(r.ovulation, '2026-01-15');
  assert.equal(r.fertileStart, '2026-01-10');
  assert.equal(r.fertileEnd, '2026-01-16');
  assert.equal(r.nextPeriod, '2026-01-29');
});

check('predict: longer cycle pushes ovulation later', () => {
  const r = predict({ lastPeriod: '2026-01-01', cycleLength: 30, lutealPhase: 14 });
  assert.equal(r.ovulation, '2026-01-17');
  assert.equal(r.nextPeriod, '2026-01-31');
});

check('predict: default cycle/luteal are 28/14', () => {
  const r = predict({ lastPeriod: '2026-01-01' });
  assert.equal(r.ovulation, '2026-01-15');
  assert.equal(r.nextPeriod, '2026-01-29');
});

check('fertile window spans 6 days (ovulation −5 to +1)', () => {
  const r = predict({ lastPeriod: '2026-06-10', cycleLength: 28 });
  const days = (new Date(r.fertileEnd) - new Date(r.fertileStart)) / 86400000;
  assert.equal(days, 6);
});

check('predict rejects out-of-range inputs', () => {
  assert.throws(() => predict({ lastPeriod: '2026-01-01', cycleLength: 10 }), /cycle length/);
  assert.throws(() => predict({ lastPeriod: '2026-01-01', cycleLength: 50 }), /cycle length/);
  assert.throws(() => predict({ lastPeriod: '2026-01-01', lutealPhase: 8 }), /luteal phase/);
});

check('nextCycles chains from each predicted period', () => {
  const c = nextCycles({ lastPeriod: '2026-01-01', cycleLength: 28 }, 3);
  assert.equal(c.length, 3);
  assert.equal(c[0].nextPeriod, '2026-01-29');
  assert.equal(c[1].nextPeriod, '2026-02-26');
  assert.equal(c[2].nextPeriod, '2026-03-26');
});

check('nextCycles ovulation advances one cycle each time', () => {
  const c = nextCycles({ lastPeriod: '2026-01-01', cycleLength: 28 }, 2);
  assert.equal(c[0].ovulation, '2026-01-15');
  assert.equal(c[1].ovulation, '2026-02-12');
});

console.log(`\n${n} checks passed.`);
