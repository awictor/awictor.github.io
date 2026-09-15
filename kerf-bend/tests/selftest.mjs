import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { arcLength, numberOfKerfs, kerfsForBend } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-3; }

check('90° at r=10 arc ≈ 15.708', near(arcLength(10, 90), 10 * Math.PI / 2));
check('180° at r=10 arc ≈ 31.416', near(arcLength(10, 180), 10 * Math.PI));
check('bigger radius, longer arc', arcLength(20, 90) > arcLength(10, 90));
check('bigger angle, longer arc', arcLength(10, 180) > arcLength(10, 90));
check('15.708 arc at 0.5 spacing = 32 cuts', numberOfKerfs(15.708, 0.5) === 32);
check('tighter spacing needs more cuts', numberOfKerfs(15.708, 0.25) > numberOfKerfs(15.708, 0.5));
check('kerfsForBend(10,90,0.5) = 32', kerfsForBend(10, 90, 0.5) === 32);
check('360° at r=10 ≈ 62.83 arc', near(arcLength(10, 360), 2 * Math.PI * 10));
check('zero radius throws', (() => { try { arcLength(0, 90); return false; } catch(e){ return true; } })());
check('zero spacing throws', (() => { try { numberOfKerfs(15.7, 0); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
