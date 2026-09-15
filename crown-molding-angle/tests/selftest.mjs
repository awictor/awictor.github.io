import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { miterAngle, bevelAngle } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 0.1; }

check('45 spring, 90 corner miter ≈ 35.26', near(miterAngle(45, 90), 35.264));
check('45 spring, 90 corner bevel ≈ 30', near(bevelAngle(45, 90), 30));
check('38 spring, 90 corner miter ≈ 31.6', near(miterAngle(38, 90), 31.6));
check('38 spring, 90 corner bevel ≈ 33.86', near(bevelAngle(38, 90), 33.86));
check('tighter corner lowers miter', miterAngle(45, 60) < miterAngle(45, 90));
check('tighter corner raises bevel', bevelAngle(45, 60) > bevelAngle(45, 90));
check('45 spring, 60 corner miter ≈ 22.2', near(miterAngle(45, 60), 22.2));
check('45 spring, 60 corner bevel ≈ 37.76', near(bevelAngle(45, 60), 37.76));
check('zero spring throws', (() => { try { miterAngle(0, 90); return false; } catch(e){ return true; } })());
check('zero corner throws', (() => { try { bevelAngle(45, 0); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
