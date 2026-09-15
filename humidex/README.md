# Humidex

Calculate the **humidex** — Canada's humidity-adjusted "feels like" temperature — from air temperature and dew point, with a comfort category. One offline HTML file, no signup, no tracking.

👉 **[Open Humidex](https://awictor.github.io/humidex/)**

## Formula
`humidex = T + 0.5555·(e − 10)`, where `e = 6.11·exp(5417.7530·(1/273.16 − 1/(273.15+dewpoint)))`. Comfort: <30 comfortable, 30–39 some discomfort, 40–45 great discomfort, 46+ dangerous.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`vapourPressure`, `humidex`, `category`) are covered by headless tests: the Environment Canada 30°C/15°C ≈ 34 example, vapour-pressure monotonicity and the 6.11 hPa point, humidex rising with temp and dew point, category boundaries, and validation. CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
