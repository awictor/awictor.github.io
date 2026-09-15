import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { minCircuitAmps, breakerSize, wireGaugeForBreaker } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-9; }

check('40 A charger needs 50 A circuit', near(minCircuitAmps(40), 50));
check('32 A charger needs 40 A circuit', near(minCircuitAmps(32), 40));
check('higher charger higher circuit', minCircuitAmps(48) > minCircuitAmps(40));
check('40 A charger gets 50 A breaker', breakerSize(40) === 50);
check('32 A charger gets 40 A breaker', breakerSize(32) === 40);
check('48 A charger gets 60 A breaker', breakerSize(48) === 60);
check('50 A breaker uses 6 AWG', wireGaugeForBreaker(50) === 6);
check('40 A breaker uses 8 AWG', wireGaugeForBreaker(40) === 8);
check('charger over range throws', (() => { try { breakerSize(90); return false; } catch(e){ return true; } })());
check('zero charger throws', (() => { try { minCircuitAmps(0); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
