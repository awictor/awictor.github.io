import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { powerRatioToDb, amplitudeRatioToDb, dbToPowerRatio, dbToAmplitudeRatio, sumDb } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, e = 1e-6) => assert.ok(Math.abs(a - b) <= e, `${a} vs ${b}`);

check('doubling power is +3.0103 dB', () => {
  near(powerRatioToDb(2), 3.0103, 1e-4);
  near(powerRatioToDb(10), 10);
  near(powerRatioToDb(1), 0);
});

check('doubling amplitude is +6.0206 dB', () => {
  near(amplitudeRatioToDb(2), 6.0206, 1e-4);
  near(amplitudeRatioToDb(10), 20);
  near(amplitudeRatioToDb(1), 0);
});

check('amplitude dB is exactly twice power dB for the same ratio', () => {
  for (const r of [2, 3.5, 10, 100]) near(amplitudeRatioToDb(r), 2 * powerRatioToDb(r));
});

check('dB → power ratio inverts power ratio → dB', () => {
  near(dbToPowerRatio(powerRatioToDb(2)), 2);
  near(dbToPowerRatio(10), 10);
  near(dbToPowerRatio(0), 1);
});

check('dB → amplitude ratio inverts amplitude ratio → dB', () => {
  near(dbToAmplitudeRatio(amplitudeRatioToDb(2)), 2);
  near(dbToAmplitudeRatio(20), 10);
  near(dbToAmplitudeRatio(0), 1);
});

check('negative dB means a ratio below 1', () => {
  near(powerRatioToDb(0.5), -3.0103, 1e-4);
  near(dbToPowerRatio(-10), 0.1);
});

check('two equal sound sources add +3 dB', () => {
  near(sumDb([80, 80]), 83.0103, 1e-4);
  near(sumDb([80, 80]), 80 + powerRatioToDb(2), 1e-9);
});

check('four equal sources add +6 dB', () => {
  near(sumDb([80, 80, 80, 80]), 86.0206, 1e-4);
});

check('a single level sums to itself; a loud source dominates', () => {
  near(sumDb([90]), 90);
  assert.ok(Math.abs(sumDb([90, 70]) - 90) < 0.05); // 20 dB quieter barely adds
});

check('validation: bad ratios, dB, and empty level list throw', () => {
  assert.throws(() => powerRatioToDb(0), /positive number/);
  assert.throws(() => amplitudeRatioToDb(-1), /positive number/);
  assert.throws(() => dbToPowerRatio(NaN), /finite number/);
  assert.throws(() => sumDb([]), /at least one/);
  assert.throws(() => sumDb([80, NaN]), /finite number/);
});

console.log(`\n${n} checks passed.`);
