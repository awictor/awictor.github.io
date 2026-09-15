# Coffee Ratio Calculator

**Dial in your coffee-to-water ratio.** Pick a brew method (or set your own 1:N ratio) and solve for coffee from water, water from coffee, or by number of cups. One offline HTML file, no signup, no tracking.

👉 **[Open Coffee Ratio](https://awictor.github.io/coffee-ratio/)**

## Features
- Solve **from water**, **from coffee**, or **by cups**
- Presets: drip/pour-over (1:16), French press (1:12), AeroPress (1:14), espresso (1:2), cold brew (1:8)
- Adjustable ratio; grams ≈ mL of water
- Dark mode; 100% client-side

## Tests
```
node tests/selftest.mjs
```
Pure functions (`coffeeFromWater`, `waterFromCoffee`, `waterForCups`) are covered by headless tests — the 1:16 reference, inverses, espresso/cold-brew ratios, strength ordering, cups conversion, linearity, and validation. CI runs them on every push.

## License
MIT © Alex Wictor
