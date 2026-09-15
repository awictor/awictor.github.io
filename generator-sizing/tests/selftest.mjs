import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { totalRunningWatts, largestSurge, requiredWatts, recommendedWatts } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

const loads = [
  { running: 600, starting: 1800 },
  { running: 1200, starting: 1200 },
  { running: 300, starting: 300 },
  { running: 100, starting: 100 },
];

// 1. Running watts sum.
check('running', totalRunningWatts(loads) === 2200);
// 2. Largest surge is the fridge's extra 1200 W.
check('surge', largestSurge(loads) === 1200);
// 3. Required = running + largest surge.
check('required', requiredWatts(loads) === 3400);
// 4. Recommended adds the safety margin.
check('recommended', recommendedWatts(3400, 20) === 4080);
// 5. Required always covers running watts.
check('covers running', requiredWatts(loads) >= totalRunningWatts(loads));
// 6. No surge (all running == starting) means required equals running.
check('no surge', requiredWatts([{ running: 600, starting: 600 }]) === 600);
// 7. More appliances raise the running total.
check('more appliances', totalRunningWatts(loads.concat([{ running: 500, starting: 500 }])) > totalRunningWatts(loads));
// 8. Safety margin scales.
check('safety scales', recommendedWatts(1000, 50) === 1500);
// 9. Empty list is rejected.
let e = false; try { totalRunningWatts([]); } catch (err) { e = true; }
check('empty guard', e);
// 10. Negative safety margin is rejected.
let n = false; try { recommendedWatts(1000, -10); } catch (err) { n = true; }
check('safety guard', n);

console.log(passed + ' checks passed.');
