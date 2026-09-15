import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { gallonsCollected, litersCollected } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-6; }

check('1000 sqft, 1 in, 100% = 623 gal', near(gallonsCollected(1000, 1, 1), 623));
check('90% efficiency = 560.7 gal', near(gallonsCollected(1000, 1, 0.9), 560.7));
check('more area collects more', gallonsCollected(2000, 1, 1) > gallonsCollected(1000, 1, 1));
check('more rain collects more', gallonsCollected(1000, 2, 1) > gallonsCollected(1000, 1, 1));
check('efficiency scales linearly', near(gallonsCollected(1000, 1, 0.5), 311.5));
check('liters ≈ 2358.9', near(litersCollected(1000, 1, 1), 623 * 3.785411784));
check('half area, double rain is equal', near(gallonsCollected(500, 2, 1), gallonsCollected(1000, 1, 1)));
check('zero area throws', (() => { try { gallonsCollected(0, 1, 1); return false; } catch(e){ return true; } })());
check('zero rainfall throws', (() => { try { gallonsCollected(1000, 0, 1); return false; } catch(e){ return true; } })());
check('efficiency over 1 throws', (() => { try { gallonsCollected(1000, 1, 1.5); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
