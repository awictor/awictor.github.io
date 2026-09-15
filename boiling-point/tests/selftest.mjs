import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { ftToM, cToF, boilingPointC, boilingPointF } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 0.1) => Math.abs(a - b) < t;

// 1. At sea level water boils at 100 C.
check('sea level', boilingPointC(0) === 100);
// 2. Denver (~1609 m) is about 94.5 C.
check('denver', near(boilingPointC(1609), 94.5));
// 3. A 3000 m peak is about 89.8 C.
check('peak', near(boilingPointC(3000), 89.8));
// 4. Higher altitude means a lower boiling point.
check('higher lower', boilingPointC(3000) < boilingPointC(1609));
// 5. Sea level in Fahrenheit is 212.
check('fahrenheit', boilingPointF(0) === 212);
// 6. Feet to metres conversion.
check('ft to m', near(ftToM(1000), 304.8));
// 7. Feet path matches metres path.
check('unit agree', boilingPointC(ftToM(0)) === 100);
// 8. Celsius/Fahrenheit conversion anchors.
check('convert', cToF(100) === 212 && cToF(0) === 32);
// 9. Below sea level boils hotter than 100.
check('below sea', boilingPointC(-400) > 100);
// 10. An implausibly high altitude is rejected.
let e = false; try { boilingPointC(100000); } catch (err) { e = true; }
check('altitude guard', e);

console.log(passed + ' checks passed.');
