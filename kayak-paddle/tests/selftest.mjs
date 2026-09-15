import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { paddleLengthCm, cmToInches, widthBand, heightBand, toInches } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-9; }

check('narrow boat + short paddler = 205 cm', paddleLengthCm(60, 22) === 205);
check('narrow boat + tall paddler = 220 cm', paddleLengthCm(74, 22) === 220);
check('extra-wide boat + tall paddler = 250 cm', paddleLengthCm(74, 36) === 250);
check('extra-wide boat + short paddler = 240 cm', paddleLengthCm(60, 36) === 240);
check('medium boat + medium paddler = 220 cm', paddleLengthCm(68, 28) === 220);
check('254 cm converts to 100 in', near(cmToInches(254), 100));
check('taller paddler never gets shorter paddle', paddleLengthCm(74, 28) >= paddleLengthCm(60, 28));
check('wider boat never gets shorter paddle', paddleLengthCm(68, 36) >= paddleLengthCm(68, 22));
check('band boundaries snap correctly', widthBand(26) === 1 && widthBand(25) === 0 && heightBand(65) === 1);
check('non-positive height throws', (() => { try { paddleLengthCm(0, 24); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
