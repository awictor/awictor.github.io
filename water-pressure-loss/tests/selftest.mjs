import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { frictionHeadFt, frictionLossPsi, lossPer100Ft } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-6; }

check('loss is positive for valid input', frictionLossPsi(8, 0.75, 100, 150) > 0);
check('more flow means more loss', frictionLossPsi(12, 0.75, 100, 150) > frictionLossPsi(8, 0.75, 100, 150));
check('smaller pipe means more loss', frictionLossPsi(8, 0.5, 100, 150) > frictionLossPsi(8, 0.75, 100, 150));
check('longer run means more loss', frictionLossPsi(8, 0.75, 200, 150) > frictionLossPsi(8, 0.75, 100, 150));
check('rougher pipe (lower C) means more loss', frictionLossPsi(8, 0.75, 100, 100) > frictionLossPsi(8, 0.75, 100, 150));
check('psi is head times 0.433', near(frictionLossPsi(8, 0.75, 100, 150), frictionHeadFt(8, 0.75, 100, 150) * 0.433));
check('head is linear in length', near(frictionHeadFt(8, 0.75, 200, 150), 2 * frictionHeadFt(8, 0.75, 100, 150)));
check('lossPer100Ft matches a 100 ft run', near(lossPer100Ft(8, 0.75, 150), frictionLossPsi(8, 0.75, 100, 150)));
check('zero flow throws', (() => { try { frictionHeadFt(0, 0.75, 100, 150); return false; } catch(e){ return true; } })());
check('zero diameter throws', (() => { try { frictionHeadFt(8, 0, 100, 150); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
