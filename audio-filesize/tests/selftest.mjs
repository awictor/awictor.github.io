import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { bytesPerSecond, fileSizeBytes, bitrateKbps, formatBytes } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-6; }

check('CD stereo is 176400 bytes/sec', bytesPerSecond(44100, 16, 2) === 176400);
check('one minute of CD stereo is ~10.09 MB', near(fileSizeBytes(44100, 16, 2, 60), 10584000));
check('CD stereo bitrate is 1411.2 kbps', near(bitrateKbps(44100, 16, 2), 1411.2));
check('mono is half of stereo', bytesPerSecond(44100, 16, 1) === bytesPerSecond(44100, 16, 2) / 2);
check('24-bit is larger than 16-bit', bytesPerSecond(44100, 24, 2) > bytesPerSecond(44100, 16, 2));
check('higher sample rate is larger', bytesPerSecond(96000, 16, 2) > bytesPerSecond(44100, 16, 2));
check('longer duration is larger', fileSizeBytes(44100, 16, 2, 120) > fileSizeBytes(44100, 16, 2, 60));
check('1024 bytes formats as 1 KB', formatBytes(1024) === '1 KB');
check('1048576 bytes formats as 1 MB', formatBytes(1048576) === '1 MB');
check('zero sample rate throws', (() => { try { bytesPerSecond(0, 16, 2); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
