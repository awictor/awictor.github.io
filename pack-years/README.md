# PackYears

**Smoking pack-year calculator** — compute pack-years (cigarettes per day ÷ 20 × years smoked) across one or more smoking periods, with the USPSTF 20 pack-year lung-cancer-screening threshold. One offline HTML file, no signup, no tracking.

👉 **[Open PackYears](https://awictor.github.io/pack-years/)**

## Features
- Standard pack-year formula, summed over multiple periods with different rates
- Category (None → Very heavy) and the ≥ 20 pack-year screening flag
- Add/remove periods for people whose habit changed over time
- Dark mode; 100% client-side

## Why
Pack-years are the standard way clinicians quantify smoking history and decide on lung-cancer screening. PackYears computes them exactly — including multi-period histories — offline, so nothing personal leaves the browser. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Not medical advice
Screening eligibility also depends on age and years since quitting. This tool computes pack-years only; talk to a clinician about screening.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`packYears`, `totalPackYears`, `category`, `meetsScreening`) are covered by headless tests — the formula and one-pack baseline, zeros, multi-period sums, category boundaries, the 20 pack-year threshold, fractional rates, and validation. CI runs them on every push.

## License
MIT © Alex Wictor
