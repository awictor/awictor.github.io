# HAS-BLED Calculator

Score **HAS-BLED** to estimate 1-year major-bleeding risk on anticoagulation for atrial fibrillation — the companion to [CHA₂DS₂-VASc](https://awictor.github.io/chads-vasc/). One offline HTML file, no signup, no tracking.

👉 **[Open HAS-BLED](https://awictor.github.io/has-bled/)**

## Scoring
One point each: Hypertension, Abnormal renal, Abnormal liver, Stroke, Bleeding history, Labile INR, Elderly (>65), Drugs, Alcohol (max 9). **≥ 3** flags high bleeding risk and warrants caution and review of modifiable factors.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`hasBled`, `hasBledRisk`) are covered by headless tests — the empty case, per-criterion points, the maximum, the A/A and D/D pairs, risk-band thresholds, the criteria composition, unknown-key handling, the 0..9 range, and validation. CI runs them on every push.

## Not medical advice
A decision aid, not a directive to stop anticoagulation.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
