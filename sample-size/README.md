# Sample Size Calculator

Compute the **sample size** needed to estimate a proportion at a chosen **confidence level** and **margin of error**, with optional finite-population correction. For surveys, polls, and A/B tests.

**[Open the tool →](https://awictor.github.io/sample-size/)**

- `n = z²·p·(1−p) / e²`, finite correction `n / (1 + (n−1)/N)`
- 90 / 95 / 99% confidence
- Conservative default p = 50%
- Dark mode, 100% offline, no dependencies, no tracking

## Example

95% confidence, ±5% margin → **385** respondents (or 279 from a population of 1,000).

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
