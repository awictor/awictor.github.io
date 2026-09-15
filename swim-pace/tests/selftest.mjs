import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { pacePer100, timeForDistance, speedMps, yardsToMeters } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. 1500 m in 1500 s is a 100 s (1:40) per-100m pace.
check('pace 1500', pacePer100(1500, 1500) === 100);
// 2. 100 m in 90 s is a 90 s per-100 pace.
check('pace 100', pacePer100(90, 100) === 90);
// 3. Time for a distance at a pace.
check('time', timeForDistance(90, 200) === 180);
// 4. Speed is distance over time.
check('speed', speedMps(100, 50) === 2);
// 5. Yards to meters.
check('yards', near(yardsToMeters(100), 91.44));
// 6. Round trip pace -> time -> pace.
check('round trip', near(timeForDistance(pacePer100(1500, 1500), 1500), 1500));
// 7. Same time over more distance is a faster per-100 pace.
check('faster', pacePer100(90, 200) === 45);
// 8. One yard is 0.9144 m.
check('one yard', near(yardsToMeters(1), 0.9144));
// 9. Zero distance rejected.
let d = false; try { pacePer100(90, 0); } catch (e) { d = true; }
check('distance guard', d);
// 10. Zero time rejected for speed.
let t = false; try { speedMps(100, 0); } catch (e) { t = true; }
check('time guard', t);

console.log(passed + ' checks passed.');
