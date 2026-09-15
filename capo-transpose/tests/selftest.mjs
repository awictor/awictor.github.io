import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { transposeNote, soundingKey, capoFret, noteIndex } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }

check('C up 2 semitones is D', transposeNote('C', 2) === 'D');
check('A up 3 semitones is C', transposeNote('A', 3) === 'C');
check('B up 1 wraps to C', transposeNote('B', 1) === 'C');
check('G shape with capo 2 sounds in A', soundingKey('G', 2) === 'A');
check('no capo keeps the shape key', soundingKey('C', 0) === 'C');
check('play C shape capo 2 to sound in D', capoFret('D', 'C') === 2);
check('same key needs no capo', capoFret('E', 'E') === 0);
check('capo fret wraps within an octave', capoFret('C', 'A') === 3);
check('flats resolve via aliases', noteIndex('Bb') === noteIndex('A#'));
check('unknown note throws', (() => { try { transposeNote('H', 1); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
