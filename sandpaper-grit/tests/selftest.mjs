import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { GRIT_SEQUENCE, micronForGrit, nextGrit, gritUse } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }

check('120 grit is 116 micron', micronForGrit(120) === 116);
check('220 grit is 66 micron', micronForGrit(220) === 66);
check('finer grit has smaller micron', micronForGrit(400) < micronForGrit(120));
check('next grit after 120 is 150', nextGrit(120) === 150);
check('next grit after 220 is 320', nextGrit(220) === 320);
check('micron decreases monotonically', (() => { for(let i = 1; i < GRIT_SEQUENCE.length; i++){ if(micronForGrit(GRIT_SEQUENCE[i]) >= micronForGrit(GRIT_SEQUENCE[i - 1])) return false; } return true; })());
check('40 grit is rough shaping', gritUse(40) === 'rough shaping / stock removal');
check('320 grit is between coats', gritUse(320) === 'between coats / polishing');
check('unknown grit throws', (() => { try { micronForGrit(250); return false; } catch(e){ return true; } })());
check('next grit past finest throws', (() => { try { nextGrit(2000); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
