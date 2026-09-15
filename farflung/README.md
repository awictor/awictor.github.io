# Farflung

**Postcards from places that were never there.**

Type a few words and Farflung paints a vintage postcard from an imaginary place — its own name, country, postage stamp, postmark, and a handwritten "wish you were here." Same words always make the same card, so the URL is the card: send someone a link and they see exactly what you saw.

## Why it's cool

- **Fully deterministic.** A string-seeded PRNG drives everything — place name, country, stamp value, postmark date, the handwritten note, the whole landscape. The phrase is the seed, and the seed lives in the URL hash, so a shared link reproduces the identical postcard.
- **It's one file.** No build, no dependencies, no network. Everything — markup, styles, the generator, and the canvas renderer — is in a single `index.html`.
- **A tiny believable world per phrase.** Five cozy biomes (misted coast, dune sea, alpine lake, reed marsh, aurora tundra), each with its own limited palette, layered silhouette hills, water reflection, paper grain, and a matching stamp motif.

## Features

- Seeded generation — same words = same card, every time
- Procedural place names + countries via a syllable/affix grammar, plus an invented denomination and postmark date
- Layered canvas landscape across 5 biomes with time-of-day lighting
- A perforated, biome-matched postage stamp and a circular postmark cancellation with curved town/date text
- A flip to the addressed reverse side: ruled address lines and a jittered handwritten note
- Live micro-motion (drifting clouds, twinkling stars, aurora ribbons, water shimmer) that freezes at the base frame for a clean PNG export, and respects `prefers-reduced-motion`
- A 4-leg "journey" strip of related places you can travel between
- Day → night Light slider plus Dawn / Day / Dusk / Nocturne presets
- Share via URL hash, plus New / Surprise me / Download PNG / Copy link

## Run it

Open `index.html` in any modern browser — double-click it, or serve the folder:

```sh
python3 -m http.server 8000
# then open http://localhost:8000
```

No install step and no dependencies.

## Controls

- **Type a phrase + Send** (or press Enter) — generate a postcard from your words
- **Surprise me** — generate from a random prompt
- **Click the card** (or **Flip**) — turn it over to the addressed back
- **Light slider / Dawn·Day·Dusk·Nocturne** — relight the same place from dawn to night
- **Journey strip** — click a thumbnail to travel to a related place; the four stops stay fixed while you move between them
- **Download PNG** — save the current side (front or back) as an image
- **Copy link** — copy a URL that regenerates the exact same card

## License

MIT — see [LICENSE](LICENSE).
