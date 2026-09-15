# Centor / McIsaac Score

Score the **Centor criteria** (with the **McIsaac** age modification) to estimate the probability of strep throat and guide testing or treatment. One offline HTML file, no signup, no tracking.

👉 **[Open Centor / McIsaac](https://awictor.github.io/centor-score/)**

## Scoring
+1 each for fever, tonsillar exudate/swelling, tender anterior cervical nodes, and absence of cough. McIsaac age modifier: +1 (3–14), 0 (15–44), −1 (45+). Guidance: ≤0 very low, 1 low, 2–3 moderate (test), ≥4 high.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`centorScore`, `mcIsaacAgeMod`, `mcIsaacScore`, `interpret`, `recommendation`) are covered by headless tests — the base score, the age bands, the combination, negative scores, band thresholds, recommendation text, a max case, criteria composition, unknown-key handling, and validation. CI runs them on every push.

## Not medical advice
A decision aid, not a diagnosis.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
