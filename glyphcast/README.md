# Glyphcast

**Pour your words into a mold and watch them cast a picture — micrography in the browser.**

Glyphcast is a single-file, zero-dependency text-as-art studio. You type any text, pick a shape (a "mold"), and Glyphcast lays your words out *only where the shape is solid* — wrapping the source text continuously so the letters themselves trace and fill the form. From up close it's a readable block of your words; from a step back it *is* the picture. That's [micrography](https://en.wikipedia.org/wiki/Micrography), a centuries-old calligraphic craft, as a live web toy.

## Why it's cool

- Every creation encodes into the URL hash, so a finished piece is just a link — send someone a heart made of the message you wrote them.
- It reads as one system: type, tune, share. No accounts, no upload, no build step, no network calls.
- The whole thing is ~360 lines in one `index.html`. Open it and read it.

## Run it

No server, no install, no build.

```
Open index.html in any modern browser — double-click it, or drag it into a tab.
```

To reopen a saved piece, paste a Glyphcast `#...` link into the address bar (or use **Copy link** to make one). The full state reconstructs from the hash.

## How it works

Each mold is drawn onto an offscreen canvas and sampled by pixel alpha to build an inside/outside mask. Glyphcast then walks a monospace character grid row by row, placing your source text only in cells that fall inside the silhouette, wrapping the text to keep filling the shape. Font metrics come from a measuring canvas so glyphs land inside the outline instead of bleeding past it.

## Controls

- **Your words** — the source text poured into the mold.
- **Mold** — built-in silhouettes (heart, star, spiral, cat, wave, leaf, skull, speech bubble) or **Type your own** to mold text into any big glyph, short word, or emoji.
- **Font size** — character size (disabled while Auto-fit is on).
- **Line / Letter** — line-height and letter spacing of the grid.
- **Ink / Background** — colors. When a gradient is active, Ink becomes the gradient's base hue and the label updates to say so.
- **Gradient** — solid ink, or a positional hue sweep (left→right, top→bottom, or radial) derived from your ink color.
- **Fill** — *Repeat to fill* loops your text until the mold is full; *Fit once* places your text a single time.
- **Auto-fit text to mold** — picks a font size so your text roughly fills the shape in one pass.
- **Density ink (crisp edges)** — bolds and darkens boundary characters so the silhouette's edge stays sharp.
- **Typewriter pour reveal** — animates the cast filling in character by character (skipped automatically if your OS is set to reduce motion; the *Record pour* button still animates on demand).

The indicator under the controls reports how many character slots the mold holds and how many times your text repeats (or, in *Fit once* mode, what percentage of your text was placed).

## Export & share

- **Export PNG** — high-resolution (2×) render of the cast.
- **Share card** — a framed, captioned PNG with the title, mold name, and a snippet of your source text.
- **Copy link** — copies a URL that reconstructs the exact piece.
- **Record pour** — captures the typewriter animation to a WebM video (where the browser supports `MediaRecorder` / `captureStream`).

## License

MIT — see [LICENSE](LICENSE). Author: Alex Wictor.
