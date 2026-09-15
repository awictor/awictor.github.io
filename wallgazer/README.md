# Wallgazer

**Type a secret. Get a wall of noise. Relax your eyes and watch it float.**

Wallgazer is a single-file autostereogram (Magic Eye) generator. You type a word
or pick a shape, and it renders a Single-Image Random-Dot Stereogram (SIRDS): to
the naked eye it's just static, but relax your gaze and a 3D message rises out of
the surface. The whole state lives in the URL hash, so a link reproduces the exact
same hidden image for whoever you send it to.

No build, no dependencies, no network calls. One HTML file.

## Why it's cool

Autostereograms are pure nostalgic magic, but most online generators are clunky
multi-file apps or dead Java applets. This is one file you can read in a sitting.
It turns your own words into a hidden 3D message and hands you a share link — and
for the ~10% of people who can't free-fuse, the **Reveal** button plays a
wiggle-gram (two parallax frames alternated) so the shape is unmistakable without
any eye tricks. Nobody walks away frustrated.

## Run it

Open `index.html` in any modern browser — double-click it, or drag it into a tab.
That's the whole setup.

## How to see the hidden image

1. Type a word (or tap a preset) and let the noise render.
2. Look **through** the screen, as if focusing on a wall behind it, until the two
   guide dots above the image drift into **three**. Hold that focus and the hidden
   3D message floats up out of the noise.
3. Prefer crossing your eyes? Switch **Fusion mode** to *Cross-eyed* — focus in
   *front* of the screen instead. The depth is inverted so it fuses correctly.
4. Can't free-fuse at all? Hit **Reveal (wiggle)** to see it as animated 3D motion,
   or **Depth peek** to see the source shape in the corner.

Free-fusing takes practice. The guide dots and Reveal are there so you always get
the payoff.

## Controls

- **Secret message** — any short word; the text is rendered as raised glyphs and
  auto-scaled to fit. Clear it and the coach line tells you what to type.
- **Presets** — MARRY ME, HELLO, LOVE, and heart / star / ring shapes.
- **Depth strength** — how far the shape stands out.
- **Eye separation** — the pattern period; also the spacing of the guide dots.
- **Dot density / Contrast** — texture of the noise field.
- **Dot theme** — mono or colored dots.
- **Fusion mode** — wall-eyed (diverge) or cross-eyed (converge).
- **New noise pattern** — reseeds the RNG for a different-looking wall of the same
  hidden image. The seed is reproducible and saved in the link.

## Sharing & export

- **Copy link** — puts the full state (message + all settings + seed) in the URL
  hash. Anyone who opens it sees the identical stereogram.
- **Save PNG** — downloads the current image.
- **Printable card** — opens a print-ready page with fusing instructions.

## How it works

The typed text or shape is drawn to an offscreen canvas and read as a depth map
(with the edges feathered by a box blur to suppress ghosting). The SIRDS engine
renders it row by row using the Thimbleby–Inglis–Witten "same-links" algorithm
with proper hidden-surface/occlusion handling, so the shape reads cleanly instead
of smearing. The canvas is drawn at device-pixel resolution and never scaled or
interpolated — autostereograms need 1:1 pixel fidelity to fuse — and it re-renders
at the display width on resize so it fits phones without breaking the depth
encoding.

## License

MIT — see [LICENSE](LICENSE).
