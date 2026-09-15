# ClampGen

**CSS `clamp()` fluid-size generator** — enter a min and max size plus the viewport range they span, and get a responsive `clamp()` value for fluid typography or spacing. One offline HTML file, no signup, no tracking.

👉 **[Open ClampGen](https://awictor.github.io/clamp-gen/)**

## Features
- Fluid `clamp(min, preferred, max)` from min/max size + viewport range
- rem-based output (assumes a 16px root), linear between viewports
- Click to copy
- Dark mode, remembers your inputs
- 100% client-side; works offline

## Why
Fluid type/spacing with `clamp()` is the modern responsive technique, but the middle term is fiddly math. ClampGen computes it exactly — the value equals your min size at the min viewport and your max size at the max viewport. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
The pure `fluidClamp` function is covered by headless regression tests, including that the interpolation hits the endpoints; CI runs them on every push.

## License
MIT © Alex Wictor
