import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { sapFor, lyeAmount, waterAmount } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b, tol){ return Math.abs(a - b) < (tol || 1e-9); }

check('olive SAP is 0.134', near(sapFor('olive'), 0.134));
check('coconut SAP is 0.178', near(sapFor('coconut'), 0.178));
check('1000 g olive at 0% superfat needs 134 g lye', near(lyeAmount(1000, 0.134, 0), 134));
check('5% superfat reduces lye', near(lyeAmount(1000, 0.134, 5), 127.3));
check('100% superfat leaves no lye', near(lyeAmount(1000, 0.134, 100), 0));
check('more oil means more lye', lyeAmount(2000, 0.134, 5) > lyeAmount(1000, 0.134, 5));
check('higher SAP means more lye', lyeAmount(1000, 0.178, 0) > lyeAmount(1000, 0.134, 0));
check('water is lye times ratio', near(waterAmount(134, 2), 268));
check('unknown oil throws', (() => { try { sapFor('whaleOil'); return false; } catch(e){ return true; } })());
check('superfat over 100 throws', (() => { try { lyeAmount(1000, 0.134, 120); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
