# Poisson Distribution Calculator

Compute Poisson probabilities for a rate **λ**: exactly k, at most k, and at least k events — plus mean and standard deviation. Models arrivals, defects, calls, decays, and other rare countable events.

**[Open the tool →](https://awictor.github.io/poisson/)**

- `P(X = k) = λᵏ·e⁻ᵏ / k!`, cumulative ≤ and ≥
- Mean = λ, std dev = √λ
- Numerically stable recurrence (no factorial overflow)
- Dark mode, 100% offline, no dependencies, no tracking

## Example

λ = 3 expected calls/hour, exactly 5 → ~10.1%; at most 5 → ~91.6%.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
