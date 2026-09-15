import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { pipeArea, flowRate, velocityFromFlow, m3sToLpm } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. Area of a 2 m pipe (r=1) is pi.
check('area', near(pipeArea(2), Math.PI));
// 2. Flow rate is area times velocity.
check('flow', near(flowRate(1, 2), Math.PI));
// 3. Velocity round trips from flow.
check('round trip', near(velocityFromFlow(flowRate(3, 0.1), 0.1), 3));
// 4. Flow scales linearly with velocity.
check('velocity scaling', near(flowRate(2, 0.1), 2 * flowRate(1, 0.1)));
// 5. Flow scales with the square of diameter.
check('diameter squared', near(flowRate(1, 0.2) / flowRate(1, 0.1), 4));
// 6. A bigger pipe carries more at the same speed.
check('bigger more', flowRate(1, 0.2) > flowRate(1, 0.1));
// 7. m3/s to L/min conversion.
check('lpm', m3sToLpm(1) === 60000);
// 8. Zero velocity gives zero flow.
check('zero velocity', flowRate(0, 0.1) === 0);
// 9. Zero diameter is rejected when solving velocity.
let z = false; try { velocityFromFlow(0.01, 0); } catch (e) { z = true; }
check('diameter guard', z);
// 10. Negative velocity is rejected.
let n = false; try { flowRate(-1, 0.1); } catch (e) { n = true; }
check('velocity guard', n);

console.log(passed + ' checks passed.');
