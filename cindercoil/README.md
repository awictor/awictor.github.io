# Cindercoil

**A snake of light whose own glowing wake is lethal — until it cools.**

Cindercoil is a single-file, zero-dependency arcade score-chaser that rebuilds Snake around one twist: you don't drag a fixed tail — you lay a trail of molten light, and that trail only kills you *while it's still hot*. Each cell cools from white-hot through orange to a harmless blue ember over about 1.5 seconds, so the board is a shimmering maze that constantly rearranges itself as it cools.

## Why it's cool

Growth is the threat. Every spark you grab raises your **charge**, which multiplies your score *and* extends how long your trail stays lethal. The better your run, the deadlier your own wake becomes — a difficulty curve that comes from playing well, not from a timer. An arena border that creeps inward and a rising tick speed tighten the squeeze.

- **Cooling-trail collision** — weave through your own light; touch it while it glows and you burn out, but ride it once it's blue.
- **Coolstorm dash** — flash-cool the entire trail on a 9s cooldown to escape a corner you painted yourself into.
- **Best-run ghost** — your best run on a board replays as a faint blue ribbon to race against.
- **Shareable seeds** — every run has a `#s=<seed>` URL that reproduces the exact board, plus a daily challenge and a downloadable score card.
- **Juice, no assets** — additive heat-gradient bloom, particle bursts, screen shake, and WebAudio blips/sizzle synthesized in-browser. Honors `prefers-reduced-motion`.

## Run it

No build, no server, no dependencies. Just open the file:

- Double-click `index.html`, or drag it into any modern browser tab.

It also works served over http/https if you prefer (`python -m http.server`, etc.), but a local file works fine — including the share links.

## Controls

| Action | Keyboard | Touch |
|---|---|---|
| Move | WASD / Arrow keys | Swipe |
| Coolstorm dash | Shift or E | Two-finger tap |
| Start / restart | Space or Enter | Tap |

Space/Enter and tap always trigger the highlighted button (Accept challenge, Retry same board, or Play), so the most natural key does what the screen suggests.

## Sharing

On death you get a `#s=<seed>` link and a PNG score card. Send the link and a friend loads the exact same board — spark sequence and all — to beat your run. There's also a UTC-dated **Daily Challenge** with its own high score and ghost.

## License

MIT — see [LICENSE](LICENSE).
