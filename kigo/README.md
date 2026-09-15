# Kigo

A calm, single-screen poem loom that weaves haiku which actually scan 5-7-5 — lock the lines you love, and turn a season dial to reweight its whole vocabulary.

## Why it's cool

*Kigo* (季語) is the seasonal word at the heart of a haiku. Here it's the mechanic: the central dial literally IS the season.

Most "poem generators" fake meter. Kigo doesn't. Every word in its banks carries its own syllable count and rhyme-group tag, and a small backtracking composer fills each line to hit its exact syllable budget — so a haiku lands on a true 5-7-5, a tanka on 5-7-5-7-7, and a couplet actually rhymes. Lines are assembled from a fixed set of grammar templates (determiner / adjective / noun / verb-phrase shapes), so results read like real, image-forward verse rather than word salad.

Then it becomes a tool you compose with: click a line to **lock** it and reroll only the rest, converging on a poem one line at a time. A seeded PRNG plus a compact URL hash means every poem is a reproducible, shareable permalink.

It's one HTML file. No build, no network, no dependencies.

## Features

- **Four forms, exact metrics** — haiku (5-7-5), tanka (5-7-5-7-7), rhymed couplet, and free verse. Each line is composed to hit its target syllable count precisely.
- **Syllable- and rhyme-tagged word banks** — scansion and couplet rhyme are exact from the data, not guessed at runtime. Slant-rhyme / assonance groups (OW / ITE / EAM) keep couplets sounding natural.
- **Lock-and-reroll** — pin the lines you love, reroll the rest until the poem is a keeper.
- **Season x mood dial** — spring / summer / autumn / winter crossed with still / luminous / melancholy / wild. Reweights vocabulary sampling AND re-tints the page live.
- **Shareable permalinks** — the URL hash encodes form, season, mood, rhyme seed, and per-line seeds + lock bits. Any poem you make is a permanent link. Mangled links fall back to a fresh poem instead of breaking.
- **Scansion overlay** — toggle per-word beat dots and a syllable count that turns red on any mismatch (it never does).
- **PNG export** — one tap renders the poem on its season-tinted paper with a seasonal glyph, dial label, and permalink. Long lines auto-shrink to stay inside the margins.
- **Kept-poems gallery** — save poems to `localStorage` and reload any of them later.
- Copy-to-clipboard, a quiet single-serif-column layout, `prefers-reduced-motion` support, and full keyboard control.

## Run it

Open `index.html` in any modern browser:

```
# from the project directory
open index.html      # macOS
xdg-open index.html  # Linux
start index.html     # Windows
```

Or just double-click the file. There is no build step, no server, and no network access — it works fully offline over `file://`.

## Controls

| Input | Action |
|---|---|
| Click a line | Lock / unlock that line |
| `Space` | Reroll the unlocked lines |
| `1`–`9` | Lock / unlock line *n* |
| `←` / `→` | Turn the season |
| `↑` / `↓` | Turn the mood |
| `f` | Cycle form (haiku -> tanka -> couplet -> free) |
| Season / mood pills | Set season and mood directly |
| `reroll` | Reroll unlocked lines |
| `form` | Cycle form |
| `scansion` | Toggle the per-word beat overlay |
| `copy` | Copy the poem text |
| `keep ♥` | Save the poem to the gallery |
| `↓ png` | Download the poem as a PNG card |

Every change updates the URL hash, so copy the link from your address bar to share the exact poem.

## How it works

- **Composer** — for each line, templates and word slots are shuffled with a season/mood-weighted key, then a recursive backtracking fill (`fill`) resamples slots until the line hits its exact syllable target. The final slot of a couplet is constrained to the chosen rhyme group.
- **Determinism** — a `mulberry32` PRNG seeded from the line's seed makes every poem reproducible; the same hash always rebuilds the same poem.
- **Serialization** — `ser` / `deser` pack the whole state into the hash and validate it on the way back in (form, seed ranges, line count, numeric seeds), so a corrupted or truncated link degrades gracefully to a fresh haiku.

## License

MIT — see [LICENSE](LICENSE).
