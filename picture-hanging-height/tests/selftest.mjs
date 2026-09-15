import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { topOfPicture, hookHeight, centerAboveFurniture } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-9; }

check('20 in picture, 57 center, top = 67', near(topOfPicture(20, 57), 67));
check('20 in picture, 3 wire, default center = 64', near(hookHeight(20, 3), 64));
check('60 center raises hook to 67', near(hookHeight(20, 3, 60), 67));
check('taller picture higher hook', hookHeight(30, 3) > hookHeight(20, 3));
check('more wire drop lowers hook', hookHeight(20, 5) < hookHeight(20, 3));
check('default center is 57', near(hookHeight(20, 3), hookHeight(20, 3, 57)));
check('furniture top 30 + 8 gap = 38', near(centerAboveFurniture(30), 38));
check('custom gap of 6 = 36', near(centerAboveFurniture(30, 6), 36));
check('zero picture height throws', (() => { try { topOfPicture(0, 57); return false; } catch(e){ return true; } })());
check('negative wire drop throws', (() => { try { hookHeight(20, -1); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
