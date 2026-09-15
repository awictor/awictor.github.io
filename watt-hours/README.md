# Watt-Hour & Battery Pack Calculator

Convert between **watt-hours** and **mAh**, and size a battery pack from cell capacity, voltage, and **series/parallel** configuration.

**[Open the tool →](https://awictor.github.io/watt-hours/)**

- Wh = mAh × V ÷ 1000, both directions
- Pack voltage (S × cell V), capacity (P × cell mAh), and energy
- For power banks, e-bikes, and DIY packs
- Dark mode, 100% offline, no dependencies, no tracking

## Example

A 3S2P pack of 3500 mAh 3.7 V cells → 11.1 V, 7000 mAh, ~77.7 Wh.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
