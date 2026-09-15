# Concrete Column Calculator 🏗️

Work out the concrete for a round column or **Sonotube** form: volume in cubic feet and yards, and bags to buy — for deck piers, fence posts, and footings.

**[Open the app →](https://awictor.github.io/sonotube/)**

- 100% offline — a single HTML file, no dependencies, no tracking
- Dark mode, keyboard-friendly, works on mobile
- Pure functions with a self-test suite

## How it works

```
one column = π · (diameter/2)² · height ÷ 1728   (cu ft)
cubic yards = cu ft ÷ 27
bags        = ceil(cu ft ÷ bag yield)
```

Multiply by the number of columns. An 80 lb bag yields ~0.60 cu ft, a 60 lb bag ~0.45; ready-mix is ordered by the cubic yard. Mix a little extra, dig below the frost line, and set anchors while the concrete is wet.

## Develop

```bash
node tests/selftest.mjs   # 10 checks
```

## License

MIT © Alex Wictor
