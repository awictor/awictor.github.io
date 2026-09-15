import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { sealerGallons, pailsNeeded, coverageArea } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. 760 sq ft, 1 coat, 76 sq ft/gal = 10 gallons.
check('gallons', sealerGallons(760, 1, 76) === 10);
// 2. Two coats doubles it.
check('two coats', sealerGallons(760, 2, 76) === 20);
// 3. 10 gallons in 5-gal pails is 2 pails.
check('pails', pailsNeeded(10, 5) === 2);
// 4. More coats needs more sealer.
check('more coats', sealerGallons(760, 3, 76) > sealerGallons(760, 2, 76));
// 5. 10 gallons at 76 covers 760 sq ft.
check('coverage', coverageArea(10, 76) === 760);
// 6. gallons and coverage invert (single coat).
check('roundtrip', near(coverageArea(sealerGallons(760, 1, 76), 76), 760));
// 7. A negative area is rejected.
let a = false; try { sealerGallons(-1, 1, 76); } catch (e) { a = true; }
check('area guard', a);
// 8. A non-positive coverage is rejected.
let b = false; try { sealerGallons(760, 1, 0); } catch (e) { b = true; }
check('coverage guard', b);
// 9. Zero coats is rejected.
let c = false; try { sealerGallons(760, 0, 76); } catch (e) { c = true; }
check('coats guard', c);
// 10. A non-positive pail size is rejected.
let d = false; try { pailsNeeded(10, 0); } catch (e) { d = true; }
check('pail guard', d);

console.log(passed + ' checks passed.');
