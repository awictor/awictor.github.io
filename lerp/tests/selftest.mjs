import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { lerp, inverseLerp, clamp, remap, remapClamped } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. Midpoint.
check('lerp midpoint', lerp(0, 10, 0.5) === 5);
// 2. Endpoints.
check('lerp endpoints', lerp(0, 10, 0) === 0 && lerp(0, 10, 1) === 10);
// 3. Non-zero base.
check('lerp base', lerp(10, 20, 0.25) === 12.5);
// 4. Inverse lerp.
check('inverse lerp', inverseLerp(0, 10, 5) === 0.5);
// 5. lerp/inverseLerp round trip.
check('round trip', near(inverseLerp(3, 7, lerp(3, 7, 0.4)), 0.4));
// 6. Remap simple.
check('remap 5', remap(5, 0, 10, 0, 100) === 50);
// 7. Remap Celsius->Fahrenheit.
check('remap C->F', near(remap(37, 0, 100, 32, 212), 98.6) && remap(100, 0, 100, 32, 212) === 212 && remap(0, 0, 100, 32, 212) === 32);
// 8. t beyond [0,1] extrapolates.
check('extrapolate', remap(15, 0, 10, 0, 100) === 150 && lerp(0, 10, 2) === 20);
// 9. clamp and remapClamped.
check('clamp', clamp(5, 0, 10) === 5 && clamp(-1, 0, 10) === 0 && clamp(11, 0, 10) === 10 && remapClamped(15, 0, 10, 0, 100) === 100);
// 10. Degenerate input range: inverseLerp returns 0 (no divide-by-zero).
check('degenerate range', inverseLerp(5, 5, 5) === 0);

console.log(passed + ' checks passed.');
