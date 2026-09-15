# Tap Code

A single-file, offline **Tap Code** translator. Encode text into the 5×5 Polybius knock cipher (row taps, then column taps) and decode it back — the cipher famously used by POWs to communicate through walls.

**Live:** https://awictor.github.io/tap-code/

## Features

- **Text → Taps** and **Taps → Text**
- 5×5 Polybius square with **K sharing C**
- Taps shown as dot groups (e.g. `• •••` for C)
- Reference grid displayed
- Dark mode, 100% offline, zero dependencies

## Example

`WATER` → `••••• ••  •  ••••  ••••  •  ••••• ••••  ••` (row/column tap groups).

## Tests

```
node tests/selftest.mjs
```

10 checks including the K→C sharing, full round-trips, and the WATER encoding. No dependencies.

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
