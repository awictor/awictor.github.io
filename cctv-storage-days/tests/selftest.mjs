import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { gbPerDay, storageDays } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-6; }

check('1 cam, 4 Mbps, 24h = 43.2 GB/day', near(gbPerDay(1, 4, 24), 43.2));
check('4 cams, 4 Mbps, 24h = 172.8 GB/day', near(gbPerDay(4, 4, 24), 172.8));
check('more cameras more storage', gbPerDay(8, 4, 24) > gbPerDay(4, 4, 24));
check('higher bitrate more storage', gbPerDay(4, 8, 24) > gbPerDay(4, 4, 24));
check('24h more than 12h', gbPerDay(1, 4, 24) > gbPerDay(1, 4, 12));
check('4 TB, 4 cams, 4 Mbps, 24h ~ 23.15 days', near(storageDays(4, 4, 4, 24), 4000 / 172.8));
check('bigger drive more days', storageDays(8, 4, 4, 24) > storageDays(4, 4, 4, 24));
check('more cameras fewer days', storageDays(4, 8, 4, 24) < storageDays(4, 4, 4, 24));
check('zero cameras throws', (() => { try { gbPerDay(0, 4, 24); return false; } catch(e){ return true; } })());
check('zero drive throws', (() => { try { storageDays(0, 4, 4, 24); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
