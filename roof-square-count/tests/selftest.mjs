import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { pitchMultiplier, roofArea, squares, bundles } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-6; }

check('flat roof multiplier = 1', near(pitchMultiplier(0), 1));
check('5:12 pitch multiplier = 13/12', near(pitchMultiplier(5), 13 / 12));
check('steeper pitch bigger multiplier', pitchMultiplier(9) > pitchMultiplier(5));
check('2000 sqft flat = 2000 roof area', near(roofArea(2000, 0), 2000));
check('2000 sqft at 5:12 ~ 2166.7', near(roofArea(2000, 5), 2000 * 13 / 12));
check('2000 sqft roof, no waste = 20 squares', near(squares(2000, 0), 20));
check('2000 sqft roof, 10% waste = 22 squares', near(squares(2000, 10), 22));
check('20 squares = 60 bundles', bundles(20) === 60);
check('zero footprint throws', (() => { try { roofArea(0, 5); return false; } catch(e){ return true; } })());
check('negative rise throws', (() => { try { pitchMultiplier(-1); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
