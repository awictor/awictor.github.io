# eDPI & Sensitivity Converter

Calculate **eDPI** and **cm/360** from mouse DPI and in-game sensitivity, and convert sensitivity between DPI settings while keeping the same feel.

**[Open the tool →](https://awictor.github.io/mouse-sensitivity/)**

- eDPI = DPI × sensitivity
- cm/360 = 360·2.54 / (yaw × DPI × sens), with game presets
- Convert sensitivity to a new DPI at constant eDPI
- Dark mode, 100% offline, no dependencies, no tracking

## Example

800 DPI at 2.0 sens in CS2 → 1600 eDPI, ~26 cm/360. On 1600 DPI, use 1.0 for the same feel.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
