import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { phFromH, hFromPh, pohFromPh, phFromPoh, classify } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. Neutral water: [H+] = 1e-7 -> pH 7.
check('pH of 1e-7 is 7', near(phFromH(1e-7), 7));
// 2. hFromPh inverts phFromH.
check('h from pH 7', near(hFromPh(7), 1e-7));
// 3. pH of 1e-3 acid = 3.
check('pH of 1e-3 is 3', near(phFromH(1e-3), 3));
// 4. pOH = 14 - pH.
check('pOH from pH', near(pohFromPh(3), 11));
// 5. phFromPoh inverts pohFromPh.
check('pH from pOH', near(phFromPoh(11), 3));
// 6. Water ion product: [H+][OH-] = 1e-14.
const ph = 4;
check('Kw = 1e-14', near(hFromPh(ph) * hFromPh(pohFromPh(ph)), 1e-14, 1e-20));
// 7. pH of 0.1 M strong acid = 1.
check('pH of 0.1 is 1', near(phFromH(0.1), 1));
// 8. Classification thresholds.
check('classify', classify(3) === 'acidic' && classify(7) === 'neutral' && classify(10) === 'basic');
// 9. Round trip pH -> [H+] -> pH.
check('round trip', near(phFromH(hFromPh(5.5)), 5.5));
// 10. Higher [H+] means lower pH (more acidic).
check('monotonic', phFromH(1e-2) < phFromH(1e-5));

console.log(passed + ' checks passed.');
