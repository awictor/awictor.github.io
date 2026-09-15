import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { minutesToBurn, withSPF, riskCategory } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. Base 600 min at UV 10 burns in 60 min.
check('burn 10', minutesToBurn(10, 600) === 60);
// 2. Half the UV, double the time.
check('burn 5', minutesToBurn(5, 600) === 120);
// 3. Higher UV burns faster.
check('higher faster', minutesToBurn(10, 600) < minutesToBurn(5, 600));
// 4. SPF 30 extends 60 min to 1800 min.
check('spf', withSPF(60, 30) === 1800);
// 5. Higher SPF gives more protected time.
check('more spf', withSPF(60, 50) > withSPF(60, 30));
// 6. UV 1 is Low risk.
check('low', riskCategory(1) === 'Low');
// 7. UV 4 is Moderate.
check('moderate', riskCategory(4) === 'Moderate');
// 8. UV 11 is Extreme.
check('extreme', riskCategory(11) === 'Extreme');
// 9. A non-positive UV index is rejected by burn time.
let a = false; try { minutesToBurn(0, 600); } catch (e) { a = true; }
check('uv guard', a);
// 10. A non-positive SPF is rejected.
let b = false; try { withSPF(60, 0); } catch (e) { b = true; }
check('spf guard', b);

console.log(passed + ' checks passed.');
