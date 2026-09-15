# Skipjack

**One button. One stone. Read the water and keep it skipping.**

A single-screen arcade score-chaser built on one crisp mechanic: skipping a flat
stone across open water. The stone auto-travels and arcs down toward a living,
wave-rippled surface. You have exactly one input. Tap it the instant the stone
kisses the water to launch the next skip — the closer to the perfect contact
frame, the more energy the stone keeps, the tighter its arc, and the higher your
combo multiplier climbs. Tap too early and you waste the skip's momentum; let the
stone touch untapped and it sinks. Run over.

## Why it's cool

The skill is *reading the water*. The surface is a sum of layered sine swells, so
the contact point and the exact moment it arrives shift on every skip — you're not
memorizing a rhythm, you're perceiving a moving contact line and committing on a
single frame. Timing is judged against the real stone-vs-surface gap, not a
wall clock, so it stays fair as the waves get meaner. Runs are seeded from the URL
hash, so two people can share a link and duel on the exact same water, wind, and
hazard pattern.

One self-contained HTML file. No dependencies, no build step, no network.

## Run it

Open `index.html` in any modern browser:

- **Double-click** the file, or
- Serve the folder statically, e.g. `python -m http.server` then visit
  `http://localhost:8000/`.

Serving over `http(s)://` (rather than `file://`) is recommended so the "copy
challenge link" button can use the clipboard directly; under `file://` it falls
back to a manual copy prompt.

## Controls

| Input | Action |
|-------|--------|
| `SPACE` / tap | Launch the stone, then skip it at each water contact |
| `R` | Restart |

## Scoring

- **Distance** (meters) is your score; **combo** is your multiplier.
- Each contact is judged **PERFECT / GOOD / EARLY** by how close you tapped to the
  surface. Better timing keeps more energy, arcs tighter, and grows your combo. An
  early tap or an untapped contact ends the run.
- A rising combo lifts both your multiplier and the stone's speed, so the water
  gets choppier and wind adds horizontal drift the further you go.
- **Hazards** (logs, buoys) drift in on distance milestones and must be cleared
  with a Good or Perfect skip; clearing one grants bonus combo.
- Best distance and a replay "ghost" of your best run are stored per-seed in
  `localStorage`, so your personal best races alongside you on the same water.

## Shared runs

Every run has a seed in the URL (`index.html#seed=abcd12`). The **COPY CHALLENGE
LINK** button on the game-over card copies that URL — send it to someone and you
both play identical water, wind, and hazards. Distance decides the winner.

## Accessibility

Respects `prefers-reduced-motion`: when set, screen-shake, slow-motion, and the
full-screen flash on perfect skips are disabled or heavily attenuated.

## License

MIT — see [LICENSE](LICENSE).
