import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { sweptVolumeCC, gasketVolume, compressionRatio, clearanceForRatio } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-6) => Math.abs(a - b) < t;

// 1. 500cc swept, 50cc clearance = 11:1.
check('CR 11', compressionRatio(500, 50) === 11);
// 2. 500cc swept, 100cc clearance = 6:1.
check('CR 6', compressionRatio(500, 100) === 6);
// 3. Clearance for 11:1 with 500cc swept = 50cc.
check('clearance', clearanceForRatio(500, 11) === 50);
// 4. Round trip CR -> clearance.
check('round trip', near(clearanceForRatio(500, compressionRatio(500, 50)), 50));
// 5. Swept volume of a 100x100mm cylinder.
check('swept vol', near(sweptVolumeCC(100, 100), Math.PI / 4 * 1000));
// 6. Gasket volume of a 100mm bore, 1mm thick gasket.
check('gasket vol', near(gasketVolume(100, 1), Math.PI / 4 * 10));
// 7. Less clearance means higher ratio.
check('monotonic', compressionRatio(500, 25) > compressionRatio(500, 50));
// 8. Swept volume scales with bore squared.
check('bore squared', near(sweptVolumeCC(200, 100), 4 * sweptVolumeCC(100, 100)));
// 9. Zero clearance rejected.
let c = false; try { compressionRatio(500, 0); } catch (e) { c = true; }
check('clearance guard', c);
// 10. Target ratio of 1 or less rejected.
let r = false; try { clearanceForRatio(500, 1); } catch (e) { r = true; }
check('ratio guard', r);

console.log(passed + ' checks passed.');
