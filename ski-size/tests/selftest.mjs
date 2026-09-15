import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { baseLength, weightAdjustment, recommendSki } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }

check('base intermediate 170 = 160', baseLength(170, 'intermediate') === 160);
check('base beginner 170 = 152', baseLength(170, 'beginner') === 152);
check('base expert 180 = 180', baseLength(180, 'expert') === 180);
check('advanced longer than beginner', baseLength(170, 'advanced') > baseLength(170, 'beginner'));
check('taller person longer ski', baseLength(185, 'intermediate') > baseLength(165, 'intermediate'));
check('average weight = no adjustment', weightAdjustment(170, 70) === 0);
check('heavier rider sizes up', recommendSki(170, 'intermediate', 95) > recommendSki(170, 'intermediate', 70));
check('lighter rider sizes down', recommendSki(170, 'intermediate', 45) < recommendSki(170, 'intermediate', 70));
check('unknown skill throws', (() => { try { baseLength(170, 'pro'); return false; } catch(e){ return true; } })());
check('zero height throws', (() => { try { baseLength(0, 'intermediate'); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
