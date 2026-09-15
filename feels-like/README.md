# FeelsLike

**Wind chill & heat index calculator** — find the "feels like" temperature from air temperature, wind, and humidity using the U.S. National Weather Service formulas, in °F or °C, with a safety note. One offline HTML file, no signup, no tracking.

👉 **[Open FeelsLike](https://awictor.github.io/feels-like/)**

> ⚠️ Estimates only.

## Features
- NWS wind chill (cold + windy) and Rothfusz heat index (hot + humid)
- Automatically applies the right adjustment for the conditions
- °F / °C toggle; heat-danger and frostbite risk labels
- Dark mode; 100% client-side

## Why
"It's 90° but feels like 106°" comes from real formulas, not a guess. FeelsLike computes wind chill and heat index exactly, offline, and tells you the safety category. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`cToF`, `fToC`, `windChill`, `heatIndex`, `feelsLike`) are covered by headless tests — temperature conversions, NWS chart values (0°F/15mph → −19, 90°F/70% → 106), monotonicity with humidity, and the mode-selection logic. CI runs them on every push.

## License
MIT © Alex Wictor
