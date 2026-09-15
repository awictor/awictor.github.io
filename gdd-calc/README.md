# Growing Degree Days Calculator

Calculate daily and accumulated **growing degree days (GDD)** from daily high/low temperatures and a base temperature, with an optional upper cap.

**[Open the tool →](https://awictor.github.io/gdd-calc/)**

- Daily GDD = (high + low)/2 − base, floored at zero
- Optional upper cap for extreme-heat plateaus
- Accumulate GDD across a season
- Dark mode, 100% offline, no dependencies, no tracking

## Example

A day with a 30° high and 10° low at a 10° base gives 10 GDD. Sum over the season to predict flowering, harvest, or pest emergence. Works in °C or °F.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
