# Confidence Interval Calculator

Compute **confidence intervals** for a **mean** (`x̄ ± z·s/√n`) or a **proportion** (`p ± z·√(p(1−p)/n)`), with the margin of error.

**[Open the tool →](https://awictor.github.io/confidence-interval/)**

- Mean and proportion modes
- 90 / 95 / 99% confidence (z approximation)
- Reports the interval and the margin of error
- Dark mode, 100% offline, no dependencies, no tracking

## Example

Mean 100, s = 15, n = 100, 95% → **[97.06, 102.94]** (± 2.94). Proportion 50%, n = 100 → [40.2%, 59.8%].

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
