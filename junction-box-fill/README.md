# Junction Box Fill 📦

Check an electrical box against NEC **box fill**: conductor volume by wire gauge versus the box's cubic-inch capacity. Single offline HTML file, no dependencies, no data leaves your device.

## Use it

Open `index.html` in any browser, or visit the [live version](https://awictor.github.io/junction-box-fill/).

Enter the conductor count, wire gauge, and box capacity. You get the fill volume, whether it fits, and the max conductors for that gauge.

## How it works

- Each conductor gets a volume allowance by gauge: 14 AWG = 2.0, 12 = 2.25, 10 = 2.5, 8 = 3.0, 6 = 5.0 cubic inches.
- Total fill = conductors × that allowance; it must not exceed the box's marked cubic-inch capacity.
- Count all current-carrying wires; grounds together count as one, each device (switch/receptacle) counts as two, and internal clamps add one.
- This is a quick check — always confirm with NEC 314.16 and the box's own listing.

## Tests

```
node tests/selftest.mjs
```

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
