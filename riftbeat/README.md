# Riftbeat

**Every seed is a song. Every song charts itself.**

A zero-dependency, single-file lane rhythm game (DDR / Guitar Hero style) built on Canvas + WebAudio. Type a seed; the game **composes a chiptune from it in code** and **derives the falling-note chart from that synth's own scheduled note-onsets** — so notes always land on the beat because they *are* the beat. No audio files, no build step, no network.

## Why it's cool

Most rhythm games ship hand-authored charts and audio. Riftbeat ships neither. One URL seed deterministically produces both:

- A **structured chiptune** — square lead, triangle bass, sine kick, noise snare/hat — over a constrained scale/tempo palette, arranged intro → verse → chorus → drop → outro with rising intensity.
- A **chart auto-extracted from that synth's onsets** — pitch mapped to lane, quantized to the grid, with a per-lane jack-gap guard and a concurrency cap so Expert stays humanly playable.

Because the chart *is* the music's own onset stream, timing is inherent, not tuned. Sharing a level is just sharing a URL.

## Run it

Open `index.html` in any modern browser (Chrome, Edge, Firefox, Safari). That's it — no server, no install.

1. Type a seed (or hit **Reroll**).
2. Pick a difficulty, scroll speed, and any mods.
3. Click **TAP TO PLAY** — the click is the required WebAudio user gesture.

Optionally run **Calibrate Latency** first to measure your audio + input delay; the offset is applied to every judgment.

## Controls

| Lanes | Keys |
|-------|------|
| 4 (Easy/Normal) | `D` `F` `J` `K` |
| 5 (Hard)        | `D` `F` `Space` `J` `K` |
| 6 (Expert)      | `S` `D` `F` `J` `K` `L` |

Keys are bound by **physical position** (via `KeyboardEvent.code`), so the layout is identical on QWERTY, AZERTY, Dvorak, and QWERTZ. You can also tap/click the lanes with mouse or touch — hold notes require sustained contact.

- **Esc** — pause / resume
- **R** — restart the current run
- Timing grades: **Perfect / Great / Good / Miss**, with combo-multiplied scoring, live accuracy %, and an HP/fail meter (misses drain, clean hits recover; hit zero and the song fails early).

## Difficulty & mods

| Difficulty | Lanes | Notes |
|------------|-------|-------|
| Easy   | 4 | Sparse, slow scroll, forgiving windows |
| Normal | 4 | Moderate density |
| Hard   | 5 | Dense, adds hold notes, tighter windows |
| Expert | 6 | Densest, fast scroll, tightest windows |

| Mod | Effect |
|-----|--------|
| **Mirror** | Flips the lane layout left↔right |
| **Fader / Hidden** | Notes fade out near the judgment line |
| **Ghost Race** | Races a translucent ghost of a saved/shared run with a live score delta |

## Sharing & persistence

Seed, difficulty, scroll speed, calibration offset, and mods all live in the URL hash, so any run is deterministic and shareable:

- **Copy Link** (menu) — shares the current setup.
- **Copy Ghost Link** (results) — packs your run's per-note judgments into the URL so a friend can race your ghost.

Per-seed best score, grade, and ghost are saved to `localStorage`.

## Accessibility

- Respects `prefers-reduced-motion`: screen shake, particle bursts, and the pulsing record banner are disabled.
- Pinch-zoom is left enabled.
- Backgrounding the tab auto-pauses so throttled frames don't drop notes.

## How the seed → song → chart pipeline works

1. **RNG** — the seed is hashed (`xmur3`) and seeds a `mulberry32` PRNG, so every derived choice is deterministic.
2. **Composer** — picks BPM, scale, root, and a chord progression, then writes events per section with intensity-scaled density.
3. **Charter** — walks the composer's *chartable* onsets (lead + kick + snare), maps pitch register to lane, subsamples by section intensity and difficulty, enforces a min per-lane gap, and caps simultaneous notes.
4. **Judgment** — all timing keys off `AudioContext.currentTime` (the audio clock), minus your calibration offset — never frame time.

## License

MIT — see [LICENSE](LICENSE).
