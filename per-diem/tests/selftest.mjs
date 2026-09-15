import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { mieTotal, lodgingTotal, tripTotal } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. 5 days at $60 with 75% travel days = 2*45 + 3*60 = 270.
check('mie 5 day', mieTotal(60, 5, 0.75) === 270);
// 2. A single-day trip is one travel day.
check('one day', mieTotal(60, 1, 0.75) === 45);
// 3. A two-day trip is both travel days.
check('two day', mieTotal(60, 2, 0.75) === 90);
// 4. Lodging total.
check('lodging', lodgingTotal(150, 4) === 600);
// 5. Trip total sums both.
check('trip total', tripTotal(270, 600) === 870);
// 6. More days means more M&IE.
check('more days', mieTotal(60, 6, 0.75) > mieTotal(60, 5, 0.75));
// 7. A higher rate means more M&IE.
check('higher rate', mieTotal(80, 5, 0.75) > mieTotal(60, 5, 0.75));
// 8. Zero nights means no lodging.
check('zero nights', lodgingTotal(150, 0) === 0);
// 9. A trip under one day is rejected.
let d = false; try { mieTotal(60, 0, 0.75); } catch (e) { d = true; }
check('days guard', d);
// 10. A negative rate is rejected.
let r = false; try { mieTotal(-60, 5, 0.75); } catch (e) { r = true; }
check('rate guard', r);

console.log(passed + ' checks passed.');
