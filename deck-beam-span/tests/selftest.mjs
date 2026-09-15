import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { joistSpanColumn, maxBeamSpan, recommendBeam } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-9; }

check('9 ft joist span rounds to 10 ft column', joistSpanColumn(9) === 10);
check('exactly 8 ft uses 8 ft column', joistSpanColumn(8) === 8);
check('6 ft joist span uses 6 ft column', joistSpanColumn(6) === 6);
check('(2) 2x10 at 10 ft joist span spans 8.08 ft', near(maxBeamSpan('2-2x10', 10), 8.08));
check('bigger beam spans farther', maxBeamSpan('3-2x12', 10) > maxBeamSpan('2-2x6', 10));
check('longer joist span reduces beam span', maxBeamSpan('2-2x10', 16) < maxBeamSpan('2-2x10', 6));
check('recommend a beam for 8 ft span at 10 ft joists', maxBeamSpan(recommendBeam(10, 8), 10) >= 8);
check('huge required span returns null', recommendBeam(10, 20) === null);
check('joist span over 18 ft throws', (() => { try { joistSpanColumn(19); return false; } catch(e){ return true; } })());
check('unknown beam size throws', (() => { try { maxBeamSpan('4-2x14', 10); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
