import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { combinedCN, classify, idealGreenFraction } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. Equal masses of C:N 30 and 15 give combined 2/(1/30+1/15) = 20.
check('combined equal', near(combinedCN([{mass:1,ratio:30},{mass:1,ratio:15}]), 20));
// 2. A single material returns its own ratio.
check('single', near(combinedCN([{mass:5,ratio:25}]), 25));
// 3. Adding more greens lowers the combined ratio.
check('more greens lower',
  combinedCN([{mass:1,ratio:60},{mass:3,ratio:15}]) < combinedCN([{mass:1,ratio:60},{mass:1,ratio:15}]));
// 4. An empty pile is rejected.
let e = false; try { combinedCN([]); } catch (x) { e = true; }
check('empty guard', e);
// 5. A zero or negative ratio is rejected.
let r = false; try { combinedCN([{mass:1,ratio:0}]); } catch (x) { r = true; }
check('ratio guard', r);
// 6. A ratio near 30 is balanced.
check('classify balanced', classify(30) === 'balanced');
// 7. A low ratio is nitrogen-rich.
check('classify nitrogen', classify(12) === 'nitrogen-rich');
// 8. A high ratio is carbon-rich.
check('classify carbon', classify(60) === 'carbon-rich');
// 9. Ideal green share for browns 60, greens 15, target 30 is one-third.
check('ideal share', near(idealGreenFraction(60, 15, 30), 1 / 3, 1e-9));
// 10. Equal brown and green ratios cannot hit a different target.
let d = false; try { idealGreenFraction(20, 20, 30); } catch (x) { d = true; }
check('equal-ratio guard', d);

console.log(passed + ' checks passed.');
