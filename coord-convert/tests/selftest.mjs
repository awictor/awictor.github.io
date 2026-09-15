import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { ddToDms, dmsToDd, ddToDdm, ddmToDd } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. 40.7128 -> 40° 42' 46.08".
const a = ddToDms(40.7128);
check('DMS degrees/minutes', a.sign === 1 && a.degrees === 40 && a.minutes === 42);
// 2. Seconds ~ 46.08.
check('DMS seconds', near(a.seconds, 46.08, 1e-6));
// 3. dmsToDd inverts ddToDms.
check('DMS round trip', near(dmsToDd(a.degrees, a.minutes, a.seconds, a.sign), 40.7128, 1e-9));
// 4. Negative coordinate keeps sign separate, degrees positive.
const b = ddToDms(-74.006);
check('negative sign split', b.sign === -1 && b.degrees === 74);
// 5. dmsToDd with sign -1 yields a negative value.
check('negative reconstruct', near(dmsToDd(b.degrees, b.minutes, b.seconds, b.sign), -74.006, 1e-9));
// 6. DDM: 40.7128 -> 40° 42.768'.
const c = ddToDdm(40.7128);
check('DDM degrees/minutes', c.degrees === 40 && near(c.minutes, 42.768, 1e-9));
// 7. ddmToDd inverts ddToDdm.
check('DDM round trip', near(ddmToDd(c.degrees, c.minutes, c.sign), 40.7128, 1e-12));
// 8. Zero maps to all zeros with positive sign.
const z = ddToDms(0);
check('zero', z.degrees === 0 && z.minutes === 0 && z.seconds === 0 && z.sign === 1);
// 9. Whole degree has no minutes or seconds.
const w = ddToDms(45);
check('whole degree', w.degrees === 45 && w.minutes === 0 && near(w.seconds, 0));
// 10. dmsToDd(0,30,0) = 0.5.
check('half degree', dmsToDd(0, 30, 0) === 0.5);

console.log(passed + ' checks passed.');
