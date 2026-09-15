# qSOFA Calculator

Score **qSOFA** (quick Sepsis-related Organ Failure Assessment) from three bedside signs — a fast flag for patients with suspected infection at higher risk. One offline HTML file, no signup, no tracking.

👉 **[Open qSOFA Calculator](https://awictor.github.io/qsofa/)**

## Scoring
+1 each for respiratory rate ≥ 22, altered mentation (GCS < 15), and systolic BP ≤ 100 mmHg. A score of **≥ 2** is associated with markedly higher in-hospital mortality.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`qsofa`, `qsofaRisk`) are covered by headless tests — the empty case, per-criterion points, the maximum, mixed sums, the ≥2 risk threshold and boundary, the criteria set, unknown-key handling, the 0..3 range, and validation. CI runs them on every push.

## Not medical advice
A screening aid, not a diagnosis of sepsis.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
