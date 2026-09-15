# Timecode Calculator

Convert SMPTE **timecode** (`HH:MM:SS:FF`) to frame count and real seconds at any frame rate — and add timecodes together. Built for video editors, colorists, and anyone cutting to frames.

**[Open the tool →](https://awictor.github.io/timecode-calc/)**

- Timecode ↔ total frames ↔ real seconds
- Frame rates 23.976 / 24 / 25 / 30 / 50 / 60
- Add two timecodes with correct frame carry
- Non-drop-frame counting; guards invalid frame indices
- Dark mode, 100% offline, no dependencies, no tracking

## Example

`01:00:00:00` at 24 fps = 86,400 frames. `00:00:00:23` + `00:00:00:01` at 24 fps = `00:00:01:00`.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
