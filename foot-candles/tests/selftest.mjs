import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { lumensNeeded, fixturesNeeded, fcToLux, luxToFc } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-4; }

check('200 sqft at 30 fc = 6000 lm', lumensNeeded(200, 30) === 6000);
check('1 fc = 10.7639 lux', near(fcToLux(1), 10.7639));
check('10.7639 lux = 1 fc', near(luxToFc(10.7639), 1));
check('6000 lm / 800 rounds up to 8', fixturesNeeded(6000, 800) === 8);
check('1600 lm / 800 = 2 fixtures', fixturesNeeded(1600, 800) === 2);
check('brighter target needs more lumens', lumensNeeded(200, 50) > lumensNeeded(200, 30));
check('bigger room needs more lumens', lumensNeeded(400, 30) > lumensNeeded(200, 30));
check('fc/lux round trip', near(luxToFc(fcToLux(35)), 35));
check('zero area throws', (() => { try { lumensNeeded(0, 30); return false; } catch(e){ return true; } })());
check('zero lumens per fixture throws', (() => { try { fixturesNeeded(6000, 0); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
