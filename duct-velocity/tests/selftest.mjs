import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { roundDuctAreaSqFt, rectDuctAreaSqFt, ductVelocity, roundDuctVelocity } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-4; }

check('12 in round = pi/4 sq ft', near(roundDuctAreaSqFt(12), Math.PI / 4));
check('6 in round = 0.19635 sq ft', near(roundDuctAreaSqFt(6), 0.196349));
check('bigger round duct more area', roundDuctAreaSqFt(14) > roundDuctAreaSqFt(12));
check('12x8 rect = 0.6667 sq ft', near(rectDuctAreaSqFt(12, 8), 96 / 144));
check('800 CFM in pi/4 sqft ~ 1018.6 fpm', near(ductVelocity(800, Math.PI / 4), 800 / (Math.PI / 4)));
check('round velocity matches composition', near(roundDuctVelocity(800, 12), ductVelocity(800, roundDuctAreaSqFt(12))));
check('bigger duct lowers velocity', roundDuctVelocity(800, 14) < roundDuctVelocity(800, 12));
check('more airflow raises velocity', roundDuctVelocity(1000, 12) > roundDuctVelocity(800, 12));
check('zero diameter throws', (() => { try { roundDuctAreaSqFt(0); return false; } catch(e){ return true; } })());
check('zero area throws', (() => { try { ductVelocity(800, 0); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
