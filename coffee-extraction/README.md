# Coffee Extraction Calculator

Calculate coffee **extraction yield** percentage from dose, beverage weight, and TDS, with a Golden Cup rating.

**[Open the tool →](https://awictor.github.io/coffee-extraction/)**

- Extraction yield = (TDS% × beverage weight) ÷ dose
- Under / Ideal (18–22%) / Over-extracted verdict
- Solubles extracted and TDS-from-extraction inverse
- Dark mode, 100% offline, no dependencies, no tracking

## Example

20 g dose, 250 g cup, 1.35% TDS → ~16.9% (a touch under-extracted).

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
