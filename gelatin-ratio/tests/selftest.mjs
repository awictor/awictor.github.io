import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { gramsNeeded, sheetsFromGrams, envelopesFromGrams } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-6; }

check('500 ml standard = 10 g', near(gramsNeeded(500, 'standard'), 10));
check('500 ml soft = 7.5 g', near(gramsNeeded(500, 'soft'), 7.5));
check('firmer set needs more gelatin', gramsNeeded(500, 'firm') > gramsNeeded(500, 'standard'));
check('more volume needs more gelatin', gramsNeeded(1000, 'standard') > gramsNeeded(500, 'standard'));
check('1.7 g = 1 sheet', near(sheetsFromGrams(1.7), 1));
check('6.8 g = 4 sheets', near(sheetsFromGrams(6.8), 4));
check('7 g = 1 envelope', near(envelopesFromGrams(7), 1));
check('14 g = 2 envelopes', near(envelopesFromGrams(14), 2));
check('unknown firmness throws', (() => { try { gramsNeeded(500, 'jiggly'); return false; } catch(e){ return true; } })());
check('zero volume throws', (() => { try { gramsNeeded(0, 'standard'); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
