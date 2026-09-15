import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { peakHourGallons, meetsRating, tankShortfall } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }

check('two showers = 24 gal', peakHourGallons(2, 0, 0, 0) === 24);
check('one bath = 20 gal', peakHourGallons(0, 1, 0, 0) === 20);
check('more showers more demand', peakHourGallons(3, 0, 0, 0) > peakHourGallons(2, 0, 0, 0));
check('one dishwasher load = 14 gal', peakHourGallons(0, 0, 1, 0) === 14);
check('one clothes load = 30 gal', peakHourGallons(0, 0, 0, 1) === 30);
check('combined draw = 68 gal', peakHourGallons(2, 0, 1, 1) === 68);
check('rating meets demand', meetsRating(70, 68) === true);
check('rating below demand fails', meetsRating(60, 68) === false);
check('shortfall of 60 vs 68 is 8', tankShortfall(60, 68) === 8);
check('negative showers throws', (() => { try { peakHourGallons(-1, 0, 0, 0); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
