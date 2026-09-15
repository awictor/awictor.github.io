# Machining Speeds & Feeds Calculator

Calculate **spindle RPM** from cutting speed and tool diameter, and **feed rate** from RPM, chip load, and flutes.

**[Open the tool →](https://awictor.github.io/speeds-feeds/)**

- RPM = (SFM × 12) / (π × diameter)
- Feed rate (IPM) = RPM × chip load × flutes
- For CNC, milling, and drilling
- Dark mode, 100% offline, no dependencies, no tracking

## Example

100 SFM with a 0.5″ 2-flute tool → ~764 RPM; at 0.002″/tooth chip load, ~3.1 in/min feed.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
