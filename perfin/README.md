# Perfin

**A seeded press that mints entire sheets of imaginary vintage postage stamps.**

Drop in a seed and Perfin prints a full gummed album page of postage for a country
that never existed — perforated die-cut edges, engraved ornamental frames, silhouette
vignettes, a fabricated nation, denomination, currency and issue year, all rendered as
crisp SVG in a contrast-guarded 2–3 ink palette on aged paper. The seed lives in the
URL hash, so every sheet is deterministic and shareable by link.

## Why it's cool

- Same seed always mints the same sheet — a sheet *is* its permalink.
- Every stamp is built the way an engraver would: perforation ring, layered filigree
  frame, iconic vignette, typeset country/denom/year — not a filter over a photo.
- Each seed is a tiny fictional nation with its own theme, palette and catalog number.
- Seeded rare varieties (inverted vignette, imperforate, missing-color, watermark) show
  up with a red rarity badge, just like real philatelic errors.
- Zero dependencies, no build, no network — one self-contained HTML file.

## Run

Open `index.html` in any modern browser — double-click it or drag it into a tab.
No server, build step, or network access required.

To load a specific sheet, append a seed to the URL hash:

```
index.html#ambergris
```

## Controls

| Control | What it does |
|---|---|
| **Seed field + Mint** | Type any text seed and render its sheet (Enter also works) |
| **New Seed** | Mint a random sheet |
| **‹ Prev / Next ›** (or ← / →) | Step through issues; curated seeds walk the catalog in order |
| **Postmarks: On/Off** | Toggle randomized cancellation marks across the sheet |
| **Hold to Light: Off/On** | Backlight the page to inspect for watermarks |
| **Copy Link** | Copy the current permalink to the clipboard |
| **Download SVG** | Save the whole sheet as vector SVG |
| **Download PNG** | Save the whole sheet as a 2× rasterized PNG |
| **Gallery strip** | Click (or focus + Enter) a curated thumbnail to load that issue |
| **Click a stamp** | Zoom to a magnified inspection view |

Inside the zoom overlay, use **← / →** to browse the current issue's stamps and
**Esc** (or click the backdrop) to close.

## How it works

A mulberry32 PRNG keyed off a hash of the seed drives every generator — country name,
series theme, palette, frame filigree, motif selection, denominations, postmarks and
rare varieties — so output is fully deterministic per seed. Stamps are assembled from
small parametric SVG helpers (perforation, frame, eight silhouette motifs, postmark)
rather than static art, which keeps the whole thing in one compact file.

## License

MIT — see [LICENSE](LICENSE).
