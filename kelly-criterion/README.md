# Kelly Criterion

A single-file, offline calculator for the **Kelly Criterion** — the bet or position size that maximizes the long-run growth of your bankroll. Enter a win probability and payout odds; get the optimal stake, fractional (half/quarter) Kelly, your edge, and the expected log-growth per bet.

**Live:** https://awictor.github.io/kelly-criterion/

## Features

- **Full Kelly** — `f* = (b·p − q) / b`
- **Fractional Kelly** — scale to half/quarter to cut volatility
- **Edge** — expected value per $1 staked
- **Expected log-growth** per bet and approximate bets-to-double
- Negative result flags "no edge — don't bet"
- Dark mode, 100% offline, zero dependencies

## Notes

The same math sizes positions in trading and investing, not just betting. Because real probabilities are uncertain, fractional Kelly is a common risk-management choice.

## Tests

```
node tests/selftest.mjs
```

10 checks on the pure functions, including a growth-optimality check. No dependencies.

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
