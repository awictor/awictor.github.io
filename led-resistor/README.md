# LED Resistor Calculator

Compute the **current-limiting resistor** for an LED — `R = (V_supply − V_forward) / I` — with the power dissipated and the **nearest standard E12** resistor value. Presets for common LED colors.

**[Open the tool →](https://awictor.github.io/led-resistor/)**

- Exact resistance, nearest E12 value, and resistor power
- LED color presets (red, yellow, green, blue/white)
- Guards when the supply can't drive the LED
- Dark mode, 100% offline, no dependencies, no tracking

## Example

Red LED (2 V) on 5 V at 20 mA → **150 Ω**, dissipating 0.06 W.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
