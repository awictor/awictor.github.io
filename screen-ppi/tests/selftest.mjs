import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { diagonalPixels, ppi, dotPitchMm, totalPixels } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 0.1; }

check('3-4-5 triangle: diagonal of 3x4 = 5', near(diagonalPixels(3, 4), 5));
check('1080p at 21.5 in ≈ 102.5 PPI', near(ppi(1920, 1080, 21.5), 102.46));
check('4K at 27 in ≈ 163.2 PPI', near(ppi(3840, 2160, 27), 163.18));
check('100 PPI = 0.254 mm dot pitch', near(dotPitchMm(100), 0.254));
check('higher PPI means smaller dot pitch', dotPitchMm(200) < dotPitchMm(100));
check('same resolution, bigger screen = lower PPI', ppi(1920, 1080, 32) < ppi(1920, 1080, 24));
check('more pixels at same size = higher PPI', ppi(3840, 2160, 27) > ppi(1920, 1080, 27));
check('1080p diagonal ≈ 2202.9 px', near(diagonalPixels(1920, 1080), 2202.91));
check('4K total pixels = 8,294,400', totalPixels(3840, 2160) === 8294400);
check('zero diagonal throws', (() => { try { ppi(1920, 1080, 0); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
