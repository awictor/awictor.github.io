import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { recommendedPsi, frontPsi, rearPsi } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-9; }

check('200 lb on 25 mm ≈ 84 psi', near(recommendedPsi(200, 25), 84));
check('double width halves pressure', near(recommendedPsi(200, 50), 42));
check('wider tire runs lower', recommendedPsi(200, 35) < recommendedPsi(200, 25));
check('heavier rider runs higher', recommendedPsi(250, 25) > recommendedPsi(200, 25));
check('front is lower than rear', frontPsi(100) < rearPsi(100));
check('front of 100 = 95', near(frontPsi(100), 95));
check('rear of 100 = 105', near(rearPsi(100), 105));
check('front and rear average to base', near((frontPsi(100) + rearPsi(100)) / 2, 100));
check('zero weight throws', (() => { try { recommendedPsi(0, 25); return false; } catch(e){ return true; } })());
check('zero width throws', (() => { try { recommendedPsi(200, 0); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
