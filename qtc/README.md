# QTc

**Corrected QT interval calculator** — enter the QT interval and heart rate to get the QTc by the Bazett, Fridericia, Framingham, and Hodges formulas, with a sex-aware prolongation category. One offline HTML file, no signup, no tracking.

👉 **[Open QTc](https://awictor.github.io/qtc/)**

## Features
- Four correction formulas side by side (Bazett headline + table)
- Sex-aware category: Normal / Borderline / Prolonged / Markedly prolonged (>500)
- All formulas agree at HR 60 (a useful sanity check)
- Dark mode; 100% client-side

## Why
Bazett is the default QTc formula but over-corrects at fast heart rates, so clinicians cross-check with Fridericia/Framingham. QTc shows all four at once, offline. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Not medical advice
QTc thresholds and formula choice depend on clinical context. This tool does the arithmetic only.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`bazett`, `fridericia`, `framingham`, `hodges`, `category`) are covered by headless tests — the RR relationship, all-equal-at-HR-60, each formula at HR 100, heart-rate monotonicity, sex-aware category thresholds, and validation. CI runs them on every push.

## License
MIT © Alex Wictor
