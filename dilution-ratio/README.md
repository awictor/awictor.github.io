# Dilution Ratio Calculator

Work out how much **concentrate** and **water** to mix for a dilution ratio like 1:10, for any batch size.

**[Open the tool →](https://awictor.github.io/dilution-ratio/)**

- Concentrate = total ÷ (ratio + 1)
- Water = the rest; total-from-concentrate and ratio-from-parts too
- Any matching units (mL, oz, cups)
- Dark mode, 100% offline, no dependencies, no tracking

## Example

1100 mL at 1:10 = 100 mL concentrate + 1000 mL water. A 1:1 mix is half and half.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
