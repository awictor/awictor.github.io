import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { abilityModifier, proficiencyBonus, formatSigned } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }

check('16 gives +3 modifier', abilityModifier(16) === 3);
check('10 gives +0 modifier', abilityModifier(10) === 0);
check('8 gives -1 modifier', abilityModifier(8) === -1);
check('20 gives +5 modifier', abilityModifier(20) === 5);
check('level 5 proficiency is 3', proficiencyBonus(5) === 3);
check('level 1 proficiency is 2', proficiencyBonus(1) === 2);
check('level 20 proficiency is 6', proficiencyBonus(20) === 6);
check('signed formatting adds a plus', formatSigned(3) === '+3' && formatSigned(-1) === '-1');
check('score below 1 throws', (() => { try { abilityModifier(0); return false; } catch(e){ return true; } })());
check('level above 20 throws', (() => { try { proficiencyBonus(21); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
