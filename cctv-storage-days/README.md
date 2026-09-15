# CCTV Storage 📹

Estimate how many days of security footage fit on an **NVR/DVR drive** from camera count, bitrate, and hours per day. Single offline HTML file, no dependencies, no data leaves your device.

## Use it

Open `index.html` in any browser, or visit the [live version](https://awictor.github.io/cctv-storage-days/).

Enter the drive size, camera count, per-camera bitrate, and recording hours per day. You get the days of retention and storage per day.

## How it works

- A 1 Mbps stream writes about 0.45 GB per hour (Mbps × 3600 ÷ 8 ÷ 1000).
- Daily storage = cameras × bitrate × 0.45 × recording hours; retention = drive GB ÷ daily storage.
- Motion-only recording can cut hours/day dramatically versus 24/7 continuous.
- Higher resolution and frame rate raise the bitrate — check each camera's actual stream setting, not its megapixels.

## Tests

```
node tests/selftest.mjs
```

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
