# Normal Distribution Calculator

Compute the **z-score**, cumulative probability **Φ(z)**, and **percentile** for a value on a normal distribution — plus the probability between two z-scores.

**[Open the tool →](https://awictor.github.io/normal-distribution/)**

- `z = (x − μ) / σ`, Φ(z) = P(X ≤ x), percentile, and P(X ≥ x)
- Probability between two z-scores
- Φ from the error function (Abramowitz–Stegun, ~1e-7 accurate)
- Dark mode, 100% offline, no dependencies, no tracking

## Examples

x=130, μ=100, σ=15 → z = 2, ~97.7th percentile. ±1.96σ brackets the central 95%.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
