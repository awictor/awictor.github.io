import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { ppmToGpg, gpgToPpm, ppmToMmol, mmolToPpm, hardnessClass } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-6) => Math.abs(a - b) < t;

// 1. One grain per gallon is 17.118 ppm.
check('gpg to ppm', near(gpgToPpm(1), 17.118));
// 2. And back.
check('ppm to gpg', near(ppmToGpg(17.118), 1));
// 3. ppm <-> gpg round trip.
check('gpg round trip', near(ppmToGpg(gpgToPpm(7)), 7));
// 4. mmol conversion uses CaCO3 molar mass.
check('mmol', near(ppmToMmol(100.09), 1));
// 5. mmol round trip.
check('mmol round trip', near(mmolToPpm(ppmToMmol(120)), 120));
// 6. Classification bands.
check('soft', hardnessClass(10) === 'Soft');
// 7. Hard band.
check('hard', hardnessClass(150) === 'Hard');
// 8. Very hard band.
check('very hard', hardnessClass(200) === 'Very hard');
// 9. Zero ppm is zero grains.
check('zero', ppmToGpg(0) === 0);
// 10. Negative values are rejected.
let n = false; try { ppmToGpg(-5); } catch (e) { n = true; }
check('negative guard', n);

console.log(passed + ' checks passed.');
