# Bowling Score Calculator

Score a **ten-pin bowling** game from your rolls — with correct strike and spare bonuses and the 10th-frame fill-ball rules.

**[Open the tool →](https://awictor.github.io/bowling-score/)**

- Strike = 10 + next two rolls; spare = 10 + next one
- Handles the 10th-frame bonus balls
- One-click examples (perfect 300, all spares 150, …)
- Dark mode, 100% offline, no dependencies, no tracking

## Example

Twelve strikes = 300. Ten frames of 5/5 spares plus a fill 5 = 150. Nine pins then a miss each frame = 90.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
