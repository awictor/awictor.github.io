# Compression Ratio Calculator

Calculate an engine's **compression ratio** from swept and clearance volume, or find the clearance volume you need to hit a target ratio.

**[Open the tool →](https://awictor.github.io/compression-ratio/)**

- CR = (swept + clearance) ÷ clearance
- Solve backward for the clearance volume a target ratio requires
- Swept-volume and head-gasket-volume helpers
- Dark mode, 100% offline, no dependencies, no tracking

## Example

A 500 cc cylinder with 50 cc of clearance volume runs 11:1. To reach 11:1 you need 50 cc of clearance.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
