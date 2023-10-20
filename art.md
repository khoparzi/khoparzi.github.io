---
layout: page
title: Art
subtitle:
---

## Collabscape

Patterns emerge from monotones of traditional world tunings as they curve into the creation of new sounds activated by viewer participation. Partakers unconsciously activate their region’s tuning system by allowing their internet connection to pick up analytics of their location data. As visitors immerse themselves in communicating with other dots on the screen, they become unknowing collaborators of new tones and tunes. The tones produced, almost untraceable to their source while they begin to pull themselves out from a growing dictionary of scales and tuning systems. When more people begin to ride these sound waves, a rhythm develops. This rhythm slowly brainwashes the mind into a hypnotic massage of wanting to stay when you have to leave.

Sound design and composition by Abhinay Khoparzi
Visuals on [Olivia Jack](https://ojack.xyz)'s [Hydra Synth](https://hydra.ojack.xyz) by Abhinay Khoparzi
Based on an Initial sketch and websockets engine by [Ashish Dubey](https://instagram.com/dash1291)
Tuning systems based on the amazing work by Andrew Bernstein & Ben Taylor, porting Victor Cerullo's exhaustive Scala tuning archive
Sequencing on the webaudio API with Yotam Mann's Tone.js

[![Collab Scape on Future Landing]({art/collabscape/new-grab-still.jpg})]({art/collabscape/newgrab.mp4} "Collab Scape at Future Landing, Serendipty Art Festival")

![Collab Scape at Serendipty Art Festival, Goa](art/collabscape/basic-install.jpg)

![Collab Scape at Serendipty Art Festival](art/collabscape/visitors.jpg)

[![Collab Scape on Future Landing]({art/collabscape/visitors-still.jpg})]({art/collabscape/visitors-1080p.mov} "Collab Scape at Future Landing, Serendipty Art Festival")

### Technical Details

Ashish initial sketch involved a very simple web interface that featured a couple of dots on a 2D canvas - each representing a live visitor. A user on the web page can move its dot across the 2D plane which reflects on every user’s webpage. Each change in position is also accompanied by a change in panner configuration which changes the perception of sound for each visitor in 2D space. We used a library called socket.io to allow for dealing with the network bits of communicating the joining and leaving of a visitor and sharing changes in position.

The next step to take the piece closer to the my proposed concept to the curators was using custom tunings, more elaborate compositions, and a major visual revamp. We utilised tune.js which is a library that supports 1000s of tunings to choose from and use in a WebAudio application. I added my hydra and p5 visuals code to Ashish's experiment and transformed it into a more visual and musically developed experience in line with the ethos of the peice.

## Shader Art

[Marching with Julia Fractals](marching.md) a month's worth of Marching.js sketches exploring various experiments with Julia fractals through the month of July 2020