import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { trackedAltitude, slantRange, apogee } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b, tol){ return Math.abs(a - b) < (tol || 1e-6); }

check('45 deg gives altitude equal to baseline', near(trackedAltitude(500, 45), 500));
check('0 deg gives zero altitude', near(trackedAltitude(500, 0), 0));
check('60 deg from 1000 ft is ~1732 ft', near(trackedAltitude(1000, 60), 1732.0508, 1e-2));
check('higher angle gives higher altitude', trackedAltitude(500, 60) > trackedAltitude(500, 45));
check('longer baseline gives higher altitude', trackedAltitude(1000, 45) > trackedAltitude(500, 45));
check('slant range at 0 deg equals baseline', near(slantRange(500, 0), 500));
check('slant range at 60 deg from 1000 is 2000', near(slantRange(1000, 60), 2000, 1e-6));
check('slant range exceeds altitude', slantRange(500, 45) > trackedAltitude(500, 45));
check('apogee adds eye height', near(apogee(500, 45, 5), 505));
check('angle 90 throws', (() => { try { trackedAltitude(500, 90); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
