# Butter Converter 🧈

Convert butter between US **sticks, cups, tablespoons, ounces, and grams** for baking and cooking.

**[Open the app →](https://awictor.github.io/butter-converter/)**

- 100% offline — a single HTML file, no dependencies, no tracking
- Dark mode, keyboard-friendly, works on mobile
- Pure functions with a self-test suite

## How it works

Everything converts through grams:

```
1 stick = 8 tbsp = ½ cup = 4 oz ≈ 113.4 g
```

This is **US** butter — a European block is usually 250 g, not exactly 4 sticks. Butter is measured by weight, so a "cup" assumes it's packed solid. For precise baking, weigh in grams.

## Develop

```bash
node tests/selftest.mjs   # 10 checks
```

## License

MIT © Alex Wictor
