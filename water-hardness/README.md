# Water Hardness Converter

Convert water hardness between **ppm** (mg/L as CaCO₃), **grains per gallon**, and **mmol/L**, with a soft-to-very-hard rating.

**[Open the tool →](https://awictor.github.io/water-hardness/)**

- 1 gpg = 17.118 ppm; mmol/L = ppm ÷ 100.09
- Soft / slightly / moderately / hard / very hard rating
- For water softeners and reading water reports
- Dark mode, 100% offline, no dependencies, no tracking

## Example

120 ppm = 7.01 gpg = 1.199 mmol/L — the low end of "Hard."

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
