# CAGR

**Compound annual growth rate calculator** — enter a start value, end value, and number of years to get the CAGR, plus total growth and doubling time. A second panel projects a future value at any rate. One offline HTML file, no signup, no tracking.

👉 **[Open CAGR](https://awictor.github.io/cagr-calc/)**

> ⚠️ Estimates only — not financial advice.

## Features
- CAGR from start/end/years, with total growth % and doubling time
- Future-value projection at a fixed annual rate
- Handles gains, flat, and losses; dark mode; 100% client-side

## Why
"It grew from $10k to $25k in 7 years" doesn't tell you the annual rate — CAGR does, and it's the number you compare investments with. This tool computes it exactly and shows how long money takes to double at that rate. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`cagr`, `futureValue`, `yearsToTarget`, `doublingTime`) are covered by headless tests — the doubling case, flat and negative growth, future-value round-trips, the rule-of-72 sanity check, and rejection of invalid inputs. CI runs them on every push.

## License
MIT © Alex Wictor
