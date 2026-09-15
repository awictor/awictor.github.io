import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { distanceToDescendNM, descentRateFpm, descentAngleDeg } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b, tol){ return Math.abs(a - b) < (tol || 1e-6); }

check('30000 ft to lose starts 90 NM out', near(distanceToDescendNM(30000, 3), 90));
check('10000 ft to lose starts 30 NM out', near(distanceToDescendNM(10000, 3), 30));
check('higher altitude starts farther out', distanceToDescendNM(30000, 3) > distanceToDescendNM(10000, 3));
check('zero altitude needs no distance', distanceToDescendNM(0, 3) === 0);
check('450 kt on 3 deg is about 2390 fpm', near(descentRateFpm(450, 3), 2390, 5));
check('faster groundspeed sinks faster', descentRateFpm(450, 3) > descentRateFpm(250, 3));
check('steeper angle sinks faster', descentRateFpm(300, 6) > descentRateFpm(300, 3));
check('level flight has zero descent rate', descentRateFpm(300, 0) === 0);
check('6076 ft over 60 NM is about 0.955 deg', near(descentAngleDeg(6076.12, 60), 0.9549, 1e-3));
check('zero distance glidepath throws', (() => { try { descentAngleDeg(3000, 0); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
