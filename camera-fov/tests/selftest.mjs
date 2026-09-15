import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { fovDegrees, diagonalMm } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 0.1; }

check('36mm at 50mm ≈ 39.6°', near(fovDegrees(36, 50), 39.6));
check('24mm at 50mm ≈ 27.0°', near(fovDegrees(24, 50), 26.99));
check('24mm lens full frame H ≈ 73.7°', near(fovDegrees(36, 24), 73.74));
check('diagonal of 36x24 ≈ 43.27mm', near(diagonalMm(36, 24), 43.27));
check('full-frame diagonal at 50mm ≈ 46.8°', near(fovDegrees(diagonalMm(36, 24), 50), 46.79));
check('shorter focal widens the view', fovDegrees(36, 24) > fovDegrees(36, 50));
check('longer focal narrows the view', fovDegrees(36, 200) < fovDegrees(36, 50));
check('bigger sensor widens the view', fovDegrees(36, 50) > fovDegrees(23.6, 50));
check('zero focal length throws', (() => { try { fovDegrees(36, 0); return false; } catch(e){ return true; } })());
check('zero sensor throws', (() => { try { fovDegrees(0, 50); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
