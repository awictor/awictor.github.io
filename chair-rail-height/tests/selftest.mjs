import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { chairRailHeight, wainscotHeight, pictureRailDrop } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-9; }

check('96 in wall chair rail = 32', near(chairRailHeight(96), 32));
check('108 in wall chair rail = 36', near(chairRailHeight(108), 36));
check('taller wall higher rail', chairRailHeight(120) > chairRailHeight(96));
check('96 in wall, 1/3 wainscot = 32', near(wainscotHeight(96, 1 / 3), 32));
check('96 in wall, half wainscot = 48', near(wainscotHeight(96, 0.5), 48));
check('higher fraction taller wainscot', wainscotHeight(96, 0.5) > wainscotHeight(96, 1 / 3));
check('default wainscot matches chair rail', near(wainscotHeight(96), chairRailHeight(96)));
check('108 wall picture rail = 96', near(pictureRailDrop(108, 12), 96));
check('fraction of 1 throws', (() => { try { wainscotHeight(96, 1); return false; } catch(e){ return true; } })());
check('zero wall throws', (() => { try { chairRailHeight(0); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
