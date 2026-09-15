import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { frameTimeMs, fpsFromFrameTime, framesInDuration } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. 60 FPS is 16.667 ms per frame.
check('60fps', near(frameTimeMs(60), 1000 / 60));
// 2. 30 FPS is 33.333 ms.
check('30fps', near(frameTimeMs(30), 1000 / 30));
// 3. 120 FPS is 8.333 ms.
check('120fps', near(frameTimeMs(120), 1000 / 120));
// 4. Frame time inverts back to FPS.
check('roundtrip', near(fpsFromFrameTime(frameTimeMs(60)), 60));
// 5. Higher FPS means a lower frame time.
check('higher lower', frameTimeMs(120) < frameTimeMs(60));
// 6. 60 FPS over 10 s is 600 frames.
check('frames', framesInDuration(60, 10) === 600);
// 7. Zero duration is zero frames.
check('zero dur', framesInDuration(60, 0) === 0);
// 8. A non-positive FPS is rejected.
let a = false; try { frameTimeMs(0); } catch (e) { a = true; }
check('fps guard', a);
// 9. A non-positive frame time is rejected.
let b = false; try { fpsFromFrameTime(0); } catch (e) { b = true; }
check('ms guard', b);
// 10. A negative duration is rejected.
let c = false; try { framesInDuration(60, -1); } catch (e) { c = true; }
check('dur guard', c);

console.log(passed + ' checks passed.');
