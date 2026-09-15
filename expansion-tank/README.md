# Expansion Tank Size 🛢️

Size a **thermal expansion tank** for a closed water-heater system, from tank capacity, supply pressure, and relief pressure. Single offline HTML file, no dependencies, no data leaves your device.

## Use it

Open `index.html` in any browser, or visit the [live version](https://awictor.github.io/expansion-tank/).

Enter your water heater capacity, supply (fill) pressure, relief pressure, and the water expansion factor. You get the minimum expansion tank size in gallons.

## How it works

- In a closed system (backflow preventer or PRV), heated water can't push back into the main, so pressure spikes — an expansion tank absorbs it.
- Expansion volume = heater capacity × expansion factor (about 0.023 heating from 40&deg;F to 140&deg;F).
- Tank size = expansion volume ÷ (1 − supply pressure ÷ relief pressure), using absolute pressures.
- Round up to the next stock tank and set the air charge to match your supply pressure.

## Tests

```
node tests/selftest.mjs
```

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
