# Haymaker

**A twin-stick arena survivor where your only weapon is a wrecking ball on an elastic chain. Move to swing. Swing to shatter.**

You never shoot. You pilot a tiny weightless core, and trailing behind you on a spring-damped tether is a heavy iron ball. The ball has real momentum, drag, and spring restitution, so *the way you move is the way you attack*: dash left then whip right and the ball scythes through a crowd; orbit a boss and it becomes a buzzsaw; recoil off a wall and it rebounds like a pendulum. The ball only deals damage proportional to its impact speed, so a ball at rest is harmless and every kill is a momentum-earned smack.

One HTML file. No dependencies, no build step, no network calls.

## Why it's cool

The tether-as-weapon control scheme is the whole game. Attacking by managing momentum feels like cracking a whip, and mastery emerges without a tutorial — you're bonking enemies within a few seconds, but chaining swings for combo multipliers and "loading" the tether before a crowd takes practice. It's built to be juicy: impact-scaled screen shake, hit-stop freeze frames on heavy hits, chromatic aberration flashes, sparks and debris, expanding shockwave rings, and a chain that glows hotter the faster the ball moves.

## Features

- **Elastic-tether physics** — a fixed 120 Hz, sub-stepped semi-implicit spring integrator with damping, air drag, and a hard max-stretch clamp so it never explodes or oscillates. All tuning lives in one `K` constants object.
- **Movement is combat** — damage scales with the ball's impact speed; below a threshold it only nudges. No projectiles, ever.
- **Momentum combo + LOAD meter** — consecutive kills stack a multiplier while the ball stays fast; whipping the ball fills a LOAD meter you can spend.
- **Overload finisher** — max the LOAD meter and spend it for a white-hot, wider ball plus an immediate screen-clearing shockwave.
- **Three enemy archetypes + miniboss** — chasers swarm, splitters break into two on death, shielded orbiters must be hit from behind (front hits clank and reflect), and a hexagonal miniboss with an HP ring arrives every 5th wave.
- **Escalating endless waves** — seeded wave director ramps spawn rate, HP, and enemy mix, with a wave-clear bonus and a brief breather between waves.
- **Deterministic seeded runs** — every run is keyed off a shareable seed shown on the death screen and encoded in the URL hash (`#seed=...`). Paste a friend's URL to play their exact run. Per-seed local leaderboard.
- **Shareable score card** — a rendered stats card (score / best / wave / longest combo / peak ball speed) with copy-to-clipboard (image, text fallback) and PNG download, sharp on high-DPI displays.
- **Accessibility** — respects the OS `prefers-reduced-motion` setting on first load; in-game toggles for reduced motion, a colorblind-safe blue/orange palette, and sound. All persisted.
- **Plays anywhere** — keyboard, mouse, and touch share the same accel-capped skill curve. Auto-pauses when the tab loses focus. localStorage high score.

## Run it

Open `index.html` in any modern browser. That's it.

- Double-click the file, or drag it into a browser tab.
- Or serve the folder if you prefer: `python3 -m http.server` then visit `http://localhost:8000`.

No install, no build, no server required.

## Controls

| Action | Keyboard | Mouse | Touch |
| --- | --- | --- | --- |
| Move the core | `W` `A` `S` `D` / arrow keys | core follows the cursor | drag anywhere |
| Overload (when LOAD is full) | `Space` | — | two-finger tap |
| Pause | `P` or `Esc` | tap the pause glyph (top-right) | tap the pause glyph (top-right) |
| Restart run | `R` | — | Restart button on pause/game-over |
| Mute | Sound toggle in Settings | tap the speaker glyph (top-right) | tap the speaker glyph (top-right) |

**The core idea:** the heavy ball only hurts when it's *moving fast*. Whip it around and let momentum do the work — keep it moving to keep your combo warm, and load the tether before you swing into a crowd.

## License

MIT © Alex Wictor. See [LICENSE](LICENSE).
