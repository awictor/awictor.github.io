import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { dutyCycle, period, frequency, onTime, offTime, averageVoltage } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, e = 1e-9) => assert.ok(Math.abs(a - b) <= e, `${a} vs ${b}`);

check('duty cycle = on-time / period', () => {
  near(dutyCycle(0.5, 2), 25);
  near(dutyCycle(1, 1), 100);
  near(dutyCycle(0, 2), 0);
});

check('period and frequency are reciprocals', () => {
  near(period(1000), 0.001);
  near(frequency(0.001), 1000);
  near(frequency(period(440)), 440);
});

check('on-time from duty and period', () => {
  near(onTime(25, 2), 0.5);
  near(onTime(100, 0.01), 0.01);
  near(onTime(0, 5), 0);
});

check('off-time = period − on-time', () => {
  near(offTime(25, 2), 1.5);
  near(offTime(60, 1), 0.4);
});

check('on-time + off-time = period', () => {
  for (const [d, T] of [[30, 0.02], [75, 1], [50, 0.5]]) near(onTime(d, T) + offTime(d, T), T);
});

check('average voltage = Vcc × duty', () => {
  near(averageVoltage(5, 40), 2);
  near(averageVoltage(3.3, 50), 1.65);
});

check('0% duty → 0 V, 100% duty → Vcc', () => {
  near(averageVoltage(5, 0), 0);
  near(averageVoltage(5, 100), 5);
});

check('dutyCycle inverts onTime', () => {
  const T = 0.004;
  near(dutyCycle(onTime(35, T), T), 35);
});

check('a full PWM setup from frequency', () => {
  const T = period(2000);      // 0.5 ms
  near(T, 0.0005);
  near(onTime(20, T), 0.0001); // 100 µs high
  near(averageVoltage(12, 20), 2.4);
});

check('validation: out-of-range duty, non-positive freq, on>period throw', () => {
  assert.throws(() => onTime(150, 1), /between 0 and 100/);
  assert.throws(() => period(0), /frequency must be positive/);
  assert.throws(() => dutyCycle(3, 2), /cannot exceed the period/);
  assert.throws(() => averageVoltage(5, -10), /between 0 and 100/);
});

console.log(`\n${n} checks passed.`);
