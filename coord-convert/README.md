# Coordinate Converter

Convert GPS coordinates between the three common formats — **decimal degrees (DD)**, **degrees-minutes-seconds (DMS)**, and **degrees decimal minutes (DDM)** — with hemisphere letters. For mapping, surveying, aviation, and marine navigation.

**[Open the tool →](https://awictor.github.io/coord-convert/)**

- Enter latitude/longitude in decimal degrees, get DMS and DDM instantly
- Correct hemisphere letters (N/S, E/W) and sign handling
- Range validation (±90 lat, ±180 lon)
- Dark mode with persistence
- 100% offline, no dependencies, no tracking

## Example

`40.7128, −74.0060` → `40°42′46.08″N, 74°0′21.6″W` (DMS) or `40°42.768′N, 74°0.36′W` (DDM).

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
