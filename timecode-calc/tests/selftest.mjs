import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { tcToFrames, framesToTc, secondsToTc, addTimecodes } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}

// 1. One second at 24 fps = 24 frames.
check('tcToFrames 1s', tcToFrames('00:00:01:00', 24) === 24);
// 2. One hour at 24 fps = 86400 frames.
check('tcToFrames 1h', tcToFrames('01:00:00:00', 24) === 86400);
// 3. 24 frames at 24 fps = one second.
check('framesToTc 24', framesToTc(24, 24) === '00:00:01:00');
// 4. 25 frames at 24 fps rolls over to 1 sec 1 frame.
check('framesToTc 25', framesToTc(25, 24) === '00:00:01:01');
// 5. Round trip preserves an arbitrary timecode at 30 fps.
check('round trip', framesToTc(tcToFrames('12:34:56:12', 30), 30) === '12:34:56:12');
// 6. One minute at 30 fps = 1800 frames.
check('minute 30fps', tcToFrames('00:01:00:00', 30) === 1800);
// 7. 10 real seconds at 24 fps.
check('secondsToTc', secondsToTc(10, 24) === '00:00:10:00');
// 8. Adding one frame to the last frame of a second rolls the second over.
check('addTimecodes carry', addTimecodes('00:00:00:23', '00:00:00:01', 24) === '00:00:01:00');
// 9. Zero frames is all zeros.
check('zero', framesToTc(0, 30) === '00:00:00:00');
// 10. Frame index at or above the frame rate is rejected.
let guarded = false; try { tcToFrames('00:00:00:24', 24); } catch (e) { guarded = true; }
check('frame guard', guarded);

console.log(passed + ' checks passed.');
