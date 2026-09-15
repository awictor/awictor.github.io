# DownloadTime

**File transfer time calculator** — enter a file size and your connection speed to see how long a download (or upload) will take, humanized into days/hours/minutes/seconds. One offline HTML file, no signup, no tracking.

👉 **[Open DownloadTime](https://awictor.github.io/download-time/)**

## Features
- Size in B/KB/MB/GB/TB, speed in bps/Kbps/Mbps/Gbps — with the bits-vs-bytes ×8 handled for you
- Humanized result (e.g. `1h 1m 1s`)
- One-tap connection presets (cable, gigabit, 4G, dial-up)
- Dark mode; 100% client-side

## Why
"How long will 700 MB take on 50 Mbps?" trips people up because sizes are in bytes and speeds are in bits. DownloadTime does the conversion and the math instantly, offline. Part of the [Toolkit](https://awictor.github.io/toolkit/).

## Tests
```
node tests/selftest.mjs
```
Pure functions (`transferSeconds`, `humanize`) are covered by headless tests — the 1 GB/100 Mbps = 80 s case, the ×8 bits/bytes factor, unit and value validation, and humanization from sub-second up to days. CI runs them on every push.

## License
MIT © Alex Wictor
