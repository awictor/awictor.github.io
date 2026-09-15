# Churn & Retention

Turn customer counts into **churn rate**, **retention rate**, **average customer lifetime**, and convert between **monthly and annual churn** (which compounds, so annual ≠ 12× monthly). For subscription and SaaS metrics. One offline HTML file, no signup, no tracking.

👉 **[Open Churn & Retention](https://awictor.github.io/churn-retention/)**

## Formulas
- Churn = lost ÷ starting customers · Retention = 1 − churn
- Avg lifetime = 1 ÷ churn (periods)
- Annual churn = 1 − (1 − monthly)¹²

## Tests
```
node tests/selftest.mjs
```
Pure functions (`churnRate`, `retentionRate`, `avgLifetime`, `annualChurn`, `monthlyChurn`) are covered by headless tests: counts→rate, retention complement, 1/churn lifetime, monthly→annual compounding (~46% from 5%), monthly↔annual round-trip, and validation. CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
