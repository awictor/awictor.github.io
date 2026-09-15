import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');

const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
const js = scripts.sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { TEA, steepTempC, strengthFactor, steepTimeSeconds, infusionTimeSeconds, celsiusToF } = globalThis.__t;

let passed = 0;
function check(name, cond) { if (cond) { passed++; console.log('ok - ' + name); } else { console.log('FAIL - ' + name); } }
function near(a, b, tol) { return Math.abs(a - b) <= (tol || 1e-9); }

// Delicate teas want cooler water than robust ones
check('black is hotter than green', steepTempC('black') > steepTempC('green'));
check('herbal steeps at boiling', steepTempC('herbal') === 100);
// Strength stretches or shortens the steep
check('medium strength factor is 1', near(strengthFactor('medium'), 1));
check('strong steeps longer than light', steepTimeSeconds('black', 'strong') > steepTimeSeconds('black', 'light'));
check('green strong = base x 1.35', near(steepTimeSeconds('green', 'strong'), TEA.green.base * 1.35));
// Celsius to Fahrenheit
check('100C is 212F', near(celsiusToF(100), 212));
check('0C is 32F', near(celsiusToF(0), 32));
// Gongfu infusions get longer each round, and start shorter than a western steep
check('later infusions steep longer', infusionTimeSeconds('oolong', 3, 'medium') > infusionTimeSeconds('oolong', 1, 'medium'));
check('first infusion is shorter than western steep', infusionTimeSeconds('black', 1, 'medium') < steepTimeSeconds('black', 'medium'));
// Unknown type falls back to sensible defaults
check('unknown tea uses a default temp', steepTempC('rooibos') === 90);

console.log(passed + ' checks passed.');
if (passed !== 10) process.exit(1);
