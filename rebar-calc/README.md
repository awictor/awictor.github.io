# Rebar Calculator

Calculate how many **rebar pieces** and the **total length** needed for a reinforcing grid in a slab, from area and bar spacing.

**[Open the tool →](https://awictor.github.io/rebar-calc/)**

- Bars per span = floor(span ÷ spacing) + 1 (both edges)
- Grid total bars and total linear footage
- On-center spacing in inches
- Dark mode, 100% offline, no dependencies, no tracking

## Example

A 20×10 ft slab at 12″ on center → an 11×21 grid, 32 bars, 430 ft of rebar. Add ~10% for laps and waste.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
