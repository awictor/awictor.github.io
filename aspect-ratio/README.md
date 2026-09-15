# AspectRatio

**Aspect ratio calculator** — set a target ratio and get the missing width or height, or type any width×height and see its simplified ratio. Presets for 16:9, 4:3, 21:9, and more, with a live preview. One offline HTML file, no signup, no tracking.

👉 **[Open AspectRatio](https://awictor.github.io/aspect-ratio/)**

## Features
- Lock a ratio; editing width auto-fills height (and vice versa)
- Simplify any width×height to its lowest-terms ratio
- Presets: 16:9, 4:3, 21:9, 3:2, 1:1, 9:16
- Live shape preview
- Dark mode, remembers your values
- 100% client-side; works offline

## Why
Resizing images, video, and layouts means constant ratio math. AspectRatio does it both ways — solve for a dimension or reduce a size to its ratio. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`gcd`, `simplifyRatio`, `heightFor`, `widthFor`) are covered by headless regression tests against common resolutions; CI runs them on every push.

## License
MIT © Alex Wictor
