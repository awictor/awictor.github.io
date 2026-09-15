# Pulley & Belt Calculator

Size a belt drive: **V-belt length** from center distance and pulley diameters, the **drive ratio**, **output RPM**, and **belt surface speed**.

**[Open the tool →](https://awictor.github.io/pulley-belt/)**

- Open-belt length: 2C + (π/2)(D+d) + (D−d)²/4C
- Drive ratio = driven ÷ driver
- Output RPM and belt speed (ft/min)
- Dark mode, 100% offline, no dependencies, no tracking

## Example

3″ driver, 6″ driven, 16″ centers → ~44.3″ belt, 2:1 ratio. A 1750 RPM motor drives the output at 875 RPM.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
