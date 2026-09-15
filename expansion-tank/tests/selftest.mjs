import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { expansionVolume, tankSize, sizeExpansionTank } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-2; }

check('50 gal at 0.02 = 1.0 gal expansion', near(expansionVolume(50, 0.02), 1.0));
check('80 gal at 0.02 = 1.6 gal expansion', near(expansionVolume(80, 0.02), 1.6));
check('bigger system, more expansion', expansionVolume(80, 0.02) > expansionVolume(50, 0.02));
check('higher factor, more expansion', expansionVolume(50, 0.03) > expansionVolume(50, 0.02));
check('tank size is positive', tankSize(1.15, 50, 150) > 0);
check('higher fill pressure needs bigger tank', tankSize(1, 60, 150) > tankSize(1, 40, 150));
check('tankSize(1.15,50,150) ~ 1.894 gal', near(tankSize(1.15, 50, 150), 1.894));
check('sizeExpansionTank matches composition', near(sizeExpansionTank(50, 0.023, 50, 150), tankSize(1.15, 50, 150)));
check('relief below fill throws', (() => { try { tankSize(1, 150, 50); return false; } catch(e){ return true; } })());
check('zero capacity throws', (() => { try { expansionVolume(0, 0.02); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
