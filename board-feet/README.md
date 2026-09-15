# Board Feet Calculator

A single-file, offline lumber calculator. Compute board feet from thickness, width, and length (feet or inches), scale by quantity, and estimate cost at a price per board foot.

**Live:** https://awictor.github.io/board-feet/

## Features

- **Board feet** `= thickness(in) × width(in) × length(in) / 144`
- Length entry in **feet or inches**
- **Quantity** and **total cost** at $/BF
- Dark mode, 100% offline, zero dependencies

## Definition

One board foot = a board 1″ thick × 12″ wide × 1′ long. A 1×6 board 8 ft long is 4 BF.

## Tests

```
node tests/selftest.mjs
```

10 checks including the 1×12×12 definition, feet/inch agreement, and a full order total. No dependencies.

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
