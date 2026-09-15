import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { linearExpansion, newLength, areaExpansion, volumeExpansion } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-12) => Math.abs(a - b) < t;

// 1. Steel 10 m, +50 K -> 6 mm.
check('linear steel', near(linearExpansion(12e-6, 10, 50), 0.006));
// 2. New length adds the expansion.
check('new length', near(newLength(12e-6, 10, 50), 10.006));
// 3. Area coefficient is 2x linear.
check('area', near(areaExpansion(12e-6, 10, 50), 0.012));
// 4. Volume coefficient is 3x linear.
check('volume', near(volumeExpansion(12e-6, 10, 50), 0.018));
// 5. Area = 2 * linear for the same args.
check('area = 2x linear', near(areaExpansion(23e-6, 5, 30), 2 * linearExpansion(23e-6, 5, 30)));
// 6. Volume = 3 * linear.
check('volume = 3x linear', near(volumeExpansion(9e-6, 4, 80), 3 * linearExpansion(9e-6, 4, 80)));
// 7. Linear in the original size.
check('scale L0', near(linearExpansion(12e-6, 20, 50), 2 * linearExpansion(12e-6, 10, 50)));
// 8. Cooling contracts (negative).
check('contraction', linearExpansion(12e-6, 10, -50) === -0.006);
// 9. Aluminum known value.
check('aluminum', near(linearExpansion(23e-6, 2, 100), 0.0046));
// 10. Zero temperature change -> no expansion.
check('zero dT', linearExpansion(12e-6, 10, 0) === 0 && newLength(12e-6, 10, 0) === 10);

console.log(passed + ' checks passed.');
