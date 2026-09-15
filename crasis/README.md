# Crasis

**A tactile portmanteau forge — smash two words together at the seam.**

Type two words. Crasis ranks the best ways to fuse them into a portmanteau
(breakfast + lunch → brunch, smoke + fog → smog, spoon + fork → spork), then
lets you grab the seam and slide it letter by letter to forge your own. One
HTML file, no dependencies, no dictionary, no network.

## Why it's cool

Most word toys spit out a list and stop. Crasis makes the blend *tactile*: two
draggable cut handles — one per word — let you choose exactly where each word
breaks, and the fused word rebuilds live, tile by tile, as you slide. Halves are
colored by parent word, the shared overlap letters glow in a third hue, and you
can chain a blend back in as the next Word A to build triple- and quadruple-
blends. Every state is captured in the URL, so any blend is a shareable link.

Named after *crasis* — the linguistic term for contracting two words into one.

## Run it

No build step, no server, no install.

- Double-click `index.html`, or drag it into any modern browser tab.
- Or serve the folder and open it, e.g. `python -m http.server` then visit
  `http://localhost:8000`.

That's it. Everything (markup, styles, logic) lives in the single `index.html`.

## Controls

| Action | How |
| --- | --- |
| Set the two words | Type into **Word A** and **Word B** |
| Pick a ranked blend | Click a candidate tile (each shows a quality %) |
| Move a seam | Drag its handle, or focus it (Tab) and use **← / →** (or ↑ / ↓) |
| Random classic pair | **Shuffle** |
| Copy the blended word | **Copy word** |
| Save a shareable link | **Copy link** |
| Download a PNG "blend card" | **Export card** |
| Feed the blend back as Word A | **Chain → A** (a lineage breadcrumb appears; click any step to jump back) |

## How the ranking works

There's no pronunciation dictionary — scoring is a lightweight phonetic-ish
heuristic over every possible cut of A and B. A blend scores higher when it:

- shares overlapping letters at the seam (motor + hotel → **motel**);
- pivots from a consonant into a vowel at the join (the classic **spork**,
  **chil**ax feel);
- keeps a vowel in each retained half so both parts stay pronounceable;
- retains roughly half of each source word (recognizability);
- stays close to the length of the longer input (no bloated smush-ups).

The top candidates are shown with a blend-quality meter and percentage. It's a
heuristic, so treat the ranking as a strong suggestion, not gospel — dragging
the seam yourself is half the fun.

## Share format

State rides entirely in the URL hash as query-style parameters:

```
#a=<word A>&b=<word B>&ca=<cut in A>&cb=<cut in B>&h=<chain lineage>
```

- `ca` is how many letters of A are kept (from the start).
- `cb` is the index in B where the kept suffix begins.
- `h` (optional) encodes the chain lineage as `a.b.ca.cb` steps joined by `~`.

Opening a link restores both words, both cut positions, and the full chain.

## License

MIT — see [LICENSE](LICENSE). Author: Alex Wictor.
