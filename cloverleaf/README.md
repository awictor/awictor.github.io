# Cloverleaf

**Build a road, break the commute — a live Braess's paradox traffic sim.**

Cloverleaf lets you *cause* one of game theory's most counterintuitive results with your own hand: add a brand-new, free shortcut to a road network and watch everyone's commute get **worse**. Not a diagram, not a proof — hundreds of self-interested cars rerouting in real time until the average commute time visibly jumps up.

## Why it's cool

Most people only ever see Braess's paradox as a static figure with some algebra next to it. Here you *make it happen*: selfish drivers each greedily pick whatever route is fastest right now, the system settles into a Nash equilibrium on its own (no scripted outcome), and then one click adds a road and the equilibrium gets slower. A price-of-anarchy meter puts a number on how much "everyone for themselves" costs versus the coordinated social optimum. It's the rare explainer that's still surprising even if you already know the answer — and it's a single HTML file with zero dependencies.

## Run it

Open `index.html` in any modern browser — double-click it, or serve the folder:

```
python3 -m http.server 8000    # then visit http://localhost:8000
```

Zero dependencies, zero build step, no network calls. Everything (render loop, routing model, social-optimum search, URL serialization) is in that one file, ~305 lines of vanilla JS.

> Tip: the **Copy share link** button uses the clipboard API, which browsers block on the `file://` origin. If you double-clicked the file and copy fails, the button says so and you can copy the URL from the address bar. Serving over `http://` makes it work.

## The 30-second demo

1. Watch the average commute settle — the number stops drifting once the cars reach equilibrium (~65 min at defaults).
2. Click **Open the shortcut ▸**. A zero-cost bridge appears and the average commute climbs to ~80 min. Adding a road made everyone slower — that's the paradox. The "before" badge freezes the old average so you can see the jump.
3. Click **Force social optimum**. Cars are rerouted to the coordinated best assignment and the commute drops back below the selfish result — the gap you just closed is the *price of anarchy*.

Or hit **Guided tour** to be walked through those three steps with the controls highlighted.

## Controls

| Control | What it does |
|---|---|
| **Open / Close the shortcut** | Toggles the zero-cost bridge — the paradox trigger. |
| **Force social optimum** | Switches cars from selfish routing to the computed optimal assignment; toggle off to return to selfish best-response. |
| **Commuters** | Number of cars in the network (40–600). |
| **Congestion** | Sensitivity of the congestion-dependent roads to load — higher makes the paradox sharper. |
| **Selfishness** | How often a car re-picks its route on completing a lap (reroute rate). |
| **Damping** | Hysteresis on rerouting. Push selfishness up and damping down to watch the equilibrium oscillate instead of settle. |
| **Copy share link** | Encodes all parameters + bridge/optimum state in the URL hash for a reproducible, shareable scenario. |

### Reading the screen

- **Edges** are colored green→red by their current latency in minutes and thickened by traffic load; the dashed orange edge is the added shortcut.
- **Average commute** shows the live selfish equilibrium, the social optimum, and the price-of-anarchy ratio between them.
- **Sparkline** plots average commute over time (orange = now, dashed = the frozen "before bridge" level, vertical marker = the moment the road was added).
- **Equilibrium stability** reflects how much the average is still moving — stable, settling, or oscillating.

## How it works

The network is a fixed four-node diamond: `IN → A → OUT` and `IN → B → OUT`. The `IN→A` and `B→OUT` legs are congestion-dependent (latency rises with load); the `A→OUT` and `IN→B` legs are fixed-cost. The shortcut is a zero-cost `A→B` bridge. Cars best-respond to current latencies at each lap boundary with a little hysteresis so the system settles rather than flapping. The social optimum is an honest grid search over the traffic split on the same topology, so the price-of-anarchy number is real, not hand-waved.

## Real-world footnote

The paradox isn't just theory — traffic engineers have hit it in practice:

- **Seoul, 2005** — tearing out the Cheonggyecheon freeway *improved* traffic flow.
- **Stuttgart** — a newly added cross-street had to be closed again because it slowed the grid.
- **New York, 42nd St (Earth Day 1990)** — closing it *reduced* congestion.

## License

MIT — see [LICENSE](LICENSE). Copyright (c) 2026 Alex Wictor.
