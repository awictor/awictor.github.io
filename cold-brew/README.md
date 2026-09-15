# Cold Brew Coffee Ratio Calculator ☕

Dial in a cold brew batch: coffee grams from a water amount and ratio, water for a coffee amount, or the ratio of a batch you already made.

**[Open the app →](https://awictor.github.io/cold-brew/)**

- 100% offline — a single HTML file, no dependencies, no tracking
- Dark mode, keyboard-friendly, works on mobile
- Pure functions with a self-test suite

## How it works

A ratio is written **1 : N** — N parts water per 1 part coffee:

```
coffee = water ÷ N
water  = coffee × N
ratio  = water ÷ coffee
```

Tight ratios (**1:5–1:8**) make a **concentrate** to dilute (a 1:1 pour roughly doubles the volume); **1:15–1:17** brews **ready-to-drink**. Weigh in grams (1 ml water ≈ 1 g), use a coarse grind, and steep 12–24 h. Grounds hold back some liquid, so yield is a little less than the water you started with.

## Develop

```bash
node tests/selftest.mjs   # 10 checks
```

## License

MIT © Alex Wictor
