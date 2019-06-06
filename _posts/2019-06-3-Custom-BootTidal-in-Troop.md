---
layout: post
title: Custom BootTidal in Troop
tags: [tidalcycles, troop, livecoding, creativecoding, network-music]
---

I just started playing with Ryan Kirkbride's excellent [Troop](https://github.com/Qirky/Troop) system to play with TidalCycles instead of using the Atom plugin. The first problem I hit upon right after initial playthrough was that I couldn't use my favourite custom functions in my shared livecoding environment. The simple solution I'm using for now is to go open the ```/src/boot/tidal.py``` file and include my ```init.hs``` file with the simple line:

```
:script /Users/khoparzi/Dev/Live-Coding/setup/init.hs
```
