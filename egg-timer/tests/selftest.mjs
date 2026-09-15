import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');

const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
const js = scripts.sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { BASE, boilingPointC, sizeMultiplier, startMultiplier, altitudeMultiplier, boilTimeMinutes } = globalThis.__t;

let passed = 0;
function check(name, cond) { if (cond) { passed++; console.log('ok - ' + name); } else { console.log('FAIL - ' + name); } }
function near(a, b, tol) { return Math.abs(a - b) <= (tol || 1e-9); }

// Boiling point drops ~1C per 285 m
check('water boils at 100C at sea level', near(boilingPointC(0), 100));
check('boiling point drops with altitude', near(boilingPointC(2850), 90));
// Baseline: large egg, fridge, sea level = the base minutes
check('hard baseline is 12 minutes', near(boilTimeMinutes('hard', 'L', 'fridge', 0), 12));
check('soft baseline is 6 minutes', near(boilTimeMinutes('soft', 'L', 'fridge', 0), 6));
// Doneness ordering
check('hard takes longer than soft', boilTimeMinutes('hard', 'L', 'fridge', 0) > boilTimeMinutes('soft', 'L', 'fridge', 0));
// Egg size scales time
check('large size multiplier is 1', near(sizeMultiplier('L'), 1));
check('bigger eggs cook longer than smaller', sizeMultiplier('J') > sizeMultiplier('S'));
// Room-temp eggs cook faster than fridge-cold
check('room start reduces time', boilTimeMinutes('medium', 'L', 'room', 0) < boilTimeMinutes('medium', 'L', 'fridge', 0));
// Altitude lengthens cook time; multiplier is 1 at sea level
check('altitude multiplier is 1 at sea level', near(altitudeMultiplier(0), 1));
check('higher altitude needs more time', boilTimeMinutes('hard', 'L', 'fridge', 3000) > boilTimeMinutes('hard', 'L', 'fridge', 0));

console.log(passed + ' checks passed.');
if (passed !== 10) process.exit(1);
