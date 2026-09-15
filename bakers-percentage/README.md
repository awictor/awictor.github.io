# Baker's Percentage Calculator 🍞

Turn a bread formula written in **baker's percentages** into real ingredient weights — water from hydration, salt, and levain relative to flour, plus total dough weight.

**[Open the app →](https://awictor.github.io/bakers-percentage/)**

- 100% offline — a single HTML file, no dependencies, no tracking
- Dark mode, keyboard-friendly, works on mobile
- Pure functions with a self-test suite

## How it works

Flour is always **100%**; every other ingredient is a percentage of the flour weight:

```
ingredient  = flour × percent ÷ 100
hydration % = water ÷ flour × 100
total dough = flour × (1 + sum of other percentages ÷ 100)
```

Hydration around 65% is a firm loaf, 75%+ an open crumb; salt ~2%; sourdough levain ~15–25%. Because everything scales off flour, you can resize a recipe just by changing the flour weight. Weigh in grams for repeatable results.

## Develop

```bash
node tests/selftest.mjs   # 10 checks
```

## License

MIT © Alex Wictor
