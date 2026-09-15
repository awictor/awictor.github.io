# Fence Calculator

Estimate how many **posts, sections, rails and pickets** a fence needs from its length, post spacing and picket size. One offline HTML file, no signup, no tracking.

👉 **[Open Fence Calculator](https://awictor.github.io/fence-calc/)**

## How it estimates
Sections = ceil(length ÷ spacing); a straight run needs sections + 1 posts. Rails = sections × rails-per-section. Pickets = run length ÷ (picket width + gap), rounded up. Order ~10% extra for waste and gates.

## Tests
```
node tests/selftest.mjs
```
Pure functions (`sectionCount`, `postCount`, `railCount`, `picketCount`) are covered by headless tests — section rounding, posts = sections + 1, the zero-length case, rail and picket counts, no-gap pickets, spacing/rail/length monotonicity, and validation. CI runs them on every push.

## License
MIT © Alex Wictor

Part of the [Toolkit](https://awictor.github.io/toolkit/).
