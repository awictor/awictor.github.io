import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { poissonPmf, poissonCdf, poissonMean, poissonStdDev } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. P(0) = e^-λ.
check('pmf 0', near(poissonPmf(2, 0), Math.exp(-2)));
// 2. P(1) = λe^-λ.
check('pmf 1', near(poissonPmf(2, 1), 2 * Math.exp(-2)));
// 3. Known: λ=3, k=3 -> 4.5 e^-3.
check('pmf 3,3', near(poissonPmf(3, 3), 4.5 * Math.exp(-3)));
// 4. CDF at 0 equals PMF at 0.
check('cdf 0', near(poissonCdf(2, 0), Math.exp(-2)));
// 5. Direct formula matches recurrence for λ=4, k=3.
check('formula match', near(poissonPmf(4, 3), Math.pow(4, 3) * Math.exp(-4) / 6));
// 6. PMF over 0..60 sums to ~1.
let s = 0; for (let i = 0; i <= 60; i++) s += poissonPmf(4, i);
check('sums to 1', near(s, 1, 1e-9));
// 7. CDF matches summed PMF.
check('cdf = sum pmf', near(poissonCdf(3, 5), [0, 1, 2, 3, 4, 5].reduce((a, i) => a + poissonPmf(3, i), 0)));
// 8. Mean = λ, std dev = √λ.
check('mean/sd', poissonMean(3) === 3 && near(poissonStdDev(4), 2));
// 9. Negative or non-integer k gives 0.
check('bad k', poissonPmf(3, -1) === 0 && poissonPmf(3, 2.5) === 0);
// 10. λ = 0 -> all mass at 0.
check('lambda 0', poissonPmf(0, 0) === 1 && poissonPmf(0, 1) === 0);

console.log(passed + ' checks passed.');
