import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { sealedFc, sealedQtc, boxForQtc } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. Fc with Vas/Vb = 2: 30 * sqrt(3) ≈ 51.96 Hz.
check('fc vb25', near(sealedFc(30, 50, 25), 51.96152422706631, 1e-6));
// 2. When Vb equals Vas, Fc = Fs * sqrt(2).
check('fc vb=vas', near(sealedFc(30, 50, 50), 30 * Math.SQRT2, 1e-6));
// 3. Qtc with Vas/Vb = 2: 0.4 * sqrt(3).
check('qtc vb25', near(sealedQtc(0.4, 50, 25), 0.6928203230275509, 1e-6));
// 4. When Vb equals Vas, Qtc = Qts * sqrt(2).
check('qtc vb=vas', near(sealedQtc(0.4, 50, 50), 0.4 * Math.SQRT2, 1e-6));
// 5. A smaller box raises Fc.
check('smaller box higher fc', sealedFc(30, 50, 10) > sealedFc(30, 50, 50));
// 6. A smaller box raises Qtc.
check('smaller box higher qtc', sealedQtc(0.4, 50, 10) > sealedQtc(0.4, 50, 50));
// 7. boxForQtc inverts sealedQtc: recovering Vb = 25.
check('roundtrip', near(boxForQtc(50, 0.4, sealedQtc(0.4, 50, 25)), 25, 1e-6));
// 8. A target Qtc at or below Qts is impossible in a sealed box.
let a = false; try { boxForQtc(50, 0.4, 0.4); } catch (e) { a = true; }
check('target guard', a);
// 9. A non-positive box volume is rejected.
let b = false; try { sealedFc(30, 50, 0); } catch (e) { b = true; }
check('vb guard', b);
// 10. A non-positive Qts is rejected.
let c = false; try { sealedQtc(0, 50, 25); } catch (e) { c = true; }
check('qts guard', c);

console.log(passed + ' checks passed.');
