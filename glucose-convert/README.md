# Glucose

**Blood sugar unit converter** — convert blood glucose between **mg/dL** and **mmol/L** and see the fasting-level category (low, normal, prediabetes, diabetes). One offline HTML file, no signup, no tracking.

👉 **[Open Glucose](https://awictor.github.io/glucose-convert/)**

> ⚠️ Not medical advice. Categories use ADA fasting thresholds.

## Features
- mg/dL ⇄ mmol/L using the glucose molar factor (18.0182)
- Fasting category: <70 low · 70–99 normal · 100–125 prediabetes · ≥126 diabetes (mg/dL)
- Instant, both directions; dark mode; 100% client-side

## Why
The US uses mg/dL and most of the world uses mmol/L, so glucose readings constantly need converting — and the "is this number OK?" context matters. Glucose does both instantly and privately, offline. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`mgdlToMmol`, `mmolToMgdl`, `fastingCategory`) are covered by headless tests — the 18.0182 factor both directions, round-trips, all ADA category thresholds, negative-value rejection, and zero handling. CI runs them on every push.

## License
MIT © Alex Wictor
