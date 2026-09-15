# Glasgow Coma Scale (GCS)

Score the **Glasgow Coma Scale** from eye, verbal and motor responses — total 3–15 with a severity band and the component readout (e.g. "E3 V4 M5 = 12"). For clinicians and EMS. One offline HTML file, no signup, no tracking.

👉 **[Open GCS Calculator](https://awictor.github.io/gcs-calc/)**

## Scoring
Eye 1–4, Verbal 1–5, Motor 1–6. Bands: 13–15 mild, 9–12 moderate, 3–8 severe (≤ 8 generally indicates coma).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`gcsTotal`, `gcsSeverity`) are covered by headless tests — the sum, the 3/15 bounds, component-range validation, severity bands and boundaries, option-list lengths and value coverage, a mid-range case, out-of-range rejection, and an exhaustive sweep of all valid combinations. CI runs them on every push.

## Not medical advice
A clinical aid, not a substitute for full assessment.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
