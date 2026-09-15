# Grade & Slope Calculator

A single-file, offline slope calculator. Convert between **percent grade**, **angle**, and **rise/run** — for roads, trails, ramps, and roofs — plus the ratio form and true slope distance.

**Live:** https://awictor.github.io/grade-slope/

## Features

- **Percent grade** `rise/run × 100`
- **Angle** `arctan(rise/run)` (and grade ⇄ angle both ways)
- **Ratio** form (1:N) — e.g. a 1:12 ADA ramp
- **Slope distance** `√(rise² + run²)`
- Handles downhill (negative) grades
- Dark mode, 100% offline, zero dependencies

## Watch out

A **100% grade is 45°**, not vertical — grade and angle are different things.

## Tests

```
node tests/selftest.mjs
```

10 checks including grade⇄angle inversion, the ADA-ramp example, and the 100%=45° fact. No dependencies.

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
