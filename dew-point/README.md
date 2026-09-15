# Dew Point

**Calculate the dew point and mugginess/comfort level** from air temperature and relative humidity, using the Magnus formula. One offline HTML file, no signup, no tracking.

👉 **[Open Dew Point](https://awictor.github.io/dew-point/)**

## Why dew point?
Relative humidity depends on temperature, so it's a poor gauge of how the air actually feels. **Dew point** — the temperature at which air saturates — tracks mugginess directly: 15 °C feels pleasant, 21 °C feels oppressive, regardless of the thermometer.

## Features
- Dew point from temperature + relative humidity
- °C / °F toggle and a humidity slider
- Comfort scale (dry → miserable)
- Reverse helper: relative humidity from temperature + dew point
- Dark mode; 100% client-side

## The math
Magnus formula with a = 17.625, b = 243.04 °C: γ = ln(RH/100) + a·T/(b+T), then dew point = b·γ/(a−γ). At 100% humidity the dew point equals the air temperature.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`dewPoint`, `relativeHumidity`, `dewComfort`, `cToF`, `fToC`) are covered by headless tests — the 20 °C/50% ≈ 9.26 °C reference, saturation identity, monotonicity, RH inversion, unit conversions, and comfort-tier boundaries. CI runs them on every push.

## License
MIT © Alex Wictor
