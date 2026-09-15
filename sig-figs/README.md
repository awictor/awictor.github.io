# Significant Figures Calculator

**Count** the significant figures in any number and **round** any value to a chosen number of sig figs, with scientific notation. For chemistry, physics, and engineering coursework and reports.

**[Open the tool →](https://awictor.github.io/sig-figs/)**

- Correct handling of leading/trailing zeros and the decimal-point rule
- Round to N sig figs (with carrying, e.g. 999 → 1000)
- Scientific-notation output
- Dark mode with persistence
- 100% offline, no dependencies, no tracking

## Examples

`0.007800` has 4 sig figs. `1000` has 1 but `1000.` has 4. Rounding `1234` to 2 sig figs gives `1200`.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
