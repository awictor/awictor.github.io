import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { tonguePercent, targetTongueWeight, classify } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. 600 lb tongue on a 5000 lb trailer is 12%.
check('percent', tonguePercent(600, 5000) === 12);
// 2. Zero tongue weight is 0%.
check('zero tongue', tonguePercent(0, 5000) === 0);
// 3. 12% of 5000 lb is 600 lb.
check('target', targetTongueWeight(5000, 12) === 600);
// 4. target and percent invert each other.
check('roundtrip', near(targetTongueWeight(5000, tonguePercent(600, 5000)), 600));
// 5. 12% is ideal.
check('ideal', classify(12) === 'ideal');
// 6. Under 10% is low (sway risk).
check('low', classify(8) === 'low');
// 7. Over 15% is high.
check('high', classify(18) === 'high');
// 8. The 10% and 15% boundaries are both ideal.
check('boundaries', classify(10) === 'ideal' && classify(15) === 'ideal');
// 9. A non-positive trailer weight is rejected.
let a = false; try { tonguePercent(600, 0); } catch (e) { a = true; }
check('trailer guard', a);
// 10. A negative percent is rejected.
let b = false; try { classify(-1); } catch (e) { b = true; }
check('percent guard', b);

console.log(passed + ' checks passed.');
