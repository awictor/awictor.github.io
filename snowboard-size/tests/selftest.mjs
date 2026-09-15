import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { toCm, boardLength, chinHeight, noseHeight } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-9; }

check('180 cm all-mountain ≈ 158.4 cm', near(boardLength(180, 0.88), 158.4));
check('freeride longer than freestyle', boardLength(180, 0.90) > boardLength(180, 0.86));
check('taller rider gets longer board', boardLength(190, 0.88) > boardLength(170, 0.88));
check('shorter rider gets shorter board', boardLength(160, 0.88) < boardLength(180, 0.88));
check('chin height of 180 = 160', chinHeight(180) === 160);
check('nose height of 180 = 165', noseHeight(180) === 165);
check('nose is higher than chin', noseHeight(180) > chinHeight(180));
check('70 inches converts to 177.8 cm', near(toCm(70, 'in'), 177.8));
check('height <= 0 throws', (() => { try { boardLength(0, 0.88); return false; } catch(e){ return true; } })());
check('style factor over 1 throws', (() => { try { boardLength(180, 1.2); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
