import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { lm317Vout, lm317R2, lm317CurrentLimit, lm317PowerDissipation } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. R1=240, R2=720 gives 5 V (R2/R1 = 3).
check('vout 5', near(lm317Vout(240, 720), 5));
// 2. With R2=0 the output is the 1.25 V reference.
check('vout min', lm317Vout(240, 0) === 1.25);
// 3. R2=960 gives 6.25 V.
check('vout 6.25', near(lm317Vout(240, 960), 6.25));
// 4. R2 for 5 V with R1=240 is 720 ohms.
check('r2 solve', near(lm317R2(5, 240), 720));
// 5. Round trip vout <-> R2.
check('round trip', near(lm317R2(lm317Vout(240, 720), 240), 720));
// 6. Current-limit resistor of 1.25 ohm gives 1 A.
check('current 1A', lm317CurrentLimit(1.25) === 1);
// 7. 12.5 ohm gives 0.1 A.
check('current 0.1A', near(lm317CurrentLimit(12.5), 0.1));
// 8. Power dissipation (12-5)*0.5 = 3.5 W.
check('power', near(lm317PowerDissipation(12, 5, 0.5), 3.5));
// 9. R1 <= 0 rejected.
let r = false; try { lm317Vout(0, 720); } catch (e) { r = true; }
check('R1 guard', r);
// 10. Output below the 1.25 V reference rejected.
let v = false; try { lm317R2(1, 240); } catch (e) { v = true; }
check('vref guard', v);

console.log(passed + ' checks passed.');
