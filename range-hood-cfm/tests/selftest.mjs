import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { widthCfm, btuCfm, recommendCfm } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-6; }

check('30 in cooktop = 250 CFM', near(widthCfm(30), 250));
check('36 in cooktop = 300 CFM', near(widthCfm(36), 300));
check('wider cooktop needs more CFM', widthCfm(48) > widthCfm(30));
check('40000 BTU = 400 CFM', near(btuCfm(40000), 400));
check('60000 BTU = 600 CFM', near(btuCfm(60000), 600));
check('more BTU needs more CFM', btuCfm(60000) > btuCfm(40000));
check('recommend takes the larger rule', near(recommendCfm(30, 40000, false), 400));
check('width rule wins for low BTU', near(recommendCfm(30, 20000, false), 250));
check('island adds 50 percent', near(recommendCfm(30, 40000, true), 600));
check('zero width throws', (() => { try { widthCfm(0); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
