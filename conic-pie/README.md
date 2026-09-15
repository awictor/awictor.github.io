# ConicPie

**CSS pie chart / conic-gradient generator** — enter labeled segment values and get a hard-stop `conic-gradient` you can drop on any circle, with a live preview. One offline HTML file, no signup, no tracking.

👉 **[Open ConicPie](https://awictor.github.io/conic-pie/)**

## Features
- Segments as proportional values (any scale) → correct degree slices summing to 360
- Adjustable start angle; add/remove up to 10 segments; zero-value segments handled
- Live circular preview; copy-ready `background: conic-gradient(...)`
- Dark mode; 100% client-side

## Why
A pie chart in pure CSS is one `conic-gradient` away — but working out each slice's start/end degrees by hand is tedious. ConicPie does the proportional math and previews it live, offline. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
The pure `conicPie` function is covered by headless tests — equal and uneven splits, single-segment fill, the start angle, three-segment summing to 360, scale-invariant proportions, zero-width stops, and rejection of empty/all-zero/negative/bad-hex input. CI runs them on every push.

## License
MIT © Alex Wictor
