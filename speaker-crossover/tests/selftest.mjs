import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { crossoverCapFarads, crossoverIndHenries, toMicroFarads, toMilliHenries } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b, tol){ return Math.abs(a - b) < (tol || 1e-9); }

check('2000 Hz / 8 ohm cap is ~9.95 uF', near(toMicroFarads(crossoverCapFarads(2000, 8)), 9.947, 1e-2));
check('2000 Hz / 8 ohm inductor is ~0.637 mH', near(toMilliHenries(crossoverIndHenries(2000, 8)), 0.6366, 1e-3));
check('higher frequency gives smaller cap', crossoverCapFarads(4000, 8) < crossoverCapFarads(2000, 8));
check('higher frequency gives smaller inductor', crossoverIndHenries(4000, 8) < crossoverIndHenries(2000, 8));
check('higher impedance gives smaller cap', crossoverCapFarads(2000, 16) < crossoverCapFarads(2000, 8));
check('higher impedance gives larger inductor', crossoverIndHenries(2000, 16) > crossoverIndHenries(2000, 8));
check('cap doubles when frequency halves', near(crossoverCapFarads(1000, 8), 2 * crossoverCapFarads(2000, 8)));
check('microfarad conversion is 1e6', near(toMicroFarads(1e-6), 1));
check('zero frequency throws', (() => { try { crossoverCapFarads(0, 8); return false; } catch(e){ return true; } })());
check('zero impedance throws', (() => { try { crossoverIndHenries(2000, 0); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
