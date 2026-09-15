import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { tippetDiameterInches, tippetDiameterMm, approxPoundTest, xFromDiameterInches } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b, tol){ return Math.abs(a - b) < (tol || 1e-9); }

check('0X is 0.011 inch', near(tippetDiameterInches(0), 0.011));
check('5X is 0.006 inch', near(tippetDiameterInches(5), 0.006));
check('7X is 0.004 inch', near(tippetDiameterInches(7), 0.004));
check('higher X is thinner', tippetDiameterInches(6) < tippetDiameterInches(3));
check('0X in mm is ~0.2794', near(tippetDiameterMm(0), 0.2794, 1e-4));
check('3X is about 8 lb (rule of 11)', approxPoundTest(3) === 8);
check('5X is about 6 lb', approxPoundTest(5) === 6);
check('0.006 inch is 5X', xFromDiameterInches(0.006) === 5);
check('0.011 inch is 0X', xFromDiameterInches(0.011) === 0);
check('X out of range throws', (() => { try { tippetDiameterInches(12); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
