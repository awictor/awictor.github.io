import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { totalRunning, surgeExtra, peakWatts, recommendSize } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }

check('sum of running watts', totalRunning([600, 300, 100]) === 1000);
check('surge extra = start - run', surgeExtra(600, 1800) === 1200);
check('no surge when start equals run', surgeExtra(100, 100) === 0);
check('peak = running + largest surge', peakWatts([600, 300], [1800, 300]) === 2100);
check('2100 W needs 3500 W generator', recommendSize(2100) === 3500);
check('1500 W needs 2000 W generator', recommendSize(1500) === 2000);
check('11000 W needs 12000 W generator', recommendSize(11000) === 12000);
check('more load raises peak', peakWatts([600, 300, 500], [1800, 300, 500]) > peakWatts([600, 300], [1800, 300]));
check('empty list throws', (() => { try { totalRunning([]); return false; } catch(e){ return true; } })());
check('length mismatch throws', (() => { try { peakWatts([600], [1800, 300]); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
