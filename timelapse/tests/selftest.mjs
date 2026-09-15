import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { framesShot, clipLengthSec, shootDurationForClip } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. One hour at 5 s interval = 720 frames.
check('frames', framesShot(3600, 5) === 720);
// 2. 720 frames at 24 fps = 30 s clip.
check('clip 24', clipLengthSec(720, 24) === 30);
// 3. 720 frames at 30 fps = 24 s clip.
check('clip 30', clipLengthSec(720, 30) === 24);
// 4. shootDurationForClip inverts the chain: 30 s clip at 24 fps, 5 s interval = 3600 s.
check('inverse', shootDurationForClip(30, 24, 5) === 3600);
// 5. More frames make a longer clip.
check('more frames longer', clipLengthSec(1000, 24) > clipLengthSec(720, 24));
// 6. A higher frame rate gives a shorter clip.
check('higher fps shorter', clipLengthSec(720, 30) < clipLengthSec(720, 24));
// 7. A shorter interval captures more frames.
check('shorter interval more', framesShot(3600, 2) > framesShot(3600, 5));
// 8. A non-positive interval is rejected.
let a = false; try { framesShot(3600, 0); } catch (e) { a = true; }
check('interval guard', a);
// 9. A non-positive fps is rejected.
let b = false; try { clipLengthSec(720, 0); } catch (e) { b = true; }
check('fps guard', b);
// 10. A negative duration is rejected.
let c = false; try { framesShot(-1, 5); } catch (e) { c = true; }
check('duration guard', c);

console.log(passed + ' checks passed.');
