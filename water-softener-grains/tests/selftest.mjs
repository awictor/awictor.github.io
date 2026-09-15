import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { ppmToGpg, adjustedHardness, dailyGrains, softenerCapacity } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-6; }

check('171 ppm = 10 gpg', near(ppmToGpg(171), 10));
check('17.1 ppm = 1 gpg', near(ppmToGpg(17.1), 1));
check('4 people, 75 gal, 10 gpg = 3000/day', dailyGrains(4, 75, 10) === 3000);
check('more people means more daily load', dailyGrains(5, 75, 10) > dailyGrains(4, 75, 10));
check('harder water means more daily load', dailyGrains(4, 75, 15) > dailyGrains(4, 75, 10));
check('3000/day over 7 days = 21000', softenerCapacity(3000, 7) === 21000);
check('more days means bigger capacity', softenerCapacity(3000, 10) > softenerCapacity(3000, 7));
check('2 ppm iron adds 10 gpg', adjustedHardness(10, 2) === 20);
check('iron increases effective hardness', adjustedHardness(10, 3) > adjustedHardness(10, 0));
check('zero people throws', (() => { try { dailyGrains(0, 75, 10); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
