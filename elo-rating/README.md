# Elo Rating Calculator

Calculate **Elo** rating changes for chess and games: expected score, **win probability**, and your **new rating** after a win, loss, or draw with a chosen K-factor.

**[Open the tool →](https://awictor.github.io/elo-rating/)**

- Expected score = 1 / (1 + 10^((opp − you)/400))
- Rating change = K × (actual − expected)
- Win/draw/loss and adjustable K-factor
- Dark mode, 100% offline, no dependencies, no tracking

## Example

Even opponents (both 1500): 50% expected. A win at K=32 gains 16 points; a loss drops 16.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
