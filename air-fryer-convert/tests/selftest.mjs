import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { airFryerTemp, airFryerMinutes, ovenTempFromAirFryer, ovenMinutesFromAirFryer } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-9; }

check('400F oven = 375F air fryer', airFryerTemp(400) === 375);
check('20 min oven = 16 min air fryer', near(airFryerMinutes(20), 16));
check('375F air fryer = 400F oven', ovenTempFromAirFryer(375) === 400);
check('16 min air fryer = 20 min oven', near(ovenMinutesFromAirFryer(16), 20));
check('air fryer temp is 25 less', airFryerTemp(350) === 325);
check('air fryer time is shorter', airFryerMinutes(30) < 30);
check('temp round trip', ovenTempFromAirFryer(airFryerTemp(425)) === 425);
check('time round trip', near(ovenMinutesFromAirFryer(airFryerMinutes(25)), 25));
check('zero temp throws', (() => { try { airFryerTemp(0); return false; } catch(e){ return true; } })());
check('zero time throws', (() => { try { airFryerMinutes(0); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
