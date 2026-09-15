import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { invertingGain, nonInvertingGain, gainToDb, outputVoltage } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. Inverting gain of -10 from 10k/1k.
check('inverting', invertingGain(10000, 1000) === -10);
// 2. Non-inverting gain of 11 from 10k/1k.
check('non-inverting', nonInvertingGain(10000, 1000) === 11);
// 3. Rf=0 non-inverting is a unity buffer.
check('buffer', nonInvertingGain(0, 1000) === 1);
// 4. A gain of 10 is 20 dB.
check('20 dB', near(gainToDb(10), 20));
// 5. A gain of 100 is 40 dB.
check('40 dB', near(gainToDb(100), 40));
// 6. dB uses the magnitude, so -10 is also 20 dB.
check('dB abs', near(gainToDb(-10), 20));
// 7. Output voltage is gain times input.
check('output', outputVoltage(-10, 0.5) === -5);
// 8. Non-inverting gain equals 1 minus the inverting gain for the same resistors.
check('relation', nonInvertingGain(10000, 1000) === 1 - invertingGain(10000, 1000));
// 9. Rin <= 0 rejected.
let r = false; try { invertingGain(10000, 0); } catch (e) { r = true; }
check('Rin guard', r);
// 10. Zero gain has no dB value.
let g = false; try { gainToDb(0); } catch (e) { g = true; }
check('dB guard', g);

console.log(passed + ' checks passed.');
