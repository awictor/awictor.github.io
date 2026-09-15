import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { windComponents, windCorrectionAngle, groundSpeed, normHeading } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b, tol){ return Math.abs(a - b) < (tol || 1e-6); }

check('direct headwind is positive', near(windComponents(20, 0, 0).headwind, 20));
check('direct tailwind is negative', near(windComponents(20, 180, 0).headwind, -20));
check('right crosswind is positive', near(windComponents(20, 90, 0).crosswind, 20));
check('pure headwind needs no correction', near(windCorrectionAngle(120, 20, 0, 0), 0));
check('20 kt crosswind at 120 TAS is ~9.6 deg', near(windCorrectionAngle(120, 20, 90, 0), 9.594, 1e-2));
check('headwind cuts groundspeed', near(groundSpeed(120, 20, 0, 0), 100));
check('tailwind adds groundspeed', near(groundSpeed(120, 20, 180, 0), 140));
check('crosswind leaves GS below TAS', groundSpeed(120, 20, 90, 0) < 120);
check('crosswind over TAS throws', (() => { try { windCorrectionAngle(10, 50, 90, 0); return false; } catch(e){ return true; } })());
check('heading wraps into 0-360', normHeading(-10) === 350 && normHeading(370) === 10);

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
