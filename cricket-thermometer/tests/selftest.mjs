import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { tempFfromChirpsPerMinute, chirpsPerMinuteFromTempF, tempFfrom15s, fToC, cToF } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. 40 chirps/min is 50 F.
check('base', tempFfromChirpsPerMinute(40) === 50);
// 2. 80 chirps/min is 60 F.
check('eighty', tempFfromChirpsPerMinute(80) === 60);
// 3. Chirps-from-temp inverts it.
check('inverse', chirpsPerMinuteFromTempF(60) === 80);
// 4. Full round trip.
check('round trip', near(chirpsPerMinuteFromTempF(tempFfromChirpsPerMinute(96)), 96));
// 5. The 15-second shortcut equals count + 40.
check('15s shortcut', tempFfrom15s(30) === 70 && tempFfrom15s(30) === 30 + 40);
// 6. More chirps means warmer.
check('warmer', tempFfromChirpsPerMinute(120) > tempFfromChirpsPerMinute(80));
// 7. 15-second path matches per-minute path.
check('paths agree', tempFfrom15s(20) === tempFfromChirpsPerMinute(80));
// 8. Fahrenheit/Celsius conversion.
check('convert', fToC(50) === 10 && cToF(10) === 50);
// 9. Negative 15s count is rejected.
let c = false; try { tempFfrom15s(-1); } catch (e) { c = true; }
check('chirps guard', c);
// 10. Negative per-minute count is rejected.
let m = false; try { tempFfromChirpsPerMinute(-1); } catch (e) { m = true; }
check('per-minute guard', m);

console.log(passed + ' checks passed.');
