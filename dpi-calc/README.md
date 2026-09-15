# DPI / Print Size Calculator

Work out **print size** from pixels and DPI, the **pixels you need** for a target print, the **effective DPI** at a size, and **megapixels**.

**[Open the tool →](https://awictor.github.io/dpi-calc/)**

- Print size = pixels ÷ DPI
- Pixels needed = inches × DPI
- Effective DPI at a target size; megapixels
- Dark mode, 100% offline, no dependencies, no tracking

## Example

A 6000 × 4000 (24 MP) image prints 20 × 13.3″ at 300 DPI. Stretch it to 24″ wide and the effective DPI drops to 250.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
