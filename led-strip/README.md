# LED Strip Power Calculator

Calculate an LED strip's total **wattage**, **current draw**, and the **power supply size** you need from watts per metre, length, and voltage.

**[Open the tool →](https://awictor.github.io/led-strip/)**

- Total power = W/m × length; current = watts ÷ voltage
- PSU size with headroom (20–30%)
- For makers and home LED lighting
- Dark mode, 100% offline, no dependencies, no tracking

## Example

5 m of 14.4 W/m at 12 V → 72 W, 6 A; pick a ~86 W supply at 20% headroom.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
