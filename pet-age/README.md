# PetAge

**Dog & cat age in human years** — enter your pet's age and get its "human years" from the AKC size-based guideline, plus the 2020 epigenetic formula for dogs. One offline HTML file, no signup, no tracking.

👉 **[Open PetAge](https://awictor.github.io/pet-age/)**

## Features
- Dogs by size (small / medium / large) and cats
- AKC method: year 1 ≈ 15, year 2 ≈ 24, then 4–6 per year (dogs) / 4 per year (cats)
- Bonus: the 2020 epigenetic clock `16·ln(age) + 31` for dogs
- Dark mode; 100% client-side

## Why
"Dog years × 7" is a myth — pets age fast early then slow down, and size matters. PetAge uses the modern AKC guideline and the research-based epigenetic formula for a better estimate, offline. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Note
A fun estimate, not veterinary advice. Real aging varies by breed, health, and individual.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`dogYears`, `catYears`, `epigenetic`) are covered by headless tests — the first-two-years anchors, size scaling after year 2, the puppy-linear case, cat years, the `16·ln+31` formula, monotonicity, and validation. CI runs them on every push.

## License
MIT © Alex Wictor
