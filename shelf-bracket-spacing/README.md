# Shelf Bracket Spacing 🪚

Work out how many shelf **brackets** you need and their spacing from shelf length and the material's safe span. Single offline HTML file, no dependencies, no data leaves your device.

## Use it

Open `index.html` in any browser, or visit the [live version](https://awictor.github.io/shelf-bracket-spacing/).

Enter the shelf length and pick the material. You get the number of brackets, spacing between them, and the safe span.

## How it works

- Each shelf material has a safe span before it sags — particleboard the least, steel the most.
- Brackets = ceil(length ÷ safe span) + 1, so the gap between any two never exceeds the span.
- Spacing = length ÷ (brackets − 1); set the end brackets a few inches in and let the shelf overhang slightly.
- Fasten into studs — a bracket in drywall alone pulls out under load.

## Tests

```
node tests/selftest.mjs
```

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
