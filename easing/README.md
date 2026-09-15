# Easing

**CSS cubic-bezier generator & visualizer** — design timing functions with a live curve, animated ball preview, and one-click presets, then copy the CSS. One offline HTML file, no signup, no tracking.

👉 **[Open Easing](https://awictor.github.io/easing/)**

## Features
- Live cubic-bezier curve (SVG) with control-point handles
- Animated preview so you can *feel* the motion
- Presets: linear, ease, ease-in/out/in-out, and an overshooting "back"
- Editable P1/P2 control points; copy-ready `cubic-bezier()` CSS
- Dark mode, remembers your curve
- 100% client-side; works offline

## Why
The named CSS easings (`ease`, `ease-in-out`) rarely feel exactly right. Easing lets you dial in a custom curve, watch it animate, and copy the exact `cubic-bezier()`. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`bezier`, `sample`, `cssTimingFunction`) are covered by headless regression tests: fixed endpoints, linear identity, symmetric midpoint, accelerate/decelerate behaviour, monotonicity, and CSS formatting. The solver uses Newton–Raphson with a bisection fallback. CI runs the tests on every push.

## License
MIT © Alex Wictor
