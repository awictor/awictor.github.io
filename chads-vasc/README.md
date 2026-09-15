# CHA₂DS₂-VASc Calculator

**Stroke-risk score for atrial fibrillation.** Toggle the risk factors and enter age to get the CHA₂DS₂-VASc score, the estimated annual stroke rate, and sex-specific anticoagulation guidance. One offline HTML file, no signup, no tracking.

👉 **[Open CHA₂DS₂-VASc](https://awictor.github.io/chads-vasc/)**

## Scoring
Congestive heart failure / LV dysfunction (1), Hypertension (1), Age ≥75 (2), Diabetes (1), prior Stroke/TIA/thromboembolism (2), Vascular disease (1), Age 65–74 (1), Sex category female (1). Maximum 9.

## Features
- Auto age scoring (0 / 1 / 2)
- Annual stroke-rate estimate per score
- Anticoagulation guidance (men ≥2, women ≥3 → recommended)
- Dark mode; 100% client-side

## Tests
```
node tests/selftest.mjs
```
Pure functions (`ageComponent`, `chadsvasc`, `strokeRisk`, `recommendation`) are covered by headless tests — age banding, each factor's weight, the age-2/no-double-count rule, the max of 9, the risk table, and sex-specific recommendation thresholds. CI runs them on every push.

## Not medical advice
For education only; not a substitute for clinical judgment. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License
MIT © Alex Wictor
