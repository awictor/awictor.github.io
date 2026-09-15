import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { stripWatts, psuWatts, psuAmps } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-6; }

check('16.4 ft at 4.4 W/ft ≈ 72.16 W', near(stripWatts(16.4, 4.4), 72.16));
check('100 W with 20% headroom = 120 W', near(psuWatts(100, 1.2), 120));
check('120 W at 12 V = 10 A', near(psuAmps(120, 12), 10));
check('120 W at 24 V = 5 A', near(psuAmps(120, 24), 5));
check('longer strip draws more', stripWatts(30, 4.4) > stripWatts(16.4, 4.4));
check('higher W/ft draws more', stripWatts(16.4, 6) > stripWatts(16.4, 4.4));
check('24 V draws fewer amps than 12 V', psuAmps(120, 24) < psuAmps(120, 12));
check('headroom adds margin', psuWatts(100, 1.2) > 100);
check('zero length throws', (() => { try { stripWatts(0, 4.4); return false; } catch(e){ return true; } })());
check('zero volts throws', (() => { try { psuAmps(120, 0); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
