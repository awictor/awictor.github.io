# Deck Beam Span 🪵

Find the **maximum allowable span of a wood deck beam** — and the smallest built-up beam that carries your joists — straight from IRC Table R507.5 (Southern Pine). Single HTML file, fully offline, nothing leaves your device.

## Why

Deck framing lives or dies by the beam between posts. Span the beam too far and it sags or fails; oversize it and you waste lumber and dig extra footings. The code tables that answer this are buried in the IRC and awkward to read on a jobsite. This tool turns them into two inputs.

## Use it

Open `index.html` in any browser, or use the hosted version:

- **Tool:** https://awictor.github.io/deck-beam-span/
- Pick your **beam size** (2- or 3-ply 2×6 through 2×12).
- Enter the **joist span** the beam carries (the tributary length of the joists framing into it).
- Read the max beam span, and the recommendation for the smallest beam that reaches a 10-ft post spacing.

## How it works

- Values follow **IRC 2018 Table R507.5** for Southern Pine at 40 psf live + 10 psf dead load, rounded to the nearest inch.
- Joist span rounds **up** to the next table column (6, 8, 10, 12, 14, 16, 18 ft): a 9-ft joist span reads from the 10-ft column.
- Longer joist spans mean more tributary load per foot of beam, so the allowable beam span drops.
- Always verify against your local amendments and the species/grade stamped on your actual lumber.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
