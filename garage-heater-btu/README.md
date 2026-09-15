# Garage Heater BTU 🚗

Size a garage or shop **heater** in BTU from room dimensions, temperature rise, and insulation quality. Single offline HTML file, no dependencies, no data leaves your device.

## Use it

Open `index.html` in any browser, or visit the [live version](https://awictor.github.io/garage-heater-btu/).

Enter the length, width, and height, the temperature rise you want above outside, and the insulation quality. You get the recommended BTU/hr and a rough electric kW equivalent.

## How it works

- Heating load grows with the air you're warming and how far above outside you want it: BTU = volume × temperature rise × an insulation factor.
- The factor runs about 0.1 for a tight, insulated space, 0.133 for average, and 0.2 for a drafty one.
- Electric heat converts at 3412 BTU per kW, so divide by 3412 for a rough kW.
- Round up — bigger reaches temperature faster and cycles less on the coldest days.

## Tests

```
node tests/selftest.mjs
```

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
