# APGAR Score Calculator

Score the **APGAR** newborn assessment from Appearance, Pulse, Grimace, Activity and Respiration — each 0–2, total 0–10, with an interpretation band. For OB, pediatric and EMS use. One offline HTML file, no signup, no tracking.

👉 **[Open APGAR Score](https://awictor.github.io/apgar-score/)**

## Scoring
Each of the five signs scores 0, 1 or 2. Guidance: 7–10 reassuring, 4–6 moderately low, 0–3 critically low.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`apgarTotal`, `apgarInterpretation`) are covered by headless tests — the max/min, mixed sums, per-component 0/1/2 validation, missing-component errors, interpretation bands and boundaries, component-list structure, out-of-range rejection, and validation. CI runs them on every push.

## Not medical advice
A clinical aid, not a long-term prognosis.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
