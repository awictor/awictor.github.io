import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { combinedVlt, filmForTarget, isLegal } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-9; }

check('50% film on 80% glass = 40%', near(combinedVlt(50, 80), 40));
check('35% film on 70% glass = 24.5%', near(combinedVlt(35, 70), 24.5));
check('to hit 35% on 70% glass, need 50% film', near(filmForTarget(35, 70), 50));
check('combining is darker than glass alone', combinedVlt(50, 80) < 80);
check('darker film lowers combined VLT', combinedVlt(20, 80) < combinedVlt(50, 80));
check('film-for-target round trip', near(combinedVlt(filmForTarget(35, 70), 70), 35));
check('legal when at or above limit', isLegal(40, 35) === true);
check('illegal when below limit', isLegal(30, 35) === false);
check('zero glass throws', (() => { try { combinedVlt(50, 0); return false; } catch(e){ return true; } })());
check('zero glass in target throws', (() => { try { filmForTarget(35, 0); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
