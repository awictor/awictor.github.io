import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { awgResistance, oneWayResistance, voltageDrop, voltageDropPercent } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. 10 AWG copper is 0.9989 ohms per 1000 ft.
check('awg 10', awgResistance(10) === 0.9989);
// 2. 14 AWG is 2.525 ohms per 1000 ft.
check('awg 14', awgResistance(14) === 2.525);
// 3. One-way resistance over exactly 1000 ft equals the per-kft value.
check('one-way 1000ft', oneWayResistance(10, 1000) === 0.9989);
// 4. One-way over 100 ft is a tenth of that.
check('one-way 100ft', near(oneWayResistance(10, 100), 0.09989));
// 5. Voltage drop is round-trip: 2 * IR.
check('drop', near(voltageDrop(10, 100, 20), 2 * 0.09989 * 20));
// 6. Drop equals 2x one-way resistance times current.
check('drop = 2 IR', voltageDrop(10, 50, 15) === 2 * oneWayResistance(10, 50) * 15);
// 7. Drop percentage of 6 V on 120 V is 5%.
check('percent', voltageDropPercent(6, 120) === 5);
// 8. Thicker wire (lower gauge) has less resistance.
check('thicker lower', awgResistance(10) < awgResistance(14));
// 9. Unsupported AWG rejected.
let a = false; try { awgResistance(99); } catch (e) { a = true; }
check('awg guard', a);
// 10. Voltage drop scales linearly with run length.
check('length scaling', near(voltageDrop(10, 200, 20), 2 * voltageDrop(10, 100, 20)));

console.log(passed + ' checks passed.');
