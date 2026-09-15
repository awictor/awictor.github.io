import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { combinedCfm, recommendedCompressor } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-9; }

check('4 + 5 CFM tools = 9 CFM', near(combinedCfm([4, 5]), 9));
check('three 2-CFM tools = 6 CFM', near(combinedCfm([2, 2, 2]), 6));
check('4 CFM at 1.5x = 6 CFM compressor', near(recommendedCompressor(4, 1.5), 6));
check('10 CFM at 1.5x = 15 CFM', near(recommendedCompressor(10, 1.5), 15));
check('8 CFM at 1.5x = 12 CFM', near(recommendedCompressor(8, 1.5), 12));
check('more tools raise demand', combinedCfm([4, 5, 6]) > combinedCfm([4, 5]));
check('higher safety raises recommendation', recommendedCompressor(10, 2) > recommendedCompressor(10, 1.5));
check('single tool passes through', near(combinedCfm([4]), 4));
check('empty list throws', (() => { try { combinedCfm([]); return false; } catch(e){ return true; } })());
check('safety under 1 throws', (() => { try { recommendedCompressor(10, 0.5); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
