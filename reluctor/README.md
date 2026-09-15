# Reluctor

**Flip your polarity to slalom a magnetic gauntlet — one key, no brakes.**

Reluctor is a single-file, one-button polarity-swap dodger. Your charged shuttle is
pinned to the center of a vertical shaft while the world scrolls past, faster and
faster. You never steer directly. You flip your charge between **red** and **blue**,
and magnetism does the steering:

- **Same color repels** — a node of your color shoves the shuttle away.
- **Opposite color attracts** — a node of the other color pulls the shuttle in.

You thread the shaft purely by choosing *when* to flip, inviting the force that pushes
you where you need to be. One collision ends the run.

## Why it's cool

The input is dead simple, but the ceiling is deep because you steer *indirectly* — you
aren't moving the shuttle, you're deciding which force to invite. Skimming a node's
dashed halo without touching its hot core banks a **graze** into a rising combo
multiplier, so near-death becomes the goal rather than something to avoid. Layouts are
seeded, so a run is reproducible and shareable: everyone playing today's Daily Challenge
faces the same gauntlet, and any run can be handed to a friend as a link.

## Run it

No build step, no dependencies, no network calls.

- **Double-click `index.html`** to open it in any modern browser, **or**
- Serve the folder and visit it, e.g.:
  ```
  python -m http.server 8000
  # then open http://localhost:8000
  ```

Serving over http/https (rather than `file://`) is only needed if you want the
**Copy Challenge Link** button to produce a shareable URL — everything else works fine
opened directly from disk.

## Controls

| Action | Keys / input |
|--------|--------------|
| Flip polarity | `Space` · `↑` · `W` · click · tap |
| Restart | `Space` · `R` (on the game-over screen) |
| Mute / unmute | `M`, or the speaker button (top-right) |

## Scoring

- Distance ticks up your score continuously; a higher combo multiplies the rate.
- **Graze** a node — pass through its dashed halo without hitting the solid hot core —
  to add points and raise your combo. Chained grazes escalate the multiplier (and the
  screen shake, particles, and rising blips that come with it).
- The combo decays if you go too long without a graze.
- Scroll speed, node density, and field strength all ramp with distance.

## Seeds & sharing

The URL hash selects the layout: `index.html#my-seed`. With no hash you get the
**Daily Challenge** — a date-derived seed that's identical for everyone on a given day.
Because layout generation runs on its own deterministic PRNG (kept separate from all
cosmetic randomness), the same seed always produces the same node field, regardless of
frame rate or how you play. Retrying a seed replays your best run on it as a translucent
**ghost** to race against.

## Accessibility

- Honors `prefers-reduced-motion`: screen shake and the pulsing edge glow are disabled
  and particle bursts are reduced, while the color/scale telegraphing that keeps the
  game readable stays intact.
- Sound is fully mutable (button + `M` key), and the preference persists.
- High score, ghost, and mute preference degrade gracefully to in-memory state if
  `localStorage` is unavailable (private mode, blocked storage, sandboxed iframes).

## License

MIT — see [LICENSE](LICENSE).
