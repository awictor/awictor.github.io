import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { instantToActiveDry, instantToFresh, activeDryToInstant, freshToInstant } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. Instant to active dry is x1.25.
check('to active', instantToActiveDry(10) === 12.5);
// 2. Instant to fresh is x3.
check('to fresh', instantToFresh(10) === 30);
// 3. Active dry back to instant.
check('active back', activeDryToInstant(12.5) === 10);
// 4. Fresh back to instant.
check('fresh back', freshToInstant(30) === 10);
// 5. Round trip instant -> active -> instant.
check('round trip active', near(activeDryToInstant(instantToActiveDry(8)), 8));
// 6. Round trip instant -> fresh -> instant.
check('round trip fresh', near(freshToInstant(instantToFresh(8)), 8));
// 7. Conversion is linear.
check('linear', instantToActiveDry(20) === 2 * instantToActiveDry(10));
// 8. Fresh needs the most, instant the least, for the same rise.
check('ordering', instantToFresh(10) > instantToActiveDry(10) && instantToActiveDry(10) > 10);
// 9. Negative amount rejected.
let n = false; try { instantToActiveDry(-1); } catch (e) { n = true; }
check('negative guard', n);
// 10. Negative fresh rejected.
let f = false; try { freshToInstant(-1); } catch (e) { f = true; }
check('fresh guard', f);

console.log(passed + ' checks passed.');
