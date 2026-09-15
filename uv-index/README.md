# UV Index Sun Exposure Calculator ☀️

Estimate time to sunburn from the **UV index** and your **skin type**, plus how sunscreen **SPF** extends it and the UV risk category.

**[Open the app →](https://awictor.github.io/uv-index/)**

- 100% offline — a single HTML file, no dependencies, no tracking
- Dark mode, keyboard-friendly, works on mobile
- Pure functions with a self-test suite

## How it works

```
burn time (min) = skin base ÷ UV index
with SPF        = burn time × SPF
```

Higher UV burns faster; SPF multiplies your safe time (in theory — real protection is less because sunscreen is under-applied). Risk bands: 0–2 Low, 3–5 Moderate, 6–7 High, 8–10 Very High, 11+ Extreme. A rough guide, not medical advice — reapply every 2 hours and seek shade at midday.

## Develop

```bash
node tests/selftest.mjs   # 10 checks
```

## License

MIT © Alex Wictor
