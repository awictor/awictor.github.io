import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { heaterBtu, poolGallons, heatUpHours } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-4; }

check('400 sqft, 20F rise = 96000 BTU', heaterBtu(400, 20) === 96000);
check('400 sqft, 10F rise = 48000 BTU', heaterBtu(400, 10) === 48000);
check('bigger pool needs more BTU', heaterBtu(800, 20) > heaterBtu(400, 20));
check('bigger rise needs more BTU', heaterBtu(400, 30) > heaterBtu(400, 20));
check('400 sqft x 5 ft = 14960 gal', near(poolGallons(400, 5), 14960));
check('deeper pool holds more', poolGallons(400, 6) > poolGallons(400, 5));
check('14960 gal, 20F, 96000 BTU ~ 25.99 hr', near(heatUpHours(14960, 20, 96000), 14960 * 8.34 * 20 / 96000));
check('bigger heater is faster', heatUpHours(14960, 20, 120000) < heatUpHours(14960, 20, 96000));
check('zero area throws', (() => { try { heaterBtu(0, 20); return false; } catch(e){ return true; } })());
check('zero heater throws', (() => { try { heatUpHours(14960, 20, 0); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
