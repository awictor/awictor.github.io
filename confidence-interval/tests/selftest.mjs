import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { zForConfidence, meanCI, proportionCI } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-3) => Math.abs(a - b) < t;

const z95 = zForConfidence(95);
// 1. Mean CI margin: 1.96 * 15/10 = 2.94.
check('mean margin', near(meanCI(100, 15, 100, z95).margin, 2.94));
// 2. Mean CI bounds.
const m = meanCI(100, 15, 100, z95);
check('mean bounds', near(m.lower, 97.06) && near(m.upper, 102.94));
// 3. Proportion CI margin: 1.96 * sqrt(0.25/100) = 0.098.
check('prop margin', near(proportionCI(0.5, 100, z95).margin, 0.098));
// 4. Proportion CI bounds.
const p = proportionCI(0.5, 100, z95);
check('prop bounds', near(p.lower, 0.402) && near(p.upper, 0.598));
// 5. Larger n gives a smaller margin.
check('larger n smaller', meanCI(100, 15, 400, z95).margin < meanCI(100, 15, 100, z95).margin);
// 6. Higher confidence widens the interval.
check('higher conf wider', meanCI(100, 15, 100, zForConfidence(99)).margin > meanCI(100, 15, 100, z95).margin);
// 7. Interval is symmetric around the estimate.
check('symmetric', near((m.lower + m.upper) / 2, 100));
// 8. Proportion at 0.5 gives the widest proportion margin.
check('p=0.5 widest', proportionCI(0.5, 100, z95).margin >= proportionCI(0.3, 100, z95).margin);
// 9. z-scores.
check('z', near(z95, 1.96, 1e-2) && near(zForConfidence(99), 2.576, 1e-2));
// 10. Sample-size guard.
let g = false; try { meanCI(1, 1, 0, z95); } catch (e) { g = true; }
check('n guard', g);

console.log(passed + ' checks passed.');
