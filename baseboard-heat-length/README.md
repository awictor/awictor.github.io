# Baseboard Heat Length 🔥

Find how many feet of hydronic **baseboard** a room needs from its heat loss and the baseboard's output per foot. Single offline HTML file, no dependencies, no data leaves your device.

## Use it

Open `index.html` in any browser, or visit the [live version](https://awictor.github.io/baseboard-heat-length/).

Enter the room area, heat loss per square foot, and baseboard output per foot. You get the baseboard length needed, room heat loss, and installed output.

## How it works

- Estimate heat loss as room area × a per-square-foot figure — roughly 25–35 BTU/hr per sq ft for an average, insulated room.
- Fin-tube baseboard puts out about 550–600 BTU/hr per foot with 180°F water.
- Length = heat loss ÷ output per foot; spread it along exterior walls and under windows.
- For a real design, run a Manual J load calc — this is a quick sizing estimate.

## Tests

```
node tests/selftest.mjs
```

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
