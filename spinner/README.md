# Spinner

**CSS loading spinner generator** — tune size, thickness, colors, and speed to get a pure-CSS spinner, with a live animated preview and copy-ready code. One offline HTML file, no signup, no tracking.

👉 **[Open Spinner](https://awictor.github.io/spinner/)**

## Features
- Classic border spinner: size, ring thickness, spinner + track colors, rotation speed
- Live animated preview
- Copy-ready CSS (a `.spinner` class plus the `@keyframes`)
- Dark mode; 100% client-side

## Why
Every project needs a loading spinner, and the border-plus-keyframes trick is quick but easy to fumble. Spinner lets you dial it in visually and gives you clean, dependency-free CSS. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`isHex`, `spinnerCss`) are covered by headless tests — value composition, the keyframes/circle output, defaults, custom values, 3-digit hex, and rejection of invalid colors and non-positive numbers. CI runs them on every push.

## License
MIT © Alex Wictor
