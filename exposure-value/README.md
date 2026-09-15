# Exposure Value (EV) Calculator

A single-file, offline photography **exposure value** calculator. Compute EV from aperture and shutter speed, adjust for ISO, and reason about equivalent exposures.

**Live:** https://awictor.github.io/exposure-value/

## Features

- **EV** `= log₂(N²/t)` from f-number and shutter time
- **ISO adjustment** `− log₂(ISO/100)`
- **Solve** shutter or aperture for a target EV (in the API)
- Typical-scene reference and the Sunny 16 rule (EV 15)
- Dark mode, 100% offline, zero dependencies

## Stops

Each +1 EV halves the light (one stop): raise N by √2, or halve the shutter time.

## Tests

```
node tests/selftest.mjs
```

10 checks including Sunny 16, one-stop relationships, equivalent exposures, and inversions. No dependencies.

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
