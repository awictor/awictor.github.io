# Drywall Calculator

Estimate drywall for a room: **wall area** from perimeter and ceiling height, the number of **sheets** (with waste), and an approximate **screw count**.

**[Open the tool →](https://awictor.github.io/drywall-calc/)**

- Wall area = perimeter × ceiling height
- Custom sheet size (default 4 × 8 ft = 32 ft²) and waste factor
- Rounds up to whole sheets; ~32 screws per sheet
- Dark mode, 100% offline, no dependencies, no tracking

## Example

A 10 × 10 room (40 ft perimeter, 8 ft ceiling) = 320 ft². With 10% waste that's 11 sheets and about 352 screws.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
