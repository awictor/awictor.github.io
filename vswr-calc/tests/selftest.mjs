import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { reflectionFromVswr, vswrFromReflection, returnLossDb, reflectionFromReturnLoss, mismatchLossDb } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. A perfect match reflects nothing.
check('perfect match', reflectionFromVswr(1) === 0);
// 2. Zero reflection is 1:1 VSWR.
check('unity vswr', vswrFromReflection(0) === 1);
// 3. VSWR 3 gives |Γ| = 0.5.
check('reflection', near(reflectionFromVswr(3), 0.5));
// 4. |Γ| = 0.5 gives VSWR 3.
check('vswr from gamma', near(vswrFromReflection(0.5), 3));
// 5. VSWR <-> reflection round trip.
check('round trip', near(vswrFromReflection(reflectionFromVswr(2)), 2));
// 6. Return loss of |Γ| = 0.1 is 20 dB.
check('return loss', near(returnLossDb(0.1), 20));
// 7. Return loss <-> reflection round trip.
check('rl round trip', near(reflectionFromReturnLoss(returnLossDb(0.25)), 0.25));
// 8. Mismatch loss of |Γ| = 0.5 is about 1.25 dB.
check('mismatch loss', Math.abs(mismatchLossDb(0.5) - 1.249) < 0.01);
// 9. VSWR below 1 is rejected.
let v = false; try { reflectionFromVswr(0.5); } catch (e) { v = true; }
check('vswr guard', v);
// 10. A reflection coefficient of 1 or more is rejected.
let g = false; try { vswrFromReflection(1); } catch (e) { g = true; }
check('gamma guard', g);

console.log(passed + ' checks passed.');
