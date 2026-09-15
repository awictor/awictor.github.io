# Grapnel

**One button. One rope. Swing the endless chasm and never touch down.**

Grapnel is a single-file, zero-dependency arcade game about momentum. You are a
falling spark tearing sideways through an auto-scrolling chasm. There is exactly
one control: **press and hold** to fire a grappling line to the nearest ceiling
anchor and swing on it as a real pendulum; **release** to fling yourself off with
all the tangential speed you built.

## Why it's cool

The whole game lives in a single held button becoming a physical pendulum. While
you're attached it's gravity plus a distance constraint; the instant you let go
it's pure ballistic flight, launched along the tangent of your arc. The skill is
entirely about *when* you release — snap off at the bottom of a swing to fly flat
and far, or let go early to loft over a spike field. It reads in five seconds and
the ceiling is all timing.

Runs are seeded, so a great run is a shareable link: the URL hash pins the chasm,
and anyone who opens that link plays the exact same course.

## Features

- **Pendulum grapple on one input** — hold to attach to the nearest anchor and
  swing, release to launch with true tangential momentum handoff.
- **Seeded, reproducible chasm** — procedural ceiling anchors, stalactites, floor
  spikes and gaps. Generation is a pure function of the seed, so `#seed=abc123`
  is the same course on every machine, every framerate.
- **Combo / multiplier** — chain clean swings to raise your multiplier, and take
  risky "graze" near-misses of hazards for bonus points and a slow-mo beat.
- **Difficulty ramp** — faster scroll, sparser anchors and tighter clearances the
  further you get, always kept inside a solvable envelope.
- **Full juice** — taut rope line, comet trail, particle bursts, screen shake and
  procedural WebAudio SFX (rope twang, release whoosh, combo ping, death thud).
- **Persistence & polish** — high score in `localStorage` with an on-course "best"
  ghost marker, one-click *copy challenge link*, mute toggle, and a
  `prefers-reduced-motion` path that dials back shake and slow-mo.

## Run it

No build, no server, no dependencies. Just open the file:

```
# double-click index.html, or:
start index.html        # Windows
open index.html         # macOS
xdg-open index.html     # Linux
```

Any modern browser works. The `copy challenge link` button and seed sharing work
from `file://` too.

## Controls

| Action | Input |
|--------|-------|
| Grapple the highlighted anchor | Hold mouse / touch / any key |
| Fling off | Release |
| Retry (same seed) | Any key / tap after wipeout |
| Copy challenge link | `C` or the on-screen button |
| Mute / unmute | `M` |

## Seeds & sharing

Add `#seed=yourseed` to the URL to play a specific chasm. On the wipeout screen,
**COPY CHALLENGE LINK** (or `C`) copies a URL with the current seed baked in —
send it to a friend and you're both racing the identical course.

## License

MIT — see [LICENSE](LICENSE).
