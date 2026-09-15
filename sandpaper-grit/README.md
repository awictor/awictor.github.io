# Sandpaper Grit 🪵

Convert **CAMI sandpaper grit to average particle micron size** and get the recommended next grit in the sanding progression. Single HTML file, fully offline, nothing leaves your device.

## Why

Grit numbers are unintuitive — higher means finer — and skipping too far (say 80 → 220) leaves scratches the finer paper can't remove. This shows the actual particle size behind a grit and suggests the next sensible step so your surface actually gets smooth.

## Use it

Open `index.html` in any browser, or use the hosted version:

- **Tool:** https://awictor.github.io/sandpaper-grit/
- Pick a **grit** from the CAMI sequence.
- Read the average particle size (µm), the typical use, and the next grit to move to.

## How it works

- Grit counts particles per inch of screen — higher grit, smaller particles, finer scratch.
- Micron values are averages on the North American CAMI scale (European FEPA "P" grades differ slightly).
- Rough shaping 40–80, general smoothing 100–150, pre-finish 180–220, between coats 320+.
- Step through grits without big jumps; let the paper do the work rather than pressing hard.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
