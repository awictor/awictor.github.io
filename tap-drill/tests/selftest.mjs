import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { tapDrillDiameter, threadEngagementDrill, pitchToTpi, tpiToPitch } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-6) => Math.abs(a - b) < t;

// 1. M10x1.5 uses an 8.5 mm drill (standard).
check('m10', tapDrillDiameter(10, 1.5) === 8.5);
// 2. M6x1 uses 5 mm (standard).
check('m6', tapDrillDiameter(6, 1) === 5);
// 3. Finer pitch means a larger drill.
check('finer larger', tapDrillDiameter(10, 1.0) > tapDrillDiameter(10, 1.5));
// 4. Pitch to TPI.
check('pitch to tpi', near(pitchToTpi(1.27), 20));
// 5. TPI to pitch.
check('tpi to pitch', near(tpiToPitch(20), 1.27));
// 6. Pitch/TPI round trip.
check('round trip', near(tpiToPitch(pitchToTpi(1.5)), 1.5));
// 7. 75% engagement drill for M10x1.5.
check('engagement', near(threadEngagementDrill(10, 1.5, 75), 10 - 0.75 * 1.0825 * 1.5));
// 8. Lower engagement means a larger drill.
check('lower larger', threadEngagementDrill(10, 1.5, 50) > threadEngagementDrill(10, 1.5, 75));
// 9. Zero pitch is rejected.
let p = false; try { tapDrillDiameter(10, 0); } catch (e) { p = true; }
check('pitch guard', p);
// 10. Engagement over 100% is rejected.
let e = false; try { threadEngagementDrill(10, 1.5, 120); } catch (err) { e = true; }
check('engagement guard', e);

console.log(passed + ' checks passed.');
