# MacroCalc

**Macronutrient calculator** — split your daily calories into grams of protein, carbs, and fat by ratio, with diet presets. One offline HTML file, no signup, no tracking.

👉 **[Open MacroCalc](https://awictor.github.io/macro-calc/)**

## Features
- Calories + a protein/carb/fat percentage split → grams (and kcal) per macro
- Presets: Balanced, Low-carb, High-protein, Keto — all editable
- Uses standard energy values (protein/carbs 4 kcal/g, fat 9 kcal/g)
- Warns when your percentages don't add to 100
- Dark mode, remembers your inputs
- 100% client-side; works offline

## Why
Once you know your calorie target, the next question is the split. MacroCalc turns a ratio into concrete daily grams. Pair it with [TDEECalc](https://awictor.github.io/tdee-calc/). Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
The pure `macroGrams` function is covered by headless regression tests, including that the macros' kcal reconstruct the total; CI runs them on every push.

## License
MIT © Alex Wictor
