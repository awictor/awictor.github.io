# Timelapse Calculator 🎞️

Plan a timelapse: how many frames you'll shoot, how long the final clip runs, and the speed-up factor — from your interval and playback frame rate.

**[Open the app →](https://awictor.github.io/timelapse/)**

- 100% offline — a single HTML file, no dependencies, no tracking
- Dark mode, keyboard-friendly, works on mobile
- Pure functions with a self-test suite

## How it works

```
frames    = shoot duration ÷ interval
clip time = frames ÷ fps
shoot for = clip seconds × fps × interval   (target clip → shoot time)
```

An hour shot every 5 s is 720 frames, which at 24 fps plays back in 30 s — a **120×** speed-up. Shorter intervals give smoother, longer clips but fill the card faster; slower subjects (clouds, stars, construction) want longer intervals.

## Develop

```bash
node tests/selftest.mjs   # 10 checks
```

## License

MIT © Alex Wictor
