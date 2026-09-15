# Overtime

**Overtime pay calculator** — enter your hours and hourly rate to get weekly gross pay broken into regular, overtime (time-and-a-half), and double-time bands. Thresholds and multipliers are configurable. One offline HTML file, no signup, no tracking.

👉 **[Open Overtime](https://awictor.github.io/overtime-pay/)**

> ⚠️ Estimates only — gross before taxes; not payroll or legal advice.

## Features
- Regular / overtime / double-time bands with a per-band pay breakdown
- Adjustable OT threshold (default 40 h) and multiplier (1.5×), optional double-time threshold and multiplier (2×)
- Fractional hours; the bands always sum to your total hours
- Dark mode; 100% client-side

## Why
"45 hours at $20" isn't just 45 × 20 — the hours past 40 pay time-and-a-half, and some places add double-time. Overtime applies the bands correctly and shows the breakdown, offline. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
The pure `weeklyPay` function is covered by headless tests — the at-threshold case, 1.5× overtime, double-time bands, custom thresholds/multipliers, fractional hours, the bands-sum-to-total invariant, and input validation. CI runs them on every push.

## License
MIT © Alex Wictor
