import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { semitonesBetween, intervalName, intervalQuality } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }

check('C to G is 7 semitones', semitonesBetween('C', 'G') === 7);
check('C to E is 4 semitones', semitonesBetween('C', 'E') === 4);
check('7 semitones is a Perfect 5th', intervalName(7) === 'Perfect 5th');
check('4 semitones is a Major 3rd', intervalName(4) === 'Major 3rd');
check('0 semitones is a Perfect unison', intervalName(0) === 'Perfect unison');
check('12 semitones is an Octave', intervalName(12) === 'Octave');
check('same note is 0 semitones', semitonesBetween('C', 'C') === 0);
check('A to C wraps to a minor 3rd', semitonesBetween('A', 'C') === 3);
check('flats resolve (C to Eb is 3)', semitonesBetween('C', 'Eb') === 3);
check('tritone quality is tritone', intervalQuality(6) === 'tritone');

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
