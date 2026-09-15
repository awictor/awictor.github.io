import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { modMeters, modFeet, ppO2AtDepth, bestMix } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b, tol){ return Math.abs(a - b) < (tol || 1e-6); }

check('EAN32 at 1.4 has MOD ~33.75 m', near(modMeters(0.32, 1.4), 33.75));
check('EAN36 at 1.4 has MOD ~28.9 m', near(modMeters(0.36, 1.4), 28.889, 1e-2));
check('richer mix has shallower MOD', modMeters(0.36, 1.4) < modMeters(0.32, 1.4));
check('EAN32 at 1.4 MOD in feet ~111', near(modFeet(0.32, 1.4), 111.375, 1e-2));
check('higher ppO2 limit deepens MOD', modMeters(0.32, 1.6) > modMeters(0.32, 1.4));
check('air at surface is 0.21 ppO2', near(ppO2AtDepth(0.21, 0), 0.21));
check('EAN32 at 30 m is 1.28 ppO2', near(ppO2AtDepth(0.32, 30), 1.28));
check('best mix for 30 m at 1.4 is 0.35', near(bestMix(30, 1.4), 0.35));
check('deeper target gives leaner best mix', bestMix(40, 1.4) < bestMix(30, 1.4));
check('zero oxygen fraction throws', (() => { try { modMeters(0, 1.4); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
