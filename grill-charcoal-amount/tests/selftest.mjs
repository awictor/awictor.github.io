import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { grateArea, briquettes, briquettesForGrill } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-2; }

check('22.5 in grate ~ 397.6 sq in', near(grateArea(22.5), Math.PI * 11.25 * 11.25));
check('18 in grate ~ 254.5 sq in', near(grateArea(18), Math.PI * 81));
check('bigger grill more area', grateArea(26) > grateArea(22.5));
check('22.5 in high heat = 100 briquettes', briquettesForGrill(22.5, 'high') === 100);
check('22.5 in medium heat = 60 briquettes', briquettesForGrill(22.5, 'medium') === 60);
check('22.5 in low heat = 32 briquettes', briquettesForGrill(22.5, 'low') === 32);
check('higher heat needs more briquettes', briquettes(400, 'high') > briquettes(400, 'medium'));
check('briquettes rounds up', briquettes(100, 'low') === 8);
check('unknown heat throws', (() => { try { briquettes(400, 'blazing'); return false; } catch(e){ return true; } })());
check('zero diameter throws', (() => { try { grateArea(0); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
