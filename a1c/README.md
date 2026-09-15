# A1C

**A1C ⇄ average glucose converter** — convert between A1C percentage and estimated average glucose (eAG) in mg/dL and mmol/L, and see the ADA diabetes category. Enter any of the three; the others follow. One offline HTML file, no signup, no tracking.

👉 **[Open A1C](https://awictor.github.io/a1c/)**

## Features
- Convert from A1C %, eAG mg/dL, or eAG mmol/L
- Shows all three plus the ADA category (Normal / Prediabetes / Diabetes)
- Uses the ADAG study formula (eAG = 28.7 × A1C − 46.7 mg/dL)
- Dark mode, remembers your input
- 100% client-side; works offline

## Why
Lab reports give A1C, glucometers give mg/dL or mmol/L, and comparing them takes a formula most people don't have handy. A1C bridges all three instantly. Not medical advice. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`a1cToEagMgdl`, `a1cToEagMmol`, `eagMgdlToA1c`, unit conversions, `a1cCategory`, `convert`) are covered by headless regression tests against the ADA table (6% ≈ 126, 7% ≈ 154 mg/dL), inverse round-trips, and category cutoffs; CI runs them on every push.

## License
MIT © Alex Wictor
