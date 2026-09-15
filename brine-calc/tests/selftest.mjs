import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { brineSalt, equilibriumBrineSalt, saltPercentOf, curingSaltGrams } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. A 5% brine of 1000 g water needs 50 g salt.
check('brine salt', brineSalt(1000, 5) === 50);
// 2. Salt concentration of 50 g in 1000 g water is 5%.
check('concentration', saltPercentOf(50, 1000) === 5);
// 3. EQ brine at 2% of 2000 g total is 40 g.
check('eq salt', equilibriumBrineSalt(2000, 2) === 40);
// 4. Pink cure #1 for 156 ppm in 1 kg.
check('cure', near(curingSaltGrams(1000, 156), 1000 * 156 / 1e6 / 0.0625));
// 5. Round trip brine -> concentration.
check('round trip', near(saltPercentOf(brineSalt(1000, 5), 1000), 5));
// 6. Brine salt scales with water.
check('brine scaling', brineSalt(2000, 5) === 2 * brineSalt(1000, 5));
// 7. EQ salt scales with percent.
check('eq scaling', equilibriumBrineSalt(2000, 4) === 2 * equilibriumBrineSalt(2000, 2));
// 8. Curing salt scales with meat weight.
check('cure scaling', near(curingSaltGrams(2000, 156), 2 * curingSaltGrams(1000, 156)));
// 9. Zero water rejected in concentration.
let w = false; try { saltPercentOf(50, 0); } catch (e) { w = true; }
check('water guard', w);
// 10. Negative salt percent rejected.
let p = false; try { brineSalt(1000, -1); } catch (e) { p = true; }
check('percent guard', p);

console.log(passed + ' checks passed.');
