# Bellows

**Watch your text get squeezed — a live, scrubbable DEFLATE (LZ77 + Huffman) visualizer.**

Bellows is a single HTML file, zero dependencies, no build step. Paste any text and
watch it compress in two animated stages, then decompress back and verify the
round-trip byte-for-byte. It's the algorithm inside every `.zip`, `.gz`, and `.png`,
made legible.

## Why it's cool

Compression is a black box almost every developer relies on daily but has never
actually watched *move*. Bellows shows the sliding match window hunting for
repeats, the Huffman tree snapping into shape from the rarest symbols up, and the
bit-ribbon streaming out — with a Shannon entropy floor drawn as the line you can't
cross. Feed it repetitive text and watch the ratio plummet; feed it random bytes and
watch it refuse to compress. That's information theory you can see.

## What it does

- **Stage 1 — LZ77 sliding window.** A search buffer scans backward for the longest
  match and emits `(distance, length)` back-references or literals. The source panel
  highlights the window, the lookahead, and the matched span in real time.
- **Stage 2 — Huffman coding.** Symbol frequencies build a prefix-code tree
  merge-by-merge (lowest frequency first), then each token becomes a colored segment
  in a scrolling bit-ribbon.
- **Reverse — the bellows expands.** The bit-stream is decoded back to the original
  bytes and verified exactly, ending on a "round-trip verified" keyframe.
- **Live stats.** Original bits, compressed bits, compression ratio, and the order-0
  Shannon entropy floor marked on the size bar.
- **Bidirectional hover linking.** Hover a source character, a token, a bit segment,
  or a tree leaf and every linked element lights up — including the root-to-leaf path
  through the tree.
- **A/B race.** Four preset inputs (repetitive, prose, source code, random) race their
  compressed sizes toward each input's entropy floor.
- **Challenge board.** Log runs to `localStorage` and rank them by compressibility.
- **Shareable.** The full run — input text, window size, max match, view mode, theme —
  is serialized into the URL hash. Copy the address bar to share an exact run.
- **Light/dark theme**, keyboard control, and a text/hex byte view.

## Run it

Open `index.html` in any modern browser — double-click it, or drag it into a tab.
That's the whole setup. Everything runs locally; nothing is uploaded.

If you prefer a local server:

```sh
python3 -m http.server 8000
# then visit http://localhost:8000/
```

## Controls

**Input**
- Type or paste text (capped at 3,000 characters for smooth animation), or drop a
  small **text** file onto the dropzone (`.txt`, `.md`, `.csv`, `.json`, source files…).
- **Window size** — how far back LZ77 may look for a match.
- **Max match** — the longest back-reference length allowed.
- **View** — render the source as text or as a hex/byte grid.
- **Presets** — Repetitive, English prose, Source code, Random bytes.

**Timeline / transport**

| Key | Action |
|-----|--------|
| `Space` | Play / pause |
| `←` / `→` | Step back / forward |
| `Home` / `End` | Jump to start / end |
| `T` | Toggle theme |

Keyboard shortcuts fire when focus is on the page body; while a slider, button, or
text field is focused, its native keys behave normally. Drag the scrubber or click a
phase pill (LZ77 · Build tree · Encode · Decompress) to jump between stages. The speed
slider sets playback rate.

## URL-hash sharing format

State is stored as a Base64-encoded JSON object in `location.hash`:

```json
{ "t": "<input text>", "w": <windowSize>, "m": <maxMatch>, "v": "text|bytes", "th": "dark|light" }
```

Loading a URL with a hash restores that exact run.

## A note on the concepts

- **Prefix codes.** No code is a prefix of another, so the bit-stream decodes
  unambiguously with no separators. Huffman builds the optimal one for the symbol
  frequencies: frequent symbols get short codes, rare ones get long codes.
- **The entropy floor.** Order-0 Shannon entropy is the average bits/symbol a coder
  needs if it only knows per-symbol frequencies. Huffman approaches it but can't beat
  it — *per symbol*. LZ77 gets underneath it by removing whole repeated spans before
  Huffman ever sees them, which is why structured text can dive below the floor and
  random bytes can't move at all.

## Implementation notes

Bellows implements a faithful, **simplified** DEFLATE: a greedy longest-match LZ77
(configurable window and max match, nearest-tie preference, overlapping matches) and a
canonical Huffman coder over a combined literal/length/distance/end alphabet, using
tree-path codes that round-trip exactly. It prioritizes clarity of animation over
producing byte-identical `gzip` output — the goal is to *see* the algorithm, not to
replace zlib.

## License

MIT — see [LICENSE](LICENSE).
