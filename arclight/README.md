# Arclight

**Chain the current, discharge the storm** — a single-file roguelike deckbuilder about conductivity.

Arclight is a zero-dependency, ~2,100-line `index.html`. No build step, no npm, no server. You descend a
flooded, storm-lit power grid as a Conductor, fighting corrupted automatons in turn-based card combat in the
Slay-the-Spire mold — with one twist that changes how every turn plays.

## The twist: the Arc chain

Every card has a **conductance color**:

- **◆ Copper** — attack
- **■ Cobalt** — defense
- **▲ Verdigris** — power / status
- **● Scrap** — colorless, neutral

Play cards of the **same color back-to-back** and your **Arc** counter climbs. Each point of Arc multiplies the
numbers on your next same-color card (+0.5× per Arc by default). Play a **different** color and the current
**grounds out** — Arc snaps back to 0. Scrap cards are inert: they neither build nor break the chain.

**⚡ Discharge** cards spend *all* stored Arc for a burst that scales with how much you banked. So a turn isn't
"play your biggest numbers" — it's a live sequencing puzzle: how long do you ride a color, and when do you cash out?

Relics rewrite the rules. Grounding Rod *halves* your Arc on a break instead of resetting it. Superconductor bumps
the multiplier to +0.7×. Recoil Capacitor refunds half a Discharge. Resonator makes Scrap continue the chain. These
turn into genuinely different builds: burst-Discharge vs. a sustained same-color engine.

## Features

- **Seeded, shareable runs.** A mulberry32 PRNG keyed off a base36 seed in the URL hash (`#seed=…`). The same seed
  reproduces the same map, rewards, and enemy rolls. Daily seed built in; "Copy Run Link" on the end screen.
- **Branching 15-floor map.** Combat, elite, `?` event, shop, rest, and a telegraphed multi-phase boss. HP and deck
  persist between nodes.
- **~40 cards** across the three colors plus colorless, each with an upgraded variant.
- **6 status effects** — Vulnerable, Weak, Overclock, Corrosion, Grounded, Static — shown as icons on both sides.
- **Reactive scripted enemy AI** that reads live game state and telegraphs its intent one turn ahead (see below).
- **Relics, gold, a shop** (buy/remove cards, relics, potions), rest sites (heal or upgrade), and 5 events.
- **localStorage autosave + meta-progression.** Resume a run in progress; reaching depth 3 and 6 permanently unlocks
  extra cards and relics.
- **Hand-rolled canvas FX** — lightning that arcs on same-color chains, a screen-wide discharge burst, screen shake,
  floating damage numbers.
- **Colorblind-safe:** color is always paired with a distinct shape (◆■▲●) and status icons — never color alone.
- **In-file self-check harness** — deterministic assertions over the PRNG, Arc math, damage pipeline, map generation,
  and the reactive AI, runnable from the title screen.

## Run it

Open `index.html` in any modern browser:

- Double-click the file (works over `file://`), **or**
- Serve it statically, e.g. `python -m http.server` then visit the printed URL.

That's it. Fully offline, nothing to install.

## Controls

| Input | Action |
|-------|--------|
| Mouse | Click a card to play it; click a target enemy when a card needs one |
| `1`–`9` | Play the card in that hand slot |
| `E` | End turn |
| `Esc` | Deselect a card / close the How-to, pile, or self-check overlay |

Hover any card (desktop) to preview exactly what the Arc chain will do before you commit. During your turn you can
click the draw / discard / exhaust piles to inspect them, and the **Deck** button in the top bar shows your full
deck (alphabetized) from anywhere — including between nodes, before you shop or pick a reward.

## Seed sharing

The current seed lives in the URL hash (`…/index.html#seed=abc123`). Copy the URL to hand someone the exact same run,
or paste a seed into the title-screen box. **Daily Arclight** uses a date-based seed so everyone gets the same map
that day. The game-over screen's **Copy Run Link** button includes your reached depth and score.

## How the enemy AI decides

Enemies don't play from a fixed loop — each one runs a small rule set against the live combat state, and every roll
routes through the seeded PRNG so a given seed always plays out identically:

- **Arc Golem** hardens (blocks) when your Arc is ≥3 — it reads your chain and walls up — and smashes when you're
  ungrounded.
- **Volt Wisp** applies Weak specifically when your hand is attack-heavy (3+ attacks).
- **Corroded Drone** stacks Corrosion until you're already rotting, then switches to slamming.
- **Capacitor Turret** runs a charge→discharge cycle and guards when hurt.
- Elites **enrage** at low HP; the boss, **The Grounding Engine**, has three HP-gated phases and punishes ending your
  turn with Arc at 0 (it powers up if you ignore the whole mechanic).

Whatever an enemy has decided is telegraphed as an icon + value above it a full turn ahead, so you can play around it.

## License

MIT — see [LICENSE](LICENSE).
