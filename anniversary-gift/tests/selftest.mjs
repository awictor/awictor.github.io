import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { traditionalGift, modernGift, isListed, nextMilestone } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }

check('year 1 traditional is Paper', traditionalGift(1) === 'Paper');
check('year 1 modern is Clocks', modernGift(1) === 'Clocks');
check('year 5 traditional is Wood', traditionalGift(5) === 'Wood');
check('year 25 traditional is Silver', traditionalGift(25) === 'Silver');
check('year 50 traditional is Gold', traditionalGift(50) === 'Gold');
check('year 10 modern is Diamond jewelry', modernGift(10) === 'Diamond jewelry');
check('year 15 is a listed year', isListed(15) === true);
check('year 16 is not listed', isListed(16) === false && traditionalGift(16) === null);
check('next milestone after 16 is 20', nextMilestone(16) === 20);
check('zero year throws', (() => { try { traditionalGift(0); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
