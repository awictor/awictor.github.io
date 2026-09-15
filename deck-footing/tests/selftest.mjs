import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { soilBearing, tributaryLoad, requiredFootingArea, footingDiameterInches } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-6; }

check('clay bears 1500 psf', soilBearing('clay') === 1500);
check('bedrock bears more than clay', soilBearing('crystallineBedrock') > soilBearing('clay'));
check('60 sq ft at 50 psf = 3000 lb', tributaryLoad(60, 50) === 3000);
check('required area = load / soil', near(requiredFootingArea(3000, 1500), 2));
check('weaker soil needs bigger area', requiredFootingArea(3000, 1500) > requiredFootingArea(3000, 3000));
check('1 sq ft footing ~ 13.54 in diameter', near(Math.round(footingDiameterInches(1) * 100) / 100, 13.54));
check('bigger bearing area, bigger diameter', footingDiameterInches(3) > footingDiameterInches(1));
check('bigger load, bigger footing area', tributaryLoad(80, 50) > tributaryLoad(60, 50));
check('unknown soil throws', (() => { try { soilBearing('mud'); return false; } catch(e){ return true; } })());
check('zero area throws', (() => { try { tributaryLoad(0, 50); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
