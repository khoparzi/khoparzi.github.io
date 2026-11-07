---
layout: page
title: Interactive Livecoding
subtitle: Hydra Synth and Strudel Audio Integration
interactive: ["hydra", "strudel"]
---

This page demonstrates embedded and fullscreen creative coding widgets powered by **Hydra Synth** (WebGL video synthesizer) and **Strudel** (algorithmic livecoded music).

Libraries are loaded **on-demand** only when you click **Initialize**, keeping page load times instantaneous and respecting browser audio autoplay policies.

---

## 1. Embedded Hydra (WebGL Synth)

Click **Initialize Hydra** below to start the WebGL canvas. Once running, you can click **Fullscreen** to expand the visualizer to the entire display.

{% include hydra.html id="hydra-sketch-1" title="Really Love" code="osc(100,-0.01245,1).pixelate(50).kaleid(()=>(Math.sin(time/8)*9+3)).rotate(0,0.125)
.modulateRotate(shape(3).scale(()=>(Math.cos(time)*2)).rotate(0,-0.25)).diff(src(o0).brightness(0.3))
  .out()" %}

---

## 2. Embedded Strudel (Algorithmic Audio)

Click **Initialize Strudel Audio** to mount the interactive REPL. You can edit pattern code directly, press `Ctrl+Enter` (or `Cmd+Enter`) to evaluate in real-time, and toggle **Fullscreen**.

{% include strudel.html id="strudel-sketch-1" title="Pretty hops" code='n(run(8).fast("<1!3 4>")).scale("c:minor:pentatonic").scaleTranspose("<3!3 4>").s("sawtooth").decay(0.2).lp(saw.range(100, 6000).slow(16)).lpq(0.5)' %}

---

## How to use this in your posts and pages

### Option A: Using Liquid Includes (Recommended)

In any Markdown post or page:

1. Enable interactive loading in frontmatter:
   ```yaml
   ---
   title: "My Livecoding Post"
   interactive: ["hydra", "strudel"]
   ---
   ```

2. Embed Hydra:
   {% raw %}
   ```liquid
   {% include hydra.html id="my-sketch" title="Julia Flow" code="osc(10, 0.1, 0.8).rotate(0.1).out()" %}
   ```
   {% endraw %}

3. Embed Strudel:
   {% raw %}
   ```liquid
   {% include strudel.html id="my-beat" title="Techno Groove" code='s("bd sd, hh*4")' %}
   ```
   {% endraw %}

---

### Option B: Ambient Fullscreen Background Hydra

To have a generative Hydra sketch run smoothly in the background behind your page content:

```yaml
---
layout: page
title: "Ambient Page"
hydra_bg: "osc(40, 0.02, 0.8).diff(osc(10, 0.05).rotate(0.1)).color(0.4, 0.05, 0.1).out()"
---
```

A floating **Pause Visuals** control will automatically appear in the bottom right corner, and text panels retain full readability with high contrast.
