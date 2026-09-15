import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { requiredNfaSqIn, intakeNfa, exhaustNfa } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-9; }

check('1500 sqft at 1/300 = 720 sq in', near(requiredNfaSqIn(1500, 300), 720));
check('1500 sqft at 1/150 = 1440 sq in', near(requiredNfaSqIn(1500, 150), 1440));
check('bigger attic more NFA', requiredNfaSqIn(3000, 300) > requiredNfaSqIn(1500, 300));
check('1/150 needs more than 1/300', requiredNfaSqIn(1500, 150) > requiredNfaSqIn(1500, 300));
check('intake of 720 = 360', near(intakeNfa(720), 360));
check('exhaust of 720 = 360', near(exhaustNfa(720), 360));
check('intake plus exhaust equals total', near(intakeNfa(720) + exhaustNfa(720), 720));
check('default ratio is 300', near(requiredNfaSqIn(1500), requiredNfaSqIn(1500, 300)));
check('zero attic throws', (() => { try { requiredNfaSqIn(0, 300); return false; } catch(e){ return true; } })());
check('zero ratio throws', (() => { try { requiredNfaSqIn(1500, 0); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
