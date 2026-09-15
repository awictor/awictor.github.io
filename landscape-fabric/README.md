# Landscape Fabric 🧻

Work out how many landscape **fabric** strips and rolls a bed needs, allowing for overlap between strips. Single offline HTML file, no dependencies, no data leaves your device.

## Use it

Open `index.html` in any browser, or visit the [live version](https://awictor.github.io/landscape-fabric/).

Enter bed length and width, roll width and length, and the overlap between strips. You get the rolls to buy, strips across the bed, and total fabric length.

## How it works

- Strips overlap so weeds can't sneak through the seams, so each strip only covers roll width − overlap.
- Strips across = ceil(bed width ÷ effective width); total fabric = bed length × strips.
- Rolls = ceil(total fabric length ÷ roll length).
- Pin the seams every couple of feet and cut X-slits for plants rather than lifting the whole sheet.

## Tests

```
node tests/selftest.mjs
```

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
