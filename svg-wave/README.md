# SVG Wave Generator

Generate smooth, layered **SVG wave dividers** for website sections — the curvy shapes you drop between two colored blocks. Tune amplitude, wavelength, phase, layer count, height and color, then copy the inline SVG. One offline HTML file, no signup, no tracking.

👉 **[Open SVG Wave Generator](https://awictor.github.io/svg-wave/)**

## How it works
Each layer is a sine wave `y = baseline + amplitude · sin(2π·x/wavelength + phase)`, sampled across the width and filled down to the bottom edge. Stack layers at varying amplitude/opacity for depth. Output is plain inline SVG — paste into HTML or use as a CSS background data URI.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`waveY`, `wavePoints`, `wavePath`) are covered by headless tests — the sine geometry at key phases, point sampling across the width, the closed fill path with bottom corners, amplitude/phase behavior, and validation. CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
