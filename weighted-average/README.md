# Weighted Average Calculator

Compute a **weighted average (weighted mean)** from value/weight pairs — for grade calculations, portfolio returns, survey scores, and blended rates. Add as many rows as you like; weights don't need to sum to 1.

**[Open the tool →](https://awictor.github.io/weighted-average/)**

- `x̄ = Σ(vᵢ·wᵢ) / Σwᵢ`
- Also shows total weight and the plain (unweighted) mean
- Add/remove rows, live recalculation
- Dark mode, 100% offline, no dependencies, no tracking

## Example

Values `90, 80, 100` with weights `3, 1, 2` → **91.67** (vs plain mean 90).

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
