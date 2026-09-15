# CookConvert

**Cooking measurement converter** — convert between cups, tablespoons, teaspoons, ml, grams, and ounces for common ingredients, using real densities so cups↔grams comes out right. One offline HTML file, no signup, no tracking.

👉 **[Open CookConvert](https://awictor.github.io/cook-convert/)**

## Features
- Volume ⇄ weight conversion driven by ingredient density (flour, sugar, butter, honey, and more)
- Volume↔volume and weight↔weight work regardless of ingredient (1 cup = 16 tbsp, 1 lb = 16 oz)
- Sensible built-in densities; dark mode; 100% client-side

## Why
Recipes mix volume and weight freely, and "1 cup of flour" is not the same grams as "1 cup of honey." CookConvert uses each ingredient's density to get the cross-conversion right, offline. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`toGrams`, `fromGrams`, `convert`) are covered by headless tests — water and flour cup→gram values, density-cancelling volume/weight conversions, weight→volume via density, round-trips, and validation of unknown ingredients/units and negative amounts. CI runs them on every push.

## License
MIT © Alex Wictor
