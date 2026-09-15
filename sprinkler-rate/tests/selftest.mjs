import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { precipRate, runtimeMinutes, inchesApplied } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. 1 GPM over 96.25 sq ft is 1 in/hr.
check('rate 1', near(precipRate(1, 96.25), 1));
// 2. Double the flow, double the rate.
check('rate 2', near(precipRate(2, 96.25), 2));
// 3. At 1 in/hr, 1 inch takes 60 minutes.
check('runtime', runtimeMinutes(1, 1) === 60);
// 4. At 2 in/hr, 1 inch takes 30 minutes.
check('runtime fast', runtimeMinutes(1, 2) === 30);
// 5. More flow raises the rate.
check('more flow', precipRate(10, 500) > precipRate(5, 500));
// 6. A bigger area lowers the rate.
check('bigger area', precipRate(10, 1000) < precipRate(10, 500));
// 7. inchesApplied inverts the runtime.
check('applied', near(inchesApplied(1, 60), 1));
// 8. A non-positive area is rejected.
let a = false; try { precipRate(10, 0); } catch (e) { a = true; }
check('area guard', a);
// 9. A non-positive precip rate is rejected by runtime.
let b = false; try { runtimeMinutes(1, 0); } catch (e) { b = true; }
check('rate guard', b);
// 10. A negative flow is rejected.
let c = false; try { precipRate(-1, 500); } catch (e) { c = true; }
check('flow guard', c);

console.log(passed + ' checks passed.');
