import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { countSigFigs, roundToSigFigs, toSigFigString } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-12) => Math.abs(a - b) < t;

// 1. All non-zero digits count.
check('1234 -> 4', countSigFigs('1234') === 4);
// 2. Trailing zeros with no decimal are not significant.
check('1000 -> 1', countSigFigs('1000') === 1);
// 3. Trailing decimal point makes them significant.
check('1000. -> 4', countSigFigs('1000.') === 4);
// 4. Leading zeros never count.
check('0.00456 -> 3', countSigFigs('0.00456') === 3);
// 5. Zeros between non-zero digits count.
check('100.45 -> 5', countSigFigs('100.45') === 5);
// 6. Leading zeros out, trailing decimal zeros in.
check('0.007800 -> 4', countSigFigs('0.007800') === 4);
// 7. Trailing zero after decimal counts.
check('120.0 -> 4', countSigFigs('120.0') === 4);
// 8. Round 1234 to 2 sig figs -> 1200.
check('round 1234 -> 1200', roundToSigFigs(1234, 2) === 1200);
// 9. Round 0.004567 to 2 sig figs -> 0.0046.
check('round 0.004567 -> 0.0046', near(roundToSigFigs(0.004567, 2), 0.0046));
// 10. Rounding can carry: 999 to 2 sig figs -> 1000.
check('round 999 -> 1000', roundToSigFigs(999, 2) === 1000);

console.log(passed + ' checks passed.');
