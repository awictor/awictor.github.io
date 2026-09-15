# Fence Picket Calculator 🚧

Count how many **pickets, posts, and rails** you need for a fence from its length, picket width, gap, and post spacing. Single offline HTML file, no dependencies, no data leaves your device.

## Features

- Pickets = length ÷ (picket width + gap), rounded up.
- Posts = length ÷ spacing + 1 end post.
- Rail lumber = length × rails high.
- Dark mode, mobile friendly, works fully offline.

## Usage

Open `index.html` in any browser. Enter fence length, picket width, gap, post spacing, and rails.

> Add extra for gates, corners, and waste — and check post spacing against local code.

## Development

```bash
node tests/selftest.mjs   # 10 checks
```

## License

MIT — see [LICENSE](LICENSE). Part of the [Toolkit](https://awictor.github.io/toolkit/).
