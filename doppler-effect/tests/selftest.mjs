import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { acousticDoppler, relativisticDoppler, observedWavelength, redshiftZ } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. No motion => observed frequency equals emitted.
check('acoustic no motion', acousticDoppler(1000, 343, 0, 0) === 1000);
// 2. Source approaching at 34.3 (c=343): f' = 1000*343/308.7.
check('acoustic source approach', near(acousticDoppler(1000, 343, 0, 34.3), 1000 * 343 / 308.7, 1e-6));
// 3. Observer approaching at 34.3: f' = 1000*(343+34.3)/343 = 1100.
check('acoustic observer approach', near(acousticDoppler(1000, 343, 34.3, 0), 1100, 1e-9));
// 4. Source receding at 34.3: f' = 1000*343/377.3 (redshift, < f).
check('acoustic source recede', near(acousticDoppler(1000, 343, 0, -34.3), 1000 * 343 / 377.3, 1e-6));
// 5. Relativistic beta=0 => no shift.
check('relativistic beta 0', relativisticDoppler(1000, 0) === 1000);
// 6. Relativistic beta=0.6 approaching => exactly doubles (sqrt(1.6/0.4)=2).
check('relativistic beta 0.6 -> 2x', near(relativisticDoppler(1000, 0.6), 2000));
// 7. Relativistic beta=-0.6 receding => halves.
check('relativistic beta -0.6 -> 0.5x', near(relativisticDoppler(1000, -0.6), 500));
// 8. Observed wavelength approaching beta=0.6: 500 -> 250 (blueshift, shorter).
check('observed wavelength blueshift', near(observedWavelength(500, 0.6), 250));
// 9. Observed wavelength beta=0 unchanged.
check('observed wavelength no motion', observedWavelength(500, 0) === 500);
// 10. Redshift z for beta=0.6 receding = sqrt(1.6/0.4) - 1 = 1.
check('redshift z beta 0.6', near(redshiftZ(0.6), 1));

console.log(passed + ' checks passed.');
