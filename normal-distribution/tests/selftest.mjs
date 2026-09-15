import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { erf, normalCdf, zScore, probBetween } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-4) => Math.abs(a - b) < t;

// 1. Φ(0) = 0.5.
check('cdf 0', near(normalCdf(0), 0.5));
// 2. Φ(1) ≈ 0.8413.
check('cdf 1', near(normalCdf(1), 0.8413, 1e-3));
// 3. Φ(-1) ≈ 0.1587.
check('cdf -1', near(normalCdf(-1), 0.1587, 1e-3));
// 4. Φ(1.96) ≈ 0.975.
check('cdf 1.96', near(normalCdf(1.96), 0.975, 1e-3));
// 5. Symmetry: Φ(z) + Φ(-z) = 1.
check('symmetry', near(normalCdf(1.3) + normalCdf(-1.3), 1));
// 6. z-score of 110 with μ=100, σ=10 is 1.
check('zscore 1', zScore(110, 100, 10) === 1);
// 7. z-score below the mean is negative.
check('zscore -1', zScore(85, 100, 15) === -1);
// 8. Central 68% within ±1σ.
check('68 rule', near(probBetween(-1, 1), 0.6827, 1e-3));
// 9. Central 95% within ±1.96σ.
check('95 rule', near(probBetween(-1.96, 1.96), 0.95, 1e-3));
// 10. erf(0)=0 and CDF is monotincreasing.
check('erf and monotonic', near(erf(0), 0) && normalCdf(0.5) < normalCdf(0.6));

console.log(passed + ' checks passed.');
