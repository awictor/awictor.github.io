# Emberwake

**A pocket-sized, zero-dependency engine for branching interactive fiction — shipped with a lamplighter's one-night tragedy you can win, lose, and replay a dozen ways.**

Emberwake is one HTML file. Open it and you get a complete choice-based IF engine *and* a finishable, atmospheric story — no build step, no server, no network calls. Everything (engine, styling, and the bundled story) lives in `index.html`, so it runs offline straight from `file://`.

## Why it's cool

Most IF toys ship an engine *or* a story. Emberwake ships both, plus one detail that makes runs contagious: you can hand a friend a **path seed** — a compact string in the URL — and the engine faithfully re-walks your exact choices to the ending you reached. Replay-as-a-URL, no account, no backend. Pair that with a persistent ending gallery and a built-in reachability linter and you have a small, complete, hackable artifact for building your own gamebooks.

The bundled world, **"The Long Ember of Cinderhaven,"** is real prose: you are the last lamplighter rationing the final oil on the longest night of a city where the dark is literally alive. 33 passages, 8 distinct endings (including a gated secret), and genuine resource tension between Oil, Warmth, Resolve, and Trust.

## Features

- **Passage-graph engine** — passages authored in a compact Twee-like text format, parsed at load. No dependencies, no toolchain.
- **Full state model** — four stats (Oil, Warmth, Resolve, Trust) with live meters, a real inventory, and boolean story flags, all mutated by choice effects and readable in link conditions.
- **Conditional choices & consequences** — choices show, hide, or lock based on state; effects adjust stats, grant/take items, and set flags that permanently alter later passages. State-driven endings (e.g. running out of Warmth) can trigger from anywhere.
- **Safe expression language** — conditions and effects run through a small Pratt-parsed evaluator (no `eval`), which is what makes seed replay deterministic.
- **Save / restore** — rolling autosave plus named localStorage slots, plus one-step Undo via an in-memory history stack. Nothing is uploaded.
- **Two share modes via URL hash** — a deterministic **path seed** (`#seed:…`) that animates a re-walk of your exact run, or a full compressed **snapshot** (`#save:…`) that loads your exact state instantly.
- **Ending gallery & completion meter** — endings you discover persist across sessions to reward replay.
- **Live story map** — an SVG graph of every passage: visited nodes glow, the current node pulses, your trail is traced in ember, and unreachable/broken nodes are flagged in red.
- **Authoring playground** — write your own gamebook in the same format with a live reachability linter, then load and play it in one click.
- **Ending achievement card** — a generated SVG card (ending name, final stats, endings X/8, completion %, path seed) you can download as PNG or copy as a replay link.
- **Atmospheric UI** — dim lantern-lit theme with a sequential paragraph fade reveal that respects `prefers-reduced-motion`, and optional procedural WebAudio ambience (ember-crackle + wind that rises as your Oil drops; off by default).

## Run it

Open `index.html` in any modern browser — double-click it, or drag it into a tab. That's it. It works fully offline; there is nothing to install or build.

To load a shared run, append the hash to the file URL:

- `…/index.html#seed:<seed>` — replay someone's exact run (animated).
- `…/index.html#save:<packed>` — load a full snapshot instantly.

## Controls & usage

| Action | How |
|---|---|
| Make a choice | Click it, or press **1–9** for the numbered choices |
| Skip the fade-in | Click anywhere in the story text |
| Undo last choice | **Undo** button (disabled when there's nothing to undo) |
| Save / load slots | **Saves** button — autosave is automatic; named slots are manual |
| See the graph | **Map** button |
| Share your run | **Share** button — copy a seed link or a full-save link |
| Write your own story | **Author** button — edit, lint live, then *Load & play* |
| Toggle ambient audio | **Audio** button (off by default) |
| Restart | **Restart** button (your endings gallery is kept) |
| Close any dialog | **Esc** or click outside it |

## Authoring your own story

Open the **Author** playground and write passages in this format:

```
:: start | The Bell Tower
Prose goes here. **Bold** and *italic* work. Interpolate state with ${oil}.
- A choice that always shows. -> next_passage
- A gated choice. -> secret | if: has('brass key') | do: oil -= 2; set(litRow); trust += 1
@enter: warmth -= 1

:: an_ending | The Dawnkeeper
@ending: The Dawnkeeper
Closing prose.
- Begin again. -> start
```

- `:: id | Title` starts a passage.
- `- text -> target | if: <cond> | do: <effect>` is a choice. `if:` gates visibility; `do:` runs effects. `enabled:` locks-but-shows; `once: true` fires only once.
- `@enter:` runs an effect on entry; `@ending: Name` marks a terminal passage.
- **Expression language:** stats `oil warmth resolve trust`; helpers `has(item)`, `set(flag)`, `add(item)`, `remove(item)`, `visited(id)`; operators `+= -= *= /= = == != < <= > >= && || !`. Multi-word names are quoted, e.g. `has('brass key')`.

The linter runs as you type and flags unreachable passages, broken links, and unreachable endings, so anything you ship is verifiably completable.

## License

MIT — see [LICENSE](LICENSE).
