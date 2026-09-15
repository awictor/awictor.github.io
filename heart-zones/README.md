# HeartZones

**Training heart rate zone calculator** — enter your age (and optional resting heart rate) to get your five training zones in bpm. Uses standard max-HR formulas, or the more personalized Karvonen heart-rate-reserve method when you provide a resting rate. One offline HTML file, no signup, no tracking.

👉 **[Open HeartZones](https://awictor.github.io/heart-zones/)**

## Features
- Five zones (Recovery → Maximum) with bpm ranges and percentages
- Three max-HR formulas: 220−age (Fox), Tanaka, Gulati
- Karvonen (heart-rate-reserve) method when a resting HR is given
- Color-coded zones, dark mode, remembers your inputs
- 100% client-side; works offline

## Why
Training by heart rate keeps easy days easy and hard days hard — but the zone math depends on your age, resting rate, and which formula you trust. HeartZones shows all five zones instantly and offline. Estimates only, not medical advice. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`maxHeartRate`, `karvonen`, `zones`) are covered by headless regression tests, including all three formulas, Karvonen boundaries, and zone contiguity; CI runs them on every push.

## License
MIT © Alex Wictor
