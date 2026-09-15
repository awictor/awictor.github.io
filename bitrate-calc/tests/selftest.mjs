import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { fileSizeToBitrate, bitrateToFileSize, bitrateToDuration, videoBitrateForTarget } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-6) => Math.abs(a - b) < t;

// 1. 10 MB over 100 s = 800 kbps (10 * 8000 / 100).
check('size->bitrate', fileSizeToBitrate(10, 100) === 800);
// 2. Inverse: 800 kbps for 100 s = 10 MB.
check('bitrate->size', bitrateToFileSize(800, 100) === 10);
// 3. 800 kbps to reach 10 MB takes 100 s.
check('bitrate->duration', bitrateToDuration(800, 10) === 100);
// 4. Round trip size -> bitrate -> size.
check('round trip', near(bitrateToFileSize(fileSizeToBitrate(700, 5400), 5400), 700));
// 5. Video bitrate = total minus audio.
check('video bitrate', fileSizeToBitrate(10, 100) - 128 === videoBitrateForTarget(10, 100, 128));
// 6. 700 MB over 90 min ~= 1037.04 kbps.
check('cd movie', near(fileSizeToBitrate(700, 5400), 700 * 8000 / 5400));
// 7. Zero size yields zero bitrate.
check('zero size', fileSizeToBitrate(0, 60) === 0);
// 8. Non-positive duration is rejected.
let d = false; try { fileSizeToBitrate(10, 0); } catch (e) { d = true; }
check('duration guard', d);
// 9. Non-positive bitrate rejected for duration solve.
let b = false; try { bitrateToDuration(0, 10); } catch (e) { b = true; }
check('bitrate guard', b);
// 10. Doubling duration halves required bitrate for same size.
check('scaling', near(fileSizeToBitrate(50, 200), fileSizeToBitrate(50, 100) / 2));

console.log(passed + ' checks passed.');
