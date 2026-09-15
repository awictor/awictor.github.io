# RecipeScaler

**Scale recipe ingredients up or down** — paste a recipe, set the servings you have vs. the servings you want, and every quantity is re-scaled into clean cooking fractions (`1/2`, `3/4`, `1 1/3`…). Handles mixed numbers, decimals, and unicode fractions (½, ¾). One offline HTML file, no signup, no tracking.

👉 **[Open RecipeScaler](https://awictor.github.io/recipe-scaler/)**

## Features
- Scale by servings ratio, or one tap to halve / double / triple
- Results snap to real cooking fractions (halves, thirds, quarters, sixths, eighths) — no "0.667 cups"
- Understands `1 1/2`, `3/4`, `0.5`, and `½`/`¾` unicode fractions
- Only the leading quantity is scaled — units, steps and headings pass through untouched
- Copy button, dark mode, remembers your recipe; 100% client-side; works offline

## Why
Doubling a recipe by hand means re-doing every fraction in your head and hoping you didn't turn ¾ into 1.5. RecipeScaler does it instantly and rounds to fractions you can actually measure. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`parseFraction`, `toFraction`, `scaleLine`, `scaleRecipe`, `scaleFactor`, `normalizeVulgar`) are covered by headless tests, including fraction round-trips and carry-to-whole rounding; CI runs them on every push.

## License
MIT © Alex Wictor
