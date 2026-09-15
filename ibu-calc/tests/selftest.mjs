import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { bignessFactor, boilTimeFactor, utilization, ibuTinseth } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-6) => Math.abs(a - b) < t;

// 1. Bigness factor at 1.000 gravity is 1.65.
check('bigness base', near(bignessFactor(1.000), 1.65));
// 2. Zero boil time extracts nothing.
check('boil zero', boilTimeFactor(0) === 0);
// 3. Longer boils extract more.
check('boil monotonic', boilTimeFactor(60) > boilTimeFactor(30));
// 4. Boil-time factor approaches its 1/4.15 ceiling.
check('boil ceiling', boilTimeFactor(1000) <= 1 / 4.15 && boilTimeFactor(60) < 1 / 4.15);
// 5. Utilization is bigness times boil-time factor.
check('utilization', near(utilization(1.05, 60), bignessFactor(1.05) * boilTimeFactor(60)));
// 6. IBU is utilization times alpha-acid concentration.
check('ibu formula', near(ibuTinseth(5, 60, 20, 1.05, 60), utilization(1.05, 60) * (0.05 * 60 * 1000) / 20));
// 7. IBU scales with hop mass.
check('mass scaling', near(ibuTinseth(5, 120, 20, 1.05, 60), 2 * ibuTinseth(5, 60, 20, 1.05, 60)));
// 8. IBU is inversely proportional to volume.
check('volume inverse', near(ibuTinseth(5, 60, 40, 1.05, 60), ibuTinseth(5, 60, 20, 1.05, 60) / 2));
// 9. Higher gravity gives lower utilization.
check('gravity lowers', bignessFactor(1.090) < bignessFactor(1.040));
// 10. Zero volume rejected.
let v = false; try { ibuTinseth(5, 60, 0, 1.05, 60); } catch (e) { v = true; }
check('volume guard', v);

console.log(passed + ' checks passed.');
