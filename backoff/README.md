# Backoff

**Exponential backoff retry calculator** — plan retry delays from a base, multiplier, and max cap across N attempts, with an optional full-jitter view and the total wait. One offline HTML file, no signup, no tracking.

👉 **[Open Backoff](https://awictor.github.io/backoff/)**

## Features
- Delay per attempt = `min(cap, base × multiplier^attempt)`
- Per-attempt and cumulative delays, plus total (worst-case) wait
- Full-jitter view showing the `0 … delay` random range and average wait
- Dark mode; 100% client-side

## Why
Getting retry timing right prevents thundering-herd outages, but the exponential math and the cap interaction are easy to eyeball wrong. Backoff lays out the exact schedule so you can tune base/multiplier/cap before writing the code. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`backoffDelay`, `schedule`, `totalWait`) are covered by headless tests — base at attempt 0, the doubling sequence, the cap, constant (×1) and fractional multipliers, schedule build, total, non-decreasing invariant, unbounded default, and validation. CI runs them on every push.

## License
MIT © Alex Wictor
