# CvssCalc

**CVSS v3.1 base score calculator** — pick the eight base metrics and get the base score, severity rating, and a copy-ready vector string, live. One offline HTML file, no signup, no tracking.

👉 **[Open CvssCalc](https://awictor.github.io/cvss-calc/)**

## Features
- Official CVSS v3.1 base-score equations (FIRST.org), including the scope-changed impact formula and the CVSS "roundup"
- Severity rating: None / Low / Medium / High / Critical
- Live `CVSS:3.1/...` vector string with one-click copy
- Vector parsing (paste a vector to reproduce a score); dark mode; 100% client-side

## Why
Security teams score vulnerabilities with CVSS constantly, and most calculators are online. CvssCalc runs the exact v3.1 equations in your browser so scoring works offline and privately. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Scope
Base metrics only — temporal and environmental scores are intentionally out of scope to keep the tool focused.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`roundup`, `baseScore`, `severityRating`, `toVector`, `parseVector`) are covered by headless tests against published reference scores (9.8, 10.0, 5.3, 6.2, 0.0), the roundup rule, severity bands, and vector round-tripping. CI runs them on every push.

## License
MIT © Alex Wictor
