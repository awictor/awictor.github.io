# Undersong

Find the poem hiding inside any text — keep the words you want, redact the rest, and watch an ink river thread your found poem together.

Undersong is a single-file, zero-dependency blackout / erasure poetry composer. Paste a paragraph (or load a bundled public-domain passage) and it lays the words out as a justified "page." Click the words you want to **keep**; every other word collapses into a marker-ink redaction bar. The kept words, read in their original order, become a found poem — and a hand-roughened SVG "ink river" animates from each surviving word to the next, the way connecting doodles thread through classic blackout poetry.

## Why it's cool

The same paragraph hides a thousand different poems. Undersong makes finding one a tactile gesture instead of a chore: click to keep, watch the river redraw, read the result in the side panel. Every composition is fully encoded in the URL hash (source text + a bitmask of kept words), so **any poem you make is a link** that reconstructs the exact page and erasure — no backend, no accounts, no build step. Open the file, make something, copy the link, done.

## Run it

Open `index.html` in any modern browser — double-click it, or drag it into a tab. That's the whole install. No dependencies, no build, no network calls.

On first load it auto-loads a curated gallery erasure so you see the effect immediately.

> Note: the Share / Copy buttons use the Clipboard API, which browsers only expose on secure contexts (`file://` and `https://`). If you serve the file over plain `http://` from a LAN IP, Undersong falls back to a manual copy (and Share shows the link in a toast so you can copy it by hand).

## Controls

- **Click a word** — toggle keep / redact. Kept words are inked dark and joined by the river; redacted words collapse into a bar.
- **Keyboard** — arrow keys move between words (up/down jump rows), Space or Enter toggles keep on the focused word.
- **Sample dropdown** — load a bundled public-domain passage (Thoreau, Melville, Dickinson).
- **Paste text…** — drop in your own prose or verse.
- **✦ Séance** — auto-erase a plausible starting draft (favors short, evocative, well-spaced words), then refine by clicking.
- **▷ Reveal** — cinematic playback: dims the kept words, then spotlights them in order while the river draws itself. Click again (now **■ Stop**) to end it early.
- **Clear** — un-keep every word.
- **Redaction style** — Marker bar, Scribble hatch, or Soft fade. The choice is honored in exports too.
- **River: on / off** — toggle the connecting ink river.
- **🔗 Share** — copy a permalink that rebuilds the exact composition.
- **⬇ PNG / SVG** — download the composed page (bars, kept text, and baked river) as an image.

## How the permalink works

State lives entirely in the URL hash:

- `#s=<sampleId>&k=<bitmask>` when a bundled passage is loaded (compact — only the sample id travels).
- `#t=<base64 source>&k=<bitmask>` for pasted text (the full source is encoded, so long passages make long links).

The `k` bitmask is index-aligned to a deterministic tokenizer, so reopening a link reconstructs the identical erasure. A malformed or truncated link degrades gracefully — it loads the source text unredacted rather than blanking the page.

## Notes

- Unicode-aware tokenizer: accented and non-Latin words (`café`, `naïve`, `Zoë`) are treated as whole words.
- Respects `prefers-reduced-motion`: the reveal sweep and river draw jump to their end-state instead of animating.
- Responsive: on narrow screens the poem panel stacks below the page and the view scrolls.

## License

MIT — see [LICENSE](LICENSE).
