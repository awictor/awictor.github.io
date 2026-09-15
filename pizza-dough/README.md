# Pizza Dough Calculator

**Baker's-percentage pizza dough recipes.** Choose how many dough balls and their weight, set hydration and salt/yeast/oil percentages, and get exact flour/water/salt/yeast/oil weights. One offline HTML file, no signup, no tracking.

👉 **[Open Pizza Dough Calculator](https://awictor.github.io/pizza-dough/)**

## Features
- Baker's percentages (everything relative to flour = 100%)
- Total dough = balls × ball weight; ingredients back-solved from it
- Style presets: Neapolitan, NY, Pan/focaccia, Detroit
- Dark mode; 100% client-side

## The math
Total dough is split so that `flour = total / (1 + hydration + salt + yeast + oil)` (as fractions), then each ingredient = flour × its percentage. Water ÷ flour always equals the hydration you set.

## Tests
```
node tests/selftest.mjs
```
The pure function (`doughRecipe`) is covered by headless tests — total = balls × weight, components summing to total, the single-ball flour formula, hydration/salt/oil ratios, linear scaling, and validation. CI runs them on every push.

## License
MIT © Alex Wictor
