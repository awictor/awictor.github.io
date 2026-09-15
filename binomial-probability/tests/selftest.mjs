import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { combinations, binomialPmf, binomialCdf, binomialMean, binomialStdDev } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. C(10,5) = 252.
check('C(10,5)', combinations(10, 5) === 252);
// 2. Edge combinations.
check('C edges', combinations(5, 0) === 1 && combinations(5, 5) === 1 && combinations(6, 6) === 1);
// 3. Fair coin, 5 of 10 heads = 252/1024.
check('pmf 10,5,0.5', near(binomialPmf(10, 5, 0.5), 252 / 1024));
// 4. Single trial success.
check('pmf 1,1', near(binomialPmf(1, 1, 0.3), 0.3) && near(binomialPmf(1, 0, 0.3), 0.7));
// 5. PMF sums to 1 over all k.
let s = 0; for (let i = 0; i <= 10; i++) s += binomialPmf(10, i, 0.37);
check('pmf sums to 1', near(s, 1));
// 6. CDF at k=1, n=2, p=0.5 -> 0.75.
check('cdf 2,1', near(binomialCdf(2, 1, 0.5), 0.75));
// 7. Full CDF = 1.
check('cdf full', near(binomialCdf(10, 10, 0.5), 1));
// 8. Mean and variance.
check('mean/sd', binomialMean(10, 0.5) === 5 && near(binomialStdDev(10, 0.5), Math.sqrt(2.5)));
// 9. k out of range gives 0.
check('out of range', binomialPmf(5, 6, 0.5) === 0 && binomialPmf(5, -1, 0.5) === 0);
// 10. Invalid probability throws.
let threw = false; try { binomialPmf(5, 2, 1.5); } catch (e) { threw = true; }
check('bad p throws', threw);

console.log(passed + ' checks passed.');
