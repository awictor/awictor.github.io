# Solar Panel Calculator

Size a solar array from your **daily energy use**, **peak sun hours**, and **system losses**: watts needed, number of panels, expected output, and a one-day battery bank.

**[Open the tool →](https://awictor.github.io/solar-panel/)**

- Array W = daily kWh × 1000 ÷ (sun hours × efficiency)
- Panel count (rounded up) and expected daily output
- Battery bank amp-hours at your system voltage and DoD
- Dark mode, 100% offline, no dependencies, no tracking

## Example

10 kWh/day at 5 sun hours and 80% efficiency needs a 2,500 W array — seven 400 W panels — and ~417 Ah of 48 V battery at 50% DoD.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
