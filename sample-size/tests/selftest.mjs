import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { zForConfidence, sampleSize, withFinitePopulation } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}

// 1. Classic 95% / ±5% / p=0.5 -> 385.
check('95% 5%', sampleSize(zForConfidence(95), 0.5, 0.05) === 385);
// 2. 99% / ±5% -> 664.
check('99% 5%', sampleSize(zForConfidence(99), 0.5, 0.05) === 664);
// 3. 90% / ±5% -> 271.
check('90% 5%', sampleSize(zForConfidence(90), 0.5, 0.05) === 271);
// 4. p=0.5 is the most demanding.
check('p=0.5 max', sampleSize(zForConfidence(95), 0.5, 0.05) >= sampleSize(zForConfidence(95), 0.3, 0.05));
// 5. Smaller margin needs a larger sample.
check('smaller margin', sampleSize(zForConfidence(95), 0.5, 0.025) > sampleSize(zForConfidence(95), 0.5, 0.05));
// 6. Finite population correction reduces the count.
check('finite reduces', withFinitePopulation(385, 1000) < 385);
// 7. Known finite value: 385 from a population of 1000 -> 279.
check('finite value', withFinitePopulation(385, 1000) === 279);
// 8. Huge population barely changes it.
check('huge N', Math.abs(withFinitePopulation(385, 1e9) - 385) <= 1);
// 9. z-scores.
check('z scores', Math.abs(zForConfidence(95) - 1.96) < 1e-2 && Math.abs(zForConfidence(99) - 2.576) < 1e-2);
// 10. Zero margin throws.
let z = false; try { sampleSize(1.96, 0.5, 0); } catch (e) { z = true; }
check('margin guard', z);

console.log(passed + ' checks passed.');
