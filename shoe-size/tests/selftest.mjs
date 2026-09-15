import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { usMenToUk, usMenToEu, usMenToCm, usWomenToUk, usWomenToEu, usWomenToCm } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-9; }

check("men's US 9 = EU 42", usMenToEu(9) === 42);
check("men's US 9 = UK 8", usMenToUk(9) === 8);
check("men's US 9 = 27 cm", near(usMenToCm(9), 27));
check("women's US 8 = EU 38.5", usWomenToEu(8) === 38.5);
check("women's US 8 = UK 6", usWomenToUk(8) === 6);
check("women's US 8 = 24 cm", near(usWomenToCm(8), 24));
check("EU sizing is monotonic", usMenToEu(10) > usMenToEu(9));
check("cm grows with size", usWomenToCm(9) > usWomenToCm(8));
check("men's EU larger than women's at same US number", usMenToEu(8) > usWomenToEu(8));
check("non-positive size throws", (() => { try { usMenToCm(0); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
