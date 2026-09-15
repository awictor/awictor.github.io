# Buttonhook

**A top-down curling arcade where the throw is only the setup — the game is steering the rock *after* you let go.**

Most curling games simulate the throw and stop there. Buttonhook makes **sweeping** the whole game. Once a stone is live it slides under its own momentum, bleeds speed to friction, and hooks sideways from its spin (a Magnus-style curl). While it travels you sweep — which lowers friction (the rock runs farther) *and* straightens the hook (less lateral bend). Every shot is a live negotiation between those two dials on a stone you've already released.

Sweep early to carry weight past a guard. Hold sweep to kill the hook and run it straight. Lay off entirely to let it curl in behind cover. Rocks collide elastically, so takeouts, guards, and freezes all fall out of real momentum transfer.

One screen, one mechanic, zero dependencies.

## Features

- **Aim / weight / curl setup** — drag from the hack up the sheet to set direction and throwing weight; flip the curl handle (in-turn / out-turn).
- **Live dual-arc preview** — while aiming, a red banana line shows the un-swept hook and a blue line shows the fully-swept straight path, each with a ghost landing circle.
- **Sweeping as the core skill** — hold to sweep the live rock: reduces the sliding-friction coefficient and damps the curl drift, applied *after* release.
- **Sweep stamina** — a depleting/regenerating meter means you can't sweep the whole length of the sheet; it desaturates and flashes "Out of sweep" when empty.
- **Real physics** — fixed-timestep integrator, speed-proportional curl, and elastic equal-mass collisions; rocks past the back line or off the sides are removed.
- **Ends & scoring** — score by counting your rocks lying closer to the button than the opponent's nearest stone. Play a set number of ends against a heuristic opponent (draw-to-button vs. takeout by board state), with the hammer passing to the non-scorer.
- **Shareable seeded match** — seed, opponent style, number of ends, and starting hammer live in the URL hash, so the opponent's shots are reproducible. Copy the link to hand someone the same match.
- **Juice** — motion trails, slow-mo pinch and screen-shake on hard takeouts, particle spray, and a WebAudio pebble rumble + rock-clack synth. All motion effects respect `prefers-reduced-motion`.

## Run it

Zero dependencies, no build step. Open `index.html` in any modern browser:

- **Double-click** `index.html`, or
- Serve the folder, e.g. `python -m http.server` then visit `http://localhost:8000`.

Serving over `http://`/`https://` is recommended so the "Copy shareable match link" button can use the clipboard; on the `file://` double-click path it falls back to selecting the URL for manual copy.

## Controls

| Action | Input |
|---|---|
| Aim & set weight | Drag from the hack (bottom) up the sheet, release to throw |
| Sweep the live rock | Hold **mouse** or **Space** while it slides |
| Flip curl handle | **C**, or the In-turn / Out-turn buttons |
| Next end / play again | **Click** or **Space** on the scorecard |

**How to play:** longer drag = more weight (power). Sweep bleeds speed and straightens the hook — so sweep to carry a light stone farther, or to stop a heavy one from curling too much. Watch the two preview arcs to judge how much hook you're giving up.

## Scoring

After both players have thrown their rocks in an end, only stones inside the house (the rings) count. The team with the stone closest to the button wins the end and scores **one point for every one of its stones that is closer than the opponent's nearest stone**. If no stone is in the house, the end is blank. The hammer (last-rock advantage) passes to whoever did *not* score. Highest total after the configured number of ends wins.

## Match-link (URL hash) format

State is encoded in the hash so a link reproduces a match:

```
index.html#s=<seed>&o=<0|1|2>&e=<1-6>&h=<0|1>
```

- `s` — RNG seed driving the opponent's shots
- `o` — opponent style: `0` Sharp, `1` Steady, `2` Loose (aim noise)
- `e` — number of ends (1–6)
- `h` — starting hammer: `0` you, `1` rival

## License

MIT — see [LICENSE](LICENSE).
