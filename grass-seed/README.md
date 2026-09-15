# Grass Seed Calculator 🌱

Work out how many pounds of grass seed you need from your lawn area and seeding rate — plus bags to buy and how much they cover. New lawn or overseed.

**[Open the app →](https://awictor.github.io/grass-seed/)**

- 100% offline — a single HTML file, no dependencies, no tracking
- Dark mode, keyboard-friendly, works on mobile
- Pure functions with a self-test suite

## How it works

```
pounds        = area ÷ 1000 × rate
area covered  = pounds ÷ rate × 1000
bags          = ceil(pounds ÷ bag size)
```

Rates are per 1000 sq ft: **overseeding** a thin lawn takes about half the rate of a **new lawn**, and fine seeds (Kentucky bluegrass) go down lighter than large tall-fescue seed — check the bag for the species rate. Too little leaves gaps; too much makes seedlings compete.

## Develop

```bash
node tests/selftest.mjs   # 10 checks
```

## License

MIT © Alex Wictor
