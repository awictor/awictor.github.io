# WaistHeight

**Waist-to-height & waist-to-hip ratio** — enter your waist, height, and (optionally) hip to get WHtR and WHR with risk categories. Any consistent units. One offline HTML file, no signup, no tracking.

👉 **[Open WaistHeight](https://awictor.github.io/waist-height/)**

## Features
- Waist-to-height ratio (WHtR) with category (under 0.5 = healthy)
- Waist-to-hip ratio (WHR) with sex-specific risk levels
- Unit-agnostic — use cm or inches, the ratios are unitless
- Color-coded results; dark mode; remembers your inputs
- 100% client-side; works offline

## Why
Waist-based ratios predict health risk better than BMI alone, because they capture central (abdominal) fat. WaistHeight computes both standard ratios instantly and privately. Estimates only, not medical advice. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`whtr`, `whtrCategory`, `whr`, `whrRisk`) are covered by headless regression tests: ratio math, category/risk boundaries per sex, unit independence, and null handling; CI runs them on every push.

## License
MIT © Alex Wictor
