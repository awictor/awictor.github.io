# HeatIndex

**Feels-like temperature** — enter air temperature and relative humidity to get the apparent "feels-like" heat index using the U.S. National Weather Service regression, in °F and °C, with an NWS risk category. One offline HTML file, no signup, no tracking.

👉 **[Open HeatIndex](https://awictor.github.io/heat-index/)**

## Features
- NWS (Rothfusz) heat-index regression with the standard low-humidity and high-humidity adjustments
- Toggle °F / °C; shows the value in both scales
- Risk category: Comfortable → Caution → Extreme Caution → Danger → Extreme Danger
- Dark mode; 100% client-side

## Why
"It's 90 but feels like 106" — that gap is the heat index, and it's what actually matters for heat safety. HeatIndex computes it from temperature and humidity offline. Pairs with [Beaufort](https://awictor.github.io/beaufort/) for wind. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Note
The regression is calibrated for warm, humid conditions. Below ~80°F the apparent temperature is close to the air temperature, and the tool reflects that. Informational only.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`cToF`, `fToC`, `heatIndexF`, `heatIndexC`, `category`) are covered by headless tests — NWS chart values (±2°F), monotonicity in temperature and humidity, the dry-air adjustment, Celsius/Fahrenheit agreement, category thresholds, and validation. CI runs them on every push.

## License
MIT © Alex Wictor
