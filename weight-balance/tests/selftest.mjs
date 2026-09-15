import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { totalWeight, totalMoment, centerOfGravity, withinCG } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-9; }

const two = [{ weight: 1000, arm: 36 }, { weight: 200, arm: 48 }];

check('total weight sums loads', totalWeight(two) === 1200);
check('total moment sums weight times arm', totalMoment(two) === 45600);
check('CG is moment over weight', near(centerOfGravity(two), 38));
check('equal arms give that arm as CG', near(centerOfGravity([{ weight: 100, arm: 40 }, { weight: 50, arm: 40 }]), 40));
check('adding aft weight moves CG aft', centerOfGravity(two.concat({ weight: 300, arm: 90 })) > centerOfGravity(two));
check('adding forward weight moves CG forward', centerOfGravity(two.concat({ weight: 300, arm: 20 })) < centerOfGravity(two));
check('CG inside limits passes', withinCG(38, 35, 47) === true);
check('CG aft of limit fails', withinCG(48, 35, 47) === false);
check('CG forward of limit fails', withinCG(34, 35, 47) === false);
check('zero total weight throws', (() => { try { centerOfGravity([{ weight: 0, arm: 40 }]); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
