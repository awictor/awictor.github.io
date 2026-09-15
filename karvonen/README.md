# Karvonen

**Heart-rate training zone calculator** — enter your age (or measured max HR) and resting heart rate to get your five training zones in real BPM, using the Karvonen heart-rate-reserve method. One offline HTML file, no signup, no tracking.

👉 **[Open Karvonen](https://awictor.github.io/karvonen/)**

> ⚠️ Estimates only — not medical advice.

## Features
- Karvonen formula: target = (maxHR − restHR) × intensity + restHR
- Five zones (Recovery → Maximum) at 50–100% heart-rate reserve
- Auto max HR from age (220 − age) or use your own measured value
- Dark mode; 100% client-side

## Why
Percent-of-max zones ignore your fitness; the Karvonen method folds in your resting heart rate for more personal targets. Karvonen computes all five zones in BPM instantly, offline. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`hrMax`, `targetHr`, `zones`) are covered by headless tests — the 220−age max, the Karvonen formula at 0/0.7/1 intensity, resting-HR sensitivity, five contiguous zones, zone-5 top = max HR, and input validation. CI runs them on every push.

## License
MIT © Alex Wictor
