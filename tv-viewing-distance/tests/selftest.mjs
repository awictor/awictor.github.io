import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { optimalDistanceInches, distanceFeet, maxTvSize } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-9; }

check('65 in 4K = 78 in distance', near(optimalDistanceInches(65, 1.2), 78));
check('78 in = 6.5 ft', near(distanceFeet(78), 6.5));
check('bigger TV sits farther', optimalDistanceInches(75, 1.2) > optimalDistanceInches(65, 1.2));
check('1080p sits farther than 4K', optimalDistanceInches(65, 1.6) > optimalDistanceInches(65, 1.2));
check('6.5 ft at 1.2 = 65 in TV', near(maxTvSize(6.5, 1.2), 65));
check('distance/size round trip', near(maxTvSize(distanceFeet(optimalDistanceInches(65, 1.2)), 1.2), 65));
check('closer seat means smaller max TV', maxTvSize(5, 1.2) < maxTvSize(8, 1.2));
check('120 in = 10 ft', near(distanceFeet(120), 10));
check('zero diagonal throws', (() => { try { optimalDistanceInches(0, 1.2); return false; } catch(e){ return true; } })());
check('zero factor throws', (() => { try { maxTvSize(6.5, 0); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
