# Deck Footing Size 🕳️

Size a **deck footing** from the load a post carries and the soil under it: get the required bearing area and the minimum round footing diameter. Single HTML file, fully offline, nothing leaves your device.

## Why

Undersize a footing and the post punches into soft ground; oversize every one and you're mixing bags of concrete you didn't need across a dozen holes. The math is simple — load ÷ soil capacity — but the soil-bearing numbers live in the IRC and the area-to-diameter step trips people up. This does both.

## Use it

Open `index.html` in any browser, or use the hosted version:

- **Tool:** https://awictor.github.io/deck-footing/
- Enter the **tributary area** per post — roughly (beam span between posts) × (half the joist span).
- Set the **design load** (50 psf covers residential: 40 live + 10 dead).
- Pick the **soil type**.
- Read the footing diameter, the load on the post, and the required bearing area.

## How it works

- Load on a footing = tributary area × design load.
- Required bearing area = load ÷ soil bearing capacity (IRC Table R401.4.1: clay 1500 psf up to crystalline bedrock 12000 psf).
- Diameter of a round footing = 2 × √(area ÷ π), converted to inches and rounded up to the next tube size.
- Always confirm frost depth, a real soil test, and your building department's requirements.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
