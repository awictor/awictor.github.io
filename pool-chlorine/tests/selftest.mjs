import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { litersFromGallons, gramsChlorineForPpm, productAmount, ppmChange } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-6) => Math.abs(a - b) < t;

// 1. 1 ppm in 10,000 L needs 10 g of pure chlorine.
check('one ppm', gramsChlorineForPpm(10000, 1) === 10);
// 2. 3 ppm needs 30 g.
check('three ppm', gramsChlorineForPpm(10000, 3) === 30);
// 3. ppmChange inverts it.
check('ppm change', near(ppmChange(10, 10000), 1));
// 4. Full round trip.
check('round trip', near(ppmChange(gramsChlorineForPpm(10000, 3), 10000), 3));
// 5. Pure product needs no adjustment.
check('pure product', productAmount(30, 100) === 30);
// 6. Cal-hypo at 65% needs more.
check('cal hypo', near(productAmount(30, 65), 30 / 0.65));
// 7. A weaker product needs more.
check('weaker more', productAmount(30, 50) > productAmount(30, 65));
// 8. Gallons convert to litres.
check('gallons', near(litersFromGallons(1000), 3785.411784));
// 9. Zero volume is rejected for ppmChange.
let v = false; try { ppmChange(10, 0); } catch (e) { v = true; }
check('volume guard', v);
// 10. An available-chlorine percent over 100 is rejected.
let p = false; try { productAmount(30, 120); } catch (e) { p = true; }
check('percent guard', p);

console.log(passed + ' checks passed.');
