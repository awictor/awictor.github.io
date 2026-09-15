# Greenhouse Heater 🌿

Size a **greenhouse heater** from glazing area, glazing type, and the temperature you need above the coldest night. Single offline HTML file, no dependencies, no data leaves your device.

## Use it

Open `index.html` in any browser, or visit the [live version](https://awictor.github.io/greenhouse-heater/).

Enter total glazing area, pick a glazing type, and the temperature to hold above outside. You get the heater output in BTU/hr and its electric-watt equivalent.

## How it works

- Heat escapes through the glazing: loss (BTU/hr) = glazing area × U-factor × temperature difference.
- U-factor is heat lost per sq ft per °F — lower is better: ~1.1 single glass, ~0.5 twin-wall polycarbonate.
- Use your coldest expected night for the temperature difference so the heater keeps up on the worst evening.
- Electric heat converts at 3.412 BTU per watt; a thermal blanket or row cover cuts the load a lot.

## Tests

```
node tests/selftest.mjs
```

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
