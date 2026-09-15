# Bitrate Calculator

Work out the **bitrate** for a target file size and duration, the **file size** a bitrate produces, the **duration** a size allows, or the **video bitrate** to hit a target size after accounting for audio.

**[Open the tool →](https://awictor.github.io/bitrate-calc/)**

- Solve for bitrate, file size, duration, or video bitrate
- Decimal units (1 MB = 8,000 kb) — matches encoder conventions
- Subtracts audio to give the video bitrate for two-pass targets
- Dark mode, 100% offline, no dependencies, no tracking

## Example

700 MB over 90 minutes ≈ 1,037 kbps total. Reserve 128 kbps for audio → feed ~909 kbps to video.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
