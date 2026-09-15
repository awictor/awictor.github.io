import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { honeyPerFrame, superYield, totalYield, jarsFilled } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-9; }

check('medium frame holds 6 lb', honeyPerFrame('medium') === 6);
check('deep frame holds more than medium', honeyPerFrame('deep') > honeyPerFrame('medium'));
check('full 10-frame medium super is 60 lb', near(superYield('medium', 10, 100), 60));
check('80% fill drops it to 48 lb', near(superYield('medium', 10, 80), 48));
check('two supers double the yield', near(totalYield('medium', 2, 10, 80), 96));
check('more supers means more honey', totalYield('medium', 3, 10, 80) > totalYield('medium', 2, 10, 80));
check('zero fill yields nothing', superYield('medium', 10, 0) === 0);
check('96 lb fills 96 one-pound (16 oz) jars', jarsFilled(96, 16) === 96);
check('unknown super type throws', (() => { try { honeyPerFrame('jumbo'); return false; } catch(e){ return true; } })());
check('fill over 100 throws', (() => { try { superYield('medium', 10, 120); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
