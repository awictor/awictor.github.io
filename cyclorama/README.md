# Cyclorama

**Paint one still image. Watch it come alive with color cycling.**

Cyclorama is a single-file, zero-dependency indexed-palette pixel-art studio built around the lost art of **color cycling** — the Mark Ferrari / "Living Worlds" technique. You paint a static scene using an indexed palette, then mark ranges of palette slots as animated **cycle bands**. The engine rotates only the palette entries each frame, so a single non-moving bitmap turns into flowing waterfalls, crackling campfires, chasing marquee lights, drifting aurora, and rippling plasma — at buttery frame rates with almost no CPU.

## Why it's cool

No timeline. No onion-skinning. No per-frame drawing. The animation is a property of the **palette**, not the pixels: each frame only ~256 colors change, never the thousands of pixels on screen. That's the whole trick behind 1990s adventure-game backgrounds that seemed to move on hardware that couldn't afford real animation — and it still looks great. Seeing a waterfall flow out of a bitmap you never animated frame-by-frame is a genuine surprise.

Everything runs in one `index.html` (~60 KB). No build step, no network calls, no accounts.

## Run it

Open `index.html` in any modern browser — double-click it or drag it into a tab. That's it.

A waterfall starter scene loads and animates immediately. Click any gallery thumbnail (top bar) to load another starter. Share links restore automatically from the URL hash (`#...`).

Optional, if you prefer serving over HTTP (needed for the share-link feature to produce clean `http(s)` URLs — see notes):

```
python3 -m http.server 8000
# then open http://localhost:8000/index.html
```

## Features

- **Indexed-color engine** — a framebuffer of palette indices is blitted through a color lookup table; palette rotation happens per animation frame, so animation cost is independent of canvas size.
- **Paint tools** — pencil, line, rectangle, ellipse, flood fill, and eyedropper, with adjustable brush size, live shape preview, and an optional mirror-X symmetry axis. All operate on palette indices.
- **Palette editor** — click a swatch to recolor it with an HSV square + hue-bar picker (or type a hex value).
- **Cycle bands** — drag-select a contiguous range of swatches (click, then Shift-click) and turn it into an animated band with its own rate, direction (forward / reverse), and ping-pong mode. Multiple bands animate independently.
- **Recipe presets** — one click fills a range with a fire / water / chase / aurora / plasma ramp plus a sensible band.
- **Seamless loops** — the loop period is computed from the least-common-multiple of active band lengths, so playback and exports loop perfectly. Global speed control, play/pause, and a scrub bar.
- **Exporters** — PNG of the current frame, and a fully self-contained, perfectly-looping animated GIF (pure-JS LZW encoder, one cycle period).
- **Shareable URL hash** — canvas size, RLE-compressed index data, palette, and band definitions are packed to base64url, so any artwork restores from a link. A live meter shows the link size and warns before it gets too large.
- **Image import** — drop a PNG/JPG (or use Import); it's auto-quantized to an indexed palette (median cut), hue-sorted so gradients become contiguous, and Cyclorama even suggests a cycle band.
- **Undo/redo, canvas resize, and keyboard shortcuts for every tool.**

## Controls

| Action | Control |
|---|---|
| Pencil / Line / Rect / Ellipse / Fill / Eyedropper | `P` / `L` / `R` / `E` / `F` / `I` (or toolbar) |
| Mirror-X | `M` |
| Brush size | `[` / `]` |
| Play / pause | `Space` (or the transport button) |
| Undo / redo | `Ctrl/Cmd+Z` / `Ctrl/Cmd+Y` (or `Shift+Z`) |
| Export PNG / GIF | `S` / `G` (or footer buttons) |
| Zoom | Scroll over the canvas |
| Pan | Middle-drag |
| Recolor a swatch | Click it, then use the picker or hex field |
| Select a swatch range | Click a swatch, then Shift-click another |

## URL-hash format (notes)

The share hash is a base64url-encoded byte stream: a version byte, canvas width/height (uint16), the palette (length byte + RGB triples), the band list (low, high, rate×100 as uint16, and a flag byte for reverse/ping-pong/enabled), followed by the index buffer run-length encoded as `(uint16 run, byte value)` pairs. Large canvases with noisy (non-run-friendly) pixels make longer links; the in-app meter warns past a safe ~8000-character budget.

**Sharing over `file://`:** when you open the page directly from disk, the share link uses the full `file://` path so it still reopens on your machine. To generate portable `http(s)` links for others, serve the file over a local/remote web server (see Run it).

**"OG frame" button:** this sets a preview image for the current tab only. Social/link-preview crawlers read the page's static `<meta>` image, so a pasted share link won't carry a runtime frame — the button is a local convenience, not a social-preview publisher.

## Credit

Color cycling as an art form was popularized by **Mark Ferrari** and the LucasArts era of hand-painted game backgrounds ("8 Bit Time Machine" / "Living Worlds"). Cyclorama is a small tribute to that technique.

## License

MIT — see [LICENSE](LICENSE). Copyright (c) 2026 Alex Wictor.
