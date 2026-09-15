import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { grossWpm, netWpm, cpm, accuracy, countCorrect } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-9; }

check('250 chars in 60s = 50 gross WPM', near(grossWpm(250, 60), 50));
check('250 chars in 60s = 250 CPM', near(cpm(250, 60), 250));
check('5 errors drops net WPM to 45', near(netWpm(250, 5, 60), 45));
check('net WPM floors at 0', netWpm(50, 100, 60) === 0);
check('95 of 100 correct = 95% accuracy', near(accuracy(95, 100), 95));
check('perfect accuracy is 100%', near(accuracy(100, 100), 100));
check('typing faster raises WPM', grossWpm(250, 30) > grossWpm(250, 60));
check('more errors lowers net WPM', netWpm(250, 10, 60) < netWpm(250, 5, 60));
check('countCorrect matches prefix', countCorrect('hello', 'help') === 3);
check('zero seconds throws', (() => { try { grossWpm(250, 0); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
