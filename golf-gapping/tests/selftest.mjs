import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { gap, gapStatus, evenGapSpacing } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b, tol){ return Math.abs(a - b) < (tol || 1e-9); }

check('150 to 138 is a 12 yard gap', gap(150, 138) === 12);
check('equal carries give a zero gap', gap(150, 150) === 0);
check('12 yard gap is ideal', gapStatus(12) === 'ideal');
check('5 yard gap is too tight', gapStatus(5) === 'too tight');
check('20 yard gap flags a missing club', gapStatus(20) === 'gap — consider a club');
check('even spacing 250 to 90 over 12 clubs is ~14.5', near(evenGapSpacing(250, 90, 12), 14.5455, 1e-3));
check('more clubs gives a smaller even gap', evenGapSpacing(250, 90, 14) < evenGapSpacing(250, 90, 12));
check('reversed distances throw', (() => { try { gap(130, 150); return false; } catch(e){ return true; } })());
check('one club even spacing throws', (() => { try { evenGapSpacing(250, 90, 1); return false; } catch(e){ return true; } })());
check('shortest exceeding longest throws', (() => { try { evenGapSpacing(90, 250, 12); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
