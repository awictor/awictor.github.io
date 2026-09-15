import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { gearRatio, outputSpeed, outputTorque, compoundRatio } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, e = 1e-9) => assert.ok(Math.abs(a - b) <= e, `${a} vs ${b}`);

check('gear ratio = driven / drive', () => {
  near(gearRatio(10, 40), 4);
  near(gearRatio(20, 20), 1);
});

check('overdrive when driven < drive', () => {
  near(gearRatio(40, 10), 0.25);
  assert.ok(gearRatio(40, 10) < 1);
});

check('output speed = input / ratio', () => {
  near(outputSpeed(1000, 10, 40), 250);
  near(outputSpeed(1000, 40, 10), 4000); // overdrive speeds up
});

check('output torque = input × ratio', () => {
  near(outputTorque(50, 10, 40), 200);
  near(outputTorque(50, 40, 10), 12.5);
});

check('power is conserved: in RPM×torque = out RPM×torque', () => {
  const dr = 12, dn = 36, rpm = 900, tq = 30;
  near(rpm * tq, outputSpeed(rpm, dr, dn) * outputTorque(tq, dr, dn));
});

check('1:1 leaves speed and torque unchanged', () => {
  near(outputSpeed(1500, 25, 25), 1500);
  near(outputTorque(80, 25, 25), 80);
});

check('compound ratio is the product of stage ratios', () => {
  near(compoundRatio([[10, 40], [20, 40]]), 8); // 4 * 2
  near(compoundRatio([[10, 20], [10, 20], [10, 20]]), 8); // 2^3
});

check('a single-stage compound equals the plain ratio', () => {
  near(compoundRatio([[15, 45]]), gearRatio(15, 45));
});

check('compound output speed matches dividing by the overall ratio', () => {
  const stages = [[10, 30], [12, 24]];
  const r = compoundRatio(stages); // 3 * 2 = 6
  near(3000 / r, 500);
});

check('validation: non-integer teeth and bad stages throw', () => {
  assert.throws(() => gearRatio(0, 40), /positive integer/);
  assert.throws(() => gearRatio(10, 2.5), /positive integer/);
  assert.throws(() => outputSpeed(0, 10, 40), /input speed must be positive/);
  assert.throws(() => compoundRatio([]), /at least one/);
  assert.throws(() => compoundRatio([[10]]), /\[driveTeeth, drivenTeeth\]/);
});

console.log(`\n${n} checks passed.`);
