import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { meanTemp, gddDaily, gddDailyCapped, accumulatedGdd } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}

// 1. Mean temperature is the average of high and low.
check('mean', meanTemp(30, 10) === 20);
// 2. GDD is mean minus base.
check('gdd', gddDaily(30, 10, 10) === 10);
// 3. A mean exactly at base gives zero.
check('at base', gddDaily(15, 5, 10) === 0);
// 4. A cold day never goes negative.
check('clamped', gddDaily(12, 4, 10) === 0);
// 5. Upper cap limits a hot high.
check('capped', gddDailyCapped(40, 10, 10, 30) === 10);
// 6. Capping lowers the count versus uncapped.
check('cap lowers', gddDailyCapped(40, 10, 10, 30) < gddDaily(40, 10, 10));
// 7. Accumulated GDD sums each day.
check('accumulate', accumulatedGdd([[30, 10], [25, 15]], 10) === 20);
// 8. Empty season accumulates to zero.
check('empty', accumulatedGdd([], 10) === 0);
// 9. A single-day season equals the daily value.
check('single day', accumulatedGdd([[30, 10]], 10) === gddDaily(30, 10, 10));
// 10. High below low is rejected.
let bad = false; try { gddDaily(5, 20, 10); } catch (e) { bad = true; }
check('order guard', bad);

console.log(passed + ' checks passed.');
