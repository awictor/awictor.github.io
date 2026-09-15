# Golf Handicap Calculator

Calculate your golf **handicap index** from score differentials, a single round's **differential**, your **course handicap**, and **net score** — WHS-style.

**[Open the tool →](https://awictor.github.io/golf-handicap/)**

- Differential = (score − course rating) × 113 ÷ slope
- Handicap index = average of best 8 differentials
- Course handicap = index × slope ÷ 113
- Net score from gross and course handicap
- Dark mode, 100% offline, no dependencies, no tracking

## Example

A 90 on a 72.0/130 course is a 15.7 differential. With a 12.5 index, your course handicap there is 14 and net is 76.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
