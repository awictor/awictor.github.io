# Binomial Probability Calculator

Compute binomial probabilities for **k successes in n independent trials** with success probability p — exactly k, at most k, at least k — plus the number of combinations, mean, and standard deviation.

**[Open the tool →](https://awictor.github.io/binomial-probability/)**

- `P(X = k) = C(n, k)·pᵏ·(1−p)ⁿ⁻ᵏ`, cumulative ≤ and ≥
- C(n, k), mean `np`, std dev `√(np(1−p))`
- Overflow-safe multiplicative combinations
- Dark mode, 100% offline, no dependencies, no tracking

## Example

10 fair coin flips, exactly 5 heads → **24.6%** (252/1024); mean 5, σ ≈ 1.58.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
