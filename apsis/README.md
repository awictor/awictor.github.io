# Apsis

**One thumb, one law of motion: orbit, release, and sling your way up an endless sky of pegs.**

You are a glowing mote captured in a tight circular orbit around a peg. Your only input is *when to let go*. Release and you fly off on a perfect tangent, coasting in a straight line until the next peg's capture field grabs you and locks you into a fresh orbit. Chain captures together to climb an endless, procedurally-seeded field of pegs. Fall past the rising danger line at the bottom and it's over.

## Why it's cool

The whole game is one tap. The entire *feel* emerges from a tiny physics kernel — angular velocity, a tangent release, and proximity capture — so it's trivial to explain, instantly readable on screen, and deep to master. No menus, no modes: just a pure skill curve, a shareable seed, and a best score to beat.

It's a single self-contained `index.html`. Zero dependencies, zero build step, no network calls.

## Features

- **One-key orbital mechanic.** You auto-orbit a peg at a fixed angular velocity; a single tap releases you on the tangent vector. You coast straight until you enter another peg's capture radius, which snaps you into a new orbit and preserves your spin direction.
- **Chain-climb scoring.** The camera follows your highest point. Tight, well-timed recaptures build a rising combo multiplier; a sloppy long coast or a wall bounce resets it.
- **Escalating difficulty.** As you climb, peg gaps widen, orbits spin faster, and occasional void gaps demand a committed long fling.
- **Five peg archetypes**, taught by a color legend on the title screen:
  - **orbit** (cyan) — a plain peg.
  - **crumbles** (orange) — vanishes shortly after you leave it.
  - **drifts** (violet) — slides side to side.
  - **shrinks** (yellow) — pulses smaller and larger.
  - **pulls** (green) — a gravity well that curves your coast.
- **Elastic side walls** keep play on-screen and add ricochet, and a thin danger line rises from the bottom to pressure you upward.
- **Juice.** Comet tail, radial burst and screen-shake on release, a ping ring and brief hitstop on capture, combo pips, wall particles, a parallax starfield, near-miss slow-mo, and WebAudio blips whose pitch rises with your combo.
- **Per-seed ghost racing.** Your best run for a seed is saved to `localStorage` and replayed as a faint comet — time-indexed, so it stays pace-correct on any refresh rate.
- **Shareable seeds.** Peg layout is deterministic from the URL hash (`#seed=...`). On death you get a rendered share card and the seed link (auto-copied where the browser allows).
- **Accessible touches.** High-DPI (Retina) rendering, digit-grouped scores, and `prefers-reduced-motion` support that damps screen-shake and parallax.

## Run it

No install, no build. Open the file in any modern browser:

```
# double-click index.html, or:
open index.html      # macOS
xdg-open index.html  # Linux
start index.html     # Windows
```

To play a specific layout, append a seed to the URL:

```
index.html#seed=abc123
```

## Controls

| Input | Action |
|-------|--------|
| **Space** / click / tap | Release from orbit (or start / restart) |
| **R** | Restart the current seed |
| Tap the card (on death) | Save the run's share card |

## How the chain works

1. You start in orbit around a peg, spinning at a fixed rate.
2. **Tap** to release — you leave on the tangent to your current orbit.
3. You coast in a straight line (side walls bounce you; gravity wells bend you).
4. Enter any peg's capture radius and you snap into a new orbit, keeping your spin direction.
5. Recapture quickly to grow your combo. Coast too long, or bounce off a wall, and the combo resets.
6. Keep climbing. Don't let the rising danger line catch you.

## License

MIT — see [LICENSE](LICENSE).
