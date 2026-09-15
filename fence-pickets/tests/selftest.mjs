import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { picketCount, postCount, railLinearFt } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }

check('100 ft, 5.5 in + 0.5 gap = 200 pickets', picketCount(100, 5.5, 0.5) === 200);
check('100 ft, 3.5 in + 0.5 gap = 300 pickets', picketCount(100, 3.5, 0.5) === 300);
check('wider picket needs fewer', picketCount(100, 7.25, 0.5) < picketCount(100, 5.5, 0.5));
check('bigger gap needs fewer', picketCount(100, 5.5, 1.5) < picketCount(100, 5.5, 0.5));
check('100 ft at 8 ft spacing = 14 posts', postCount(100, 8) === 14);
check('80 ft at 8 ft spacing = 11 posts', postCount(80, 8) === 11);
check('100 ft, 3 rails = 300 linear ft', railLinearFt(100, 3) === 300);
check('longer fence needs more pickets', picketCount(200, 5.5, 0.5) > picketCount(100, 5.5, 0.5));
check('zero length throws', (() => { try { picketCount(0, 5.5, 0.5); return false; } catch(e){ return true; } })());
check('zero post spacing throws', (() => { try { postCount(100, 0); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
