# Tap Drill Size Calculator

Calculate the **tap drill size** for a metric thread from major diameter and pitch, with thread-engagement sizing and TPI/pitch conversion.

**[Open the tool →](https://awictor.github.io/tap-drill/)**

- Rule of thumb: drill = major diameter − pitch
- Engagement-based: major − (%/100 × 1.0825 × pitch)
- Pitch ↔ threads per inch
- Dark mode, 100% offline, no dependencies, no tracking

## Example

M10×1.5 → 8.5 mm drill (rule of thumb); ~8.78 mm at 75% engagement.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
