# Neumorph

**Neumorphism (soft-UI) CSS generator** — pick a base color and tune distance, blur, and intensity to get the two-shadow soft-UI look. Live preview + copy-ready CSS. One offline HTML file, no signup, no tracking.

👉 **[Open Neumorph](https://awictor.github.io/neumorphism/)**

## Features
- Flat, concave, convex, and pressed (inset) shapes
- Auto-computed matching light/dark shadow pair from your base color
- Distance, blur, and intensity sliders with a live preview
- Copy-ready `box-shadow` + `background` CSS; dark mode; 100% client-side

## Why
Neumorphism relies on two perfectly matched shadows — one lighter, one darker than the surface. Eyeballing those hex values is fiddly. Neumorph derives them for you and shows the result instantly, offline. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`adjust`, `neu`, `hexToRgb`, `rgbToHex`) are covered by headless tests — hex parsing/clamping, lighten/darken math, the symmetric shadow pair, inset (pressed) and concave/convex gradients, and invalid-color rejection. CI runs them on every push.

## License
MIT © Alex Wictor
