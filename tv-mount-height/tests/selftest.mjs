import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { screenHeightIn, centerHeight, bottomEdgeHeight } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-3; }

check('65 in 16:9 screen ≈ 31.86 in tall', near(screenHeightIn(65, 16, 9), 65 * 9 / Math.sqrt(337)));
check('4:3 is taller than 16:9 for same diagonal', screenHeightIn(65, 4, 3) > screenHeightIn(65, 16, 9));
check('bigger diagonal, taller screen', screenHeightIn(75, 16, 9) > screenHeightIn(65, 16, 9));
check('center height equals eye height', centerHeight(42) === 42);
check('bottom = center - half screen', near(bottomEdgeHeight(42, 31.86), 42 - 15.93));
check('bottom edge is below center', bottomEdgeHeight(42, 31.86) < 42);
check('taller screen lowers bottom edge', bottomEdgeHeight(42, 40) < bottomEdgeHeight(42, 30));
check('higher center raises bottom edge', bottomEdgeHeight(48, 31.86) > bottomEdgeHeight(42, 31.86));
check('zero diagonal throws', (() => { try { screenHeightIn(0, 16, 9); return false; } catch(e){ return true; } })());
check('zero eye height throws', (() => { try { centerHeight(0); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
