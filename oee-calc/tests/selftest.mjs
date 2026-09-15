import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { availability, performance, quality, oee } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. Availability is run over planned time.
check('availability', near(availability(400, 480), 400 / 480));
// 2. Performance from cycle time and count.
check('performance', near(performance(0.5, 800, 400), 1));
// 3. Quality is good over total.
check('quality', near(quality(95, 100), 0.95));
// 4. OEE is the product.
check('oee', near(oee(0.8, 0.9, 0.95), 0.8 * 0.9 * 0.95));
// 5. Perfect factors give OEE of 1.
check('perfect', oee(1, 1, 1) === 1);
// 6. Lower availability lowers OEE.
check('lower avail', oee(availability(300, 480), 1, 1) < oee(availability(400, 480), 1, 1));
// 7. World-class-ish example.
check('world class', near(oee(0.9, 0.95, 0.999), 0.9 * 0.95 * 0.999));
// 8. Quality is monotonic in good parts.
check('more good', quality(99, 100) > quality(95, 100));
// 9. Zero planned time is rejected.
let a = false; try { availability(400, 0); } catch (e) { a = true; }
check('planned guard', a);
// 10. Zero total parts is rejected.
let q = false; try { quality(95, 0); } catch (e) { q = true; }
check('total guard', q);

console.log(passed + ' checks passed.');
