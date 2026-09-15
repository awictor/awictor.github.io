import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { potentialAlcoholFromSG, sugarToAdd } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b, tol){ return Math.abs(a - b) < (tol || 1e-6); }

check('SG 1.090 is 11.8125% potential alcohol', near(potentialAlcoholFromSG(1.090), 11.8125));
check('SG 1.000 is 0% potential alcohol', near(potentialAlcoholFromSG(1.000), 0));
check('higher gravity gives more potential alcohol', potentialAlcoholFromSG(1.100) > potentialAlcoholFromSG(1.080));
check('20 L from 10 to 12% needs 673.2 g', near(sugarToAdd(20, 10, 12), 673.2));
check('no gap needs no sugar', sugarToAdd(20, 12, 12) === 0);
check('more volume needs more sugar', sugarToAdd(30, 10, 12) > sugarToAdd(20, 10, 12));
check('bigger target needs more sugar', sugarToAdd(20, 10, 13) > sugarToAdd(20, 10, 12));
check('1 L, 1% gain is 16.83 g', near(sugarToAdd(1, 0, 1), 16.83));
check('gravity below 1.000 throws', (() => { try { potentialAlcoholFromSG(0.99); return false; } catch(e){ return true; } })());
check('negative volume throws', (() => { try { sugarToAdd(-1, 10, 12); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
