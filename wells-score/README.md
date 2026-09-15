# Wells Score (DVT)

Score the **Wells clinical decision rule for deep vein thrombosis** — tick the criteria and get the point total, three-tier probability, and the two-tier "DVT likely / unlikely" stratification (commonly paired with a D-dimer). One offline HTML file, no signup, no tracking.

👉 **[Open Wells Score (DVT)](https://awictor.github.io/wells-score/)**

## Scoring
Each clinical feature adds a point; an alternative diagnosis at least as likely subtracts two. **Three-tier:** ≤0 low, 1–2 moderate, ≥3 high. **Two-tier (modified):** ≥2 likely, <2 unlikely.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`wellsScore`, `riskThreeTier`, `riskTwoTier`) are covered by headless tests — the empty case, single criteria, the −2 alternative diagnosis, mixed sums, the all-positive maximum, both tier threshold sets, the criteria-set composition, unknown-key handling, and validation. CI runs them on every push.

## Not medical advice
A decision aid, not a diagnosis; use clinical judgment and your local pathway.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
