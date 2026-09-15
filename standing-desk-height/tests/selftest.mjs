import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { standingDeskHeight, seatedDeskHeight, monitorTopHeight } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-6; }

check('70 in standing desk = 43.4 in', near(standingDeskHeight(70), 43.4));
check('70 in seated desk = 28 in', near(seatedDeskHeight(70), 28));
check('standing higher than seated', standingDeskHeight(70) > seatedDeskHeight(70));
check('taller person higher standing desk', standingDeskHeight(74) > standingDeskHeight(70));
check('70 in monitor top = 63 in', near(monitorTopHeight(70), 63));
check('monitor top higher than standing desk', monitorTopHeight(70) > standingDeskHeight(70));
check('66 in standing = 40.92 in', near(standingDeskHeight(66), 40.92));
check('66 in seated = 26.4 in', near(seatedDeskHeight(66), 26.4));
check('zero height throws (standing)', (() => { try { standingDeskHeight(0); return false; } catch(e){ return true; } })());
check('negative height throws (monitor)', (() => { try { monitorTopHeight(-5); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
