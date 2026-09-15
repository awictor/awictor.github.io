import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { grossTrailerWeight, tongueWeight, withinRating, towMargin } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-9; }

check('3000 + 1500 cargo = 4500 GTW', grossTrailerWeight(3000, 1500) === 4500);
check('5000 GTW at 12% = 600 lb tongue', near(tongueWeight(5000, 12), 600));
check('5000 GTW at 15% = 750 lb tongue', near(tongueWeight(5000, 15), 750));
check('more cargo raises GTW', grossTrailerWeight(3000, 2500) > grossTrailerWeight(3000, 1500));
check('4500 within 7000 rating', withinRating(4500, 7000) === true);
check('8000 over 7000 rating', withinRating(8000, 7000) === false);
check('margin 7000 - 4500 = 2500', towMargin(7000, 4500) === 2500);
check('over rating gives negative margin', towMargin(7000, 8000) === -1000);
check('zero empty weight throws', (() => { try { grossTrailerWeight(0, 1500); return false; } catch(e){ return true; } })());
check('zero tongue percent throws', (() => { try { tongueWeight(5000, 0); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
