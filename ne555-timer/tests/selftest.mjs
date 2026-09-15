import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { astableFrequency, astableDutyCycle, astableHighTime, monostablePulse } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-6) => Math.abs(a - b) < t;

// 1. R1=R2=1k, C=1uF -> 1.44/(3000*1e-6) = 480 Hz.
check('freq', near(astableFrequency(1000, 1000, 1e-6), 480));
// 2. Doubling R2 lowers frequency to 288 Hz.
check('freq R2', near(astableFrequency(1000, 2000, 1e-6), 1.44 / (5000e-6)));
// 3. Equal resistors give a 2/3 duty cycle.
check('duty 2/3', near(astableDutyCycle(1000, 1000), 2 / 3));
// 4. Basic astable duty cycle is always above 50%.
check('duty >50', astableDutyCycle(1, 1000000) > 0.5);
// 5. R1 >> R2 pushes duty toward 100%.
check('duty ->1', astableDutyCycle(1e6, 1) > 0.999);
// 6. Monostable pulse width is 1.1*R*C.
check('mono pulse', near(monostablePulse(100000, 1e-6), 1.1 * 100000 * 1e-6));
// 7. Pulse width scales linearly with R.
check('mono linear', near(monostablePulse(200000, 1e-6), 2 * monostablePulse(100000, 1e-6)));
// 8. High time uses ln2*(R1+R2)*C.
check('high time', near(astableHighTime(1000, 1000, 1e-6), Math.log(2) * 2000 * 1e-6));
// 9. Non-positive C rejected in frequency.
let c = false; try { astableFrequency(1000, 1000, 0); } catch (e) { c = true; }
check('C guard', c);
// 10. Non-positive R rejected in monostable.
let r = false; try { monostablePulse(0, 1e-6); } catch (e) { r = true; }
check('R guard', r);

console.log(passed + ' checks passed.');
