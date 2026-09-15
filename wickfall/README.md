# Wickfall

**Your lantern is your life. Every step burns it down.**

Wickfall is a single-file, zero-dependency turn-based roguelike where your field
of view isn't free — it's fuel. You descend a procedurally generated dungeon
carrying a lantern whose oil drains every turn, and the radius of light it casts
*is* your fog-of-war. Linger to fight carefully and you starve your wick; sprint
for the stairs and you blunder blind into ambush.

## Why it's cool

Most roguelikes treat vision as free and light as flavor. Wickfall makes light
the central currency: the lit circle around you is your eyes, your safety, and a
ticking clock all at once, so every single turn is a live risk/reward bet.

- **Monsters in the dark grow bold.** Creatures standing in unlit tiles get a
  *lurk* bonus — harder to hit, and they hit harder — and they hunt you by the
  noise you make moving. Catch them in your light and they're exposed and
  vulnerable.
- **You can spend light for safety.** *Dim* the lantern to halve oil burn and cut
  your noise (at a smaller circle), or *Flare* to blow oil on a bright pulse that
  blinds and exposes anything adjacent.
- **Runs are seeds.** Every dungeon is reproducible from a seed in the URL hash,
  so you can trade links and race identical dungeons. There's a **Daily
  Challenge** (deterministic seed of the day) with its own leaderboard.
- **Permadeath, with a souvenir.** Death yields a rendered summary card (depth,
  turns, kills, cause, seed) you can copy as an image or share as a seed link.

It's ASCII-style glyphs on a canvas, so it's tiny and fast, and it lives in one
HTML file with no build step and no network calls.

## Run it

There is nothing to install or build.

- **Double-click `index.html`**, or drag it into any modern browser tab.

That's it. Optional:

- **Play a specific dungeon:** append `#seed=yourseed` to the URL.
- **Daily Challenge:** click **Daily** (top bar or start screen) for the seed of
  the day.
- Runs **autosave to your browser** every turn — refresh to resume where you left
  off. Permadeath is real; there's no save-scumming.

Optional syntax check (no runtime deps):

```sh
node -e 'const fs=require("fs");const c=fs.readFileSync("index.html","utf8").match(/<script>([\s\S]*?)<\/script>/)[1];fs.writeFileSync("/tmp/wf.js",c);require("child_process").execSync("node --check /tmp/wf.js");console.log("ok")'
```

## Controls

Fully playable by keyboard and by on-screen touch controls.

| Action | Keys |
|---|---|
| Move | Arrows, `h` `j` `k` `l`, `y` `u` `b` `n` (diagonals), or numpad |
| Wait a turn | `.` or `5` or `Space` |
| Grab item | `g` or `,` |
| Descend stairs | `>` or `Enter` (while standing on `>`) |
| Inventory / use / equip | `i` |
| Dim lantern | `z` |
| Flare lantern | `f` |
| New run | `N` |
| Help | `?` |
| Close overlay | `Esc` |

On touch devices an on-screen d-pad plus **Grab / Bag / Dim / Flare / Descend /
Help** buttons appear automatically.

### The lantern economy in one paragraph

The lit circle is everything you can see, and it shrinks as oil drains (~1 unit
per turn while bright, less while dimmed). At zero oil the wick gutters through a
few dimmer *ember* turns, then blackout — radius 1, nearly blind. Pick up **oil
flasks** to refill. The sidebar's oil and HP bars pulse red when critically low,
and the Lantern readout shows its state at a glance (Bright / Dim / Guttering /
Embers / Dark).

## Accessibility

- Respects `prefers-reduced-motion`: disables the per-frame lantern flicker and
  random screen shake, and heavily dampens full-screen flashes.
- Full keyboard play with visible focus outlines on all controls.

## License

MIT — see [LICENSE](LICENSE). Author: Alex Wictor.
