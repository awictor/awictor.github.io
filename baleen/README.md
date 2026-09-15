# Baleen

Filter-feed letters off a flowing stream and slam them into words before the drift buries you.

## Why it's cool

Baleen is a real-time word arcade built around one tactile mechanic. A current of letters drifts across the screen, weighted by real English letter frequency and seeded from the URL hash. You act like a baleen whale: strain the good letters out of the stream onto a 7-slot rack, then spell them into valid words for points. Every letter that slides off the far edge raises a "spillage" tide, and each word you land pushes it back. Miss too many and the tide crests the rack. It's keyboard-first (press a letter to snap-grab the nearest matching tile), fully deterministic per seed so runs are shareable and chaseable, and it's a single HTML file with zero dependencies.

## Features

- **Drifting letter current** — tiles enter from the right on a conveyor ribbon, spaced and frequency-weighted; speed ramps as your score climbs.
- **Snap-grab** — press a letter key (or tap a tile) to pull the nearest matching tile onto the rack. The rack rejects when full, forcing you to spend words.
- **Strain to score** — when the rack can spell a dictionary word (validated against an embedded ~3.3k-word list), Enter clears the best word for length-squared points plus a rarity bonus.
- **Spillage tide** — uncaught tiles raise a rising water line; it recedes with every word you land. Game over when it crests the rack.
- **Combo meter** — consecutive words within a shrinking window multiply your score and trigger a brief slow-mo "lunge feed."
- **Risk texture** — heat-colored rare letters (Q/Z/X/J/K) are worth bonus points; grey "bycatch" junk tiles clog rack slots but don't raise the tide if you let them slide.
- **Live rack readout** — the rack glows and shows how many words are ready plus your best available word, recomputed on every change.
- **Deterministic seeds** — the letter sequence is reproducible from the URL hash, with a copyable share link and a snapshot of your final run.
- **Touch support** — on touch/coarse-pointer devices, on-screen STRAIN and spit-back buttons appear so the game is fully playable without a keyboard.
- **Comfort** — respects `prefers-reduced-motion`: no screen shake, no slow-mo, and a steady edge vignette instead of a pulsing full-screen flash.

## Run it

No build step, no server, no network, no dependencies. Just open the file:

```
# double-click index.html, or:
open index.html        # macOS
xdg-open index.html    # Linux
start index.html       # Windows
```

Any modern browser works. To replay a specific run, add the seed to the URL, e.g. `index.html#123456`.

## Controls

Desktop (keyboard-first):

| Key | Action |
| --- | --- |
| any letter | snap-grab the nearest matching tile off the current |
| `Enter` | strain the rack's best valid word |
| `⌫` Backspace | spit the last tile back |

On the game-over card, `Enter` starts a new stream and `R` replays the current seed.

Touch: tap a tile to grab it; tap **STRAIN** to land your best word and **⌫** to return a tile.

## License

MIT — see [LICENSE](LICENSE).
