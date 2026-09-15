import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { requiredVentNfaSqIn, ventsNeeded, ventsForCrawlspace } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-9; }

check('1500 sqft at 1/150 = 1440 sq in', near(requiredVentNfaSqIn(1500, 150), 1440));
check('1500 sqft at 1/1500 = 144 sq in', near(requiredVentNfaSqIn(1500, 1500), 144));
check('bigger crawlspace more NFA', requiredVentNfaSqIn(3000, 150) > requiredVentNfaSqIn(1500, 150));
check('1/150 needs more than 1/1500', requiredVentNfaSqIn(1500, 150) > requiredVentNfaSqIn(1500, 1500));
check('1440 sq in over 50 sq in vents = 29', ventsNeeded(1440, 50) === 29);
check('more NFA more vents', ventsNeeded(2000, 50) > ventsNeeded(1440, 50));
check('smaller vent more vents', ventsNeeded(1440, 25) > ventsNeeded(1440, 50));
check('crawlspace vents match composition', ventsForCrawlspace(1500, 50, 150) === 29);
check('zero area throws', (() => { try { requiredVentNfaSqIn(0, 150); return false; } catch(e){ return true; } })());
check('zero per-vent throws', (() => { try { ventsNeeded(1440, 0); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
