# Osmolality

**Serum osmolality & osmolar gap calculator** — calculate serum osmolality from sodium, glucose, BUN (and ethanol), and the osmolar gap versus a measured value. One offline HTML file, no signup, no tracking.

👉 **[Open Osmolality](https://awictor.github.io/osmolality/)**

## Features
- Calculated osmolality: `2·Na + glucose/18 + BUN/2.8 (+ ethanol/3.7)` (US units)
- SI variant (`2·Na + glucose + urea`, mmol/L)
- Osmolar gap vs a measured value, with an elevated-gap flag
- Dark mode; 100% client-side

## Why
The osmolar gap is a key clue in toxicology (toxic alcohols) and fluid/electrolyte disorders. Osmolality computes the calculated value and the gap offline. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Not medical advice
Formulas and reference gaps vary by lab/method; interpretation is clinical.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`osmolality`, `osmolalitySI`, `osmolarGap`) are covered by headless tests — the ~290 baseline, glucose/BUN/ethanol terms, the SI formula, the osmolar gap, the Na ×2 weighting, monotonicity, a DKA-style high value, and validation. CI runs them on every push.

## License
MIT © Alex Wictor
