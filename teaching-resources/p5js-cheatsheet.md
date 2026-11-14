---
layout: page
title: "p5.js Generative Art Cheat Sheet"
description: "A concise syntax and coordinate reference for beginners in a p5.js generative art workshop."
---

**Web Editor:** [editor.p5js.org](https://editor.p5js.org) | **Run:** `Cmd/Ctrl + Enter` | **Tidy Code:** `Cmd/Ctrl + B`

---

### 1. Sketch Structure & Coordinate System
Every sketch relies on two core blocks, and the origin `(0, 0)` starts at the **top-left** corner (`y` increases downward).

```text
(0,0) ─────────────────────────► +X (width)
  │
  │         (width/2, height/2)
  │                 •
  │
  ▼
+Y (height)                  (width, height)
```

```javascript
function setup() {
  createCanvas(600, 600); // Runs ONCE at the start
  noLoop();               // Optional: stops draw() from looping 60x/sec
}

function draw() {
  background('#f4f1ea');  // Runs every frame (or once if noLoop() is active)
}
```

---

### 2. Shapes, Color & Style
Colors accept grayscale (`0`–`255`), RGB (`255, 0, 100`), RGBA with opacity (`0, 0, 0, 120`), or hex codes (`'#352879'`).

| Function | What It Does | Example |
| :--- | :--- | :--- |
| `background(c)` | Fills the entire canvas with a color | `background(20);` |
| `stroke(c)` / `noStroke()` | Sets outline color or disables outlines | `stroke('#e63946');` |
| `strokeWeight(px)` | Sets line and outline thickness in pixels | `strokeWeight(3);` |
| `fill(c)` / `noFill()` | Sets interior shape color or makes it hollow | `noFill();` |
| `line(x1, y1, x2, y2)` | Draws a straight line between two points | `line(0, 0, 50, 50);` |
| `rect(x, y, w, h)` | Draws a rectangle from its top-left corner | `rect(10, 10, 40, 40);` |
| `ellipse(x, y, w, h)` | Draws an oval or circle from its center | `ellipse(300, 300, 80, 80);` |
| `arc(x, y, w, h, a1, a2)` | Draws a curved segment using radians (`PI`) | `arc(0, 0, 40, 40, 0, HALF_PI);` |

---

### 3. Rules, Loops & Controlled Chance

**The Coin Flip (`random` + `if / else`)**  
`random(1)` picks a decimal between `0.0` and `0.999...`, while `random(-5, 5)` picks between `-5` and `5`.

```javascript
if (random(1) < 0.5) {
  line(x, y, x + step, y + step); // 50% chance: backslash \
} else {
  line(x + step, y, x, y + step); // 50% chance: forward slash /
}
```

**The Grid Stamp (Nested `for` Loops)**  
Steps across every column (`x`) and down every row (`y`) by `step` pixels.

```javascript
let step = 30;
for (let y = 0; y < height; y += step) {
  for (let x = 0; x < width; x += step) {
    // Place your tile rule here using x, y, and step
  }
}
```

---

### 4. Useful Variables, Angles & Saving Art
* **Built-in Variables:** `width`, `height` (canvas dimensions), `mouseX`, `mouseY` (live cursor position).
* **Angle Constants:** `HALF_PI` (90°), `PI` (180°), `TWO_PI` (360°).
* **Freeze Randomness:** Add `randomSeed(42);` at the top of `draw()` so animated sketches hold a consistent random pattern across frames.
* **Save Artwork Shortcut:** Paste at the bottom of your sketch to download a PNG when pressing `S`:

```javascript
function keyPressed() {
  if (key === 's' || key === 'S') saveCanvas('my-generative-art', 'png');
}
```

**Quick Debugging Checklist:** Check camelCase capitalization (`strokeWeight`, `noFill`), verify every `{` has a matching `}`, and add `noFill()` if an `arc()` renders as a filled pie wedge instead of a curved line.
