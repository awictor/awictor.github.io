# Retrograde

**A fantasy 16-bit CPU you can watch think — and rewind.**

Retrograde is a complete virtual computer that lives in a single HTML file: a 16-bit CPU with its own assembly language, an in-page assembler, an animated execution view, a 64×64 pixel screen, and a full **time-travel debugger**. Write assembly, hit Play, and watch registers light up, memory cells pulse as they're written, the stack grow and shrink, and the screen come alive — then scrub a slider to any point in the program's history and step backward one instruction at a time.

No build. No dependencies. No network. Open the file and you have a retro computer with a time-traveling debugger in your browser.

## Why it's cool

Most CPU simulators show you the machine state *now*. Retrograde records **every executed cycle** as a reversible delta, so you can answer the question that actually matters when debugging: *"how did this value get here?"* Click any register or memory cell and Retrograde jumps to the exact cycle and instruction that last wrote it. Rewind the whole machine, replay it, and watch data flow backward. It's a toy, a teaching tool, and an animated artifact all at once.

## Features

- **Custom 16-bit ISA** — 26 opcodes (`MOV`/`LOAD`/`STORE`, `ADD`/`SUB`/`MUL`, bitwise `AND`/`OR`/`XOR`/`SHL`/`SHR`, `CMP` + conditional jumps, `PUSH`/`POP`/`CALL`/`RET`, `DRAW`/`CLS`, `HLT`), 8 general registers, `PC`, `SP`, and Z/N/C/V flags over a 4096-word RAM.
- **Live in-page assembler** — two passes with labels, constants (`NAME = value` / `EQU`), comments, and immediate / register / memory addressing. Reassembles on every keystroke with inline, clickable error markers.
- **Animated machine view** — register tiles and memory cells flash on write, a visual stack, a current-instruction readout synced to the source line, and a palette-driven 64×64 framebuffer canvas.
- **Time-travel debugger** — scrub the timeline to any cycle, step/back one instruction, play/pause with adjustable speed. Every cycle is delta-encoded into a bounded ring buffer.
- **Reverse provenance** — click a register or memory cell to jump to the instruction that last wrote it.
- **Watch expressions** — track `Rn`, `mem[addr]`, or `mem[a..b]`; jump between every mutation, with mutation ticks drawn on the timeline and an optional break-on-change.
- **Breakpoints** — click a gutter line number to pause execution when it's reached.
- **Extras** — attract-mode demo carousel, one-click WebM capture of the screen, a guided ISA tutorial, a CRT scanline theme, and chiptune blips on writes/jumps.
- **Shareable** — your assembly is encoded into the URL hash, so any creation is a one-click link.
- **Signed-aware readouts** — register values that have the high bit set show their signed form too, e.g. `65535 (0xFFFF, -1)`, matching the signed disassembly.

## Run it

**Zero setup.** Just open `index.html`:

- Double-click `index.html`, or drag it into any modern browser (works offline, `file://` is fine).
- Or serve it statically: `python3 -m http.server` then visit `http://localhost:8000`.
- Or publish the folder to GitHub Pages and share the link.

Pick a program from the **Sample** dropdown (the animated *Bouncing pixel* loads by default), then press **Play** or **Step**. Drag the timeline to rewind.

## Controls

| Action | Button | Keyboard |
|---|---|---|
| Step forward | `Step ⟹` | `s` or `→` |
| Step backward | `⟸ Back` | `b` or `←` |
| Play / Pause | `▶ Play` | `space` |
| Reset | `⟲ Reset` | `r` |
| Scrub history | timeline slider | — |
| Set breakpoint | click a line number in the gutter | — |
| Trace a value | click a register tile or memory cell | — |

The **speed** slider controls how many instructions run per animation frame (shown live next to it) — turn it down to watch execution advance instruction by instruction, up to blast through long programs.

## Writing assembly

```asm
; constants and labels are supported
OUT = 200
      MOV R0, 0        ; a
      MOV R1, 1        ; b
      MOV R2, OUT      ; write pointer
loop: STORE [R2], R0   ; mem[ptr] = a
      MOV R4, R0
      ADD R4, R1       ; next = a + b
      MOV R0, R1
      MOV R1, R4
      ADD R2, 1
      CMP R2, 212
      JLT loop
      HLT
```

Operands accept decimal, hex (`0x1F`), binary (`0b1010`), character literals (`'A'`), and named constants/labels. Memory is addressed with brackets: `[100]` (immediate) or `[R2]` (register). See the **Instruction set** panel in the app for the full opcode reference.

### Instruction set

| Op | Syntax | Meaning |
|---|---|---|
| `MOV` | `MOV Rd, Rs\|imm` | Copy a value into a register. |
| `ADD`/`SUB`/`MUL` | `OP Rd, Rs\|imm` | Arithmetic into `Rd` (sets flags). |
| `AND`/`OR`/`XOR` | `OP Rd, Rs\|imm` | Bitwise op into `Rd`. |
| `SHL`/`SHR` | `OP Rd, Rs\|imm` | Shift `Rd` by operand bits. |
| `CMP` | `CMP Ra, Rb\|imm` | Compare (`Ra - Rb`); sets flags only. |
| `LOAD` | `LOAD Rd, [addr\|Rs]` | Load a word from memory. |
| `STORE` | `STORE [addr\|Rs], Rv\|imm` | Store a value into memory. |
| `JMP`/`JEQ`/`JNE`/`JLT`/`JGT`/`JLE`/`JGE` | `JXX label` | Unconditional / conditional jump. |
| `PUSH`/`POP` | `PUSH Rs\|imm` · `POP Rd` | Stack operations. |
| `CALL`/`RET` | `CALL label` · `RET` | Call and return. |
| `DRAW` | `DRAW Rx, Ry, Rc\|imm` | Plot a pixel at (x,y) with color 0–15. |
| `CLS` | `CLS [color]` | Clear the framebuffer. |
| `HLT` | `HLT` | Halt the processor. |

## Bundled demos

- **Bouncing pixel** — a pixel ricocheting around the screen (default; great for watching `CLS`/`DRAW`).
- **Plasma** — a scrolling XOR plasma field across the whole framebuffer.
- **Fibonacci** — writes the sequence into memory; scrub back to see any value born.
- **Bubble sort** — sorts 8 values in memory, cells pulsing as they swap.

## License

MIT — see [LICENSE](LICENSE).
