# Radiant Tube Length ➰

Find how much **PEX tubing** and how many loops a radiant floor needs from area and tube spacing. Single offline HTML file, no dependencies, no data leaves your device.

## Use it

Open `index.html` in any browser, or visit the [live version](https://awictor.github.io/radiant-tube-length/).

Enter the floor area, tube spacing, and max loop length. You get total tubing, loops needed, and tube per square foot.

## How it works

- Tube per square foot = 12 ÷ spacing in inches: 12″ on center is 1 ft/sq ft, 6″ is 2 ft/sq ft.
- Total tubing = area × tube-per-sq-ft (plus a bit extra for leaders back to the manifold).
- Keep each loop under about 300 feet so the pump can push flow; loops = ceil(total ÷ max loop).
- Tighter spacing near cold edges and glass gives more even floor temperatures.

## Tests

```
node tests/selftest.mjs
```

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
