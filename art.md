---
layout: page
title: Art
subtitle:
---

## Collabscape

Patterns emerge from monotones of traditional world tunings as they curve into the creation of new sounds activated by viewer participation. Partakers unconsciously activate their region’s tuning system by allowing their internet connection to pick up analytics of their location data. As visitors immerse themselves in communicating with other dots on the screen, they become unknowing collaborators of new tones and tunes. The tones produced, almost untraceable to their source while they begin to pull themselves out from a growing dictionary of scales and tuning systems. When more people begin to ride these sound waves, a rhythm develops. This rhythm slowly brainwashes the mind into a hypnotic massage of wanting to stay when you have to leave.

* First presented at [Future Landing](http://futurelanding.serendipityartsvirtual.com/), a virtual art exhibition hosted by [Serendipity Arts Foundation](http://serendipityarts.org/)
* Curated by [Veerangana Solanki](https://www.serendipityartsfestival.com/curator/veerangana-solanki)
* Sound design and composition by Abhinay Khoparzi
* Visuals on [Olivia Jack](https://ojack.xyz)'s [Hydra Synth](https://hydra.ojack.xyz) by Abhinay Khoparzi
* Based on an Initial sketch and websockets engine by [Ashish Dubey](https://instagram.com/dash1291)
* Tuning systems based on the amazing work by [Andrew Bernstein & Ben Taylor](https://github.com/abbernie/tune/), porting Victor Cerullo's exhaustive [Scala tuning archive](https://www.huygens-fokker.org/scala/)
* Sequencing on the webaudio API with Yotam Mann's [Tone.js](http://tonejs.github.io/)

[Collab Scape at Future Landing, Serendipty Art Festival](art/collabscape/newgrab.mp4)

![Collab Scape at Serendipty Art Festival, Goa](art/collabscape/basic-install.jpg){:.no-lightbox}

![Collab Scape at Serendipty Art Festival](art/collabscape/visitors.jpg){:.no-lightbox}

[Collab Scape at Serendipty Art Festival, Goa](art/collabscape/visitors-1080p.mov)

### Technical Details

### Technical Details

The piece came about based on an initial sketch by Ashish involving a very simple web interface that featured a couple of dots on a 2D canvas - each representing a live visitor. A user on the web page can move its dot across the 2D plane which reflects on every user’s webpage. Each change in position is accompanied with movement across the stereo sound field, changing the perception of sound for each visitor in 2D space. We used a library called socket.io to allow for dealing with the network bits of communicating the joining and leaving of a visitor and sharing changes in position.

The next step was using custom tunings, more elaborate compositions, and a major visual revamp. We utilised tune.j, a library that supports 1000s of tunings to choose from and use in a WebAudio application. To aid in my composition I took the base sequencing engine of Tone.js and added my a I added a drone based generative composition that would slowly fade in after spending some time in the piece and soon take over most of the lower end of the sound spectrum for a sonically rich experience. For visuals I added a clockwork like generative visual built on Hydra and p5 to transform Collab-Scape into a visual and musically developed experience that would put visitors in a meditative trance. I also added a few modulations to the sound design of the instruments used in each composition that would evolve as the users moved their "avatars" all over the screen. We also wanted the peice to not feel like a lonely place, so we added some "bots" that would often enter the room to shake up the composition and after sometime quietly leave.

Ashish has written more about his work with Collab-Scape and our collaboration with Samarth Gulati in producing Future Landing on [his blog](http://ashishdubey.xyz/interactive-soundscape-on-web.html) and also [open sourced](https://github.com/dash1291/collabscape) the code for others to enjoy and develop further.

## Shader Art

[Marching with Julia Fractals](marching.md) a month's worth of Marching.js sketches exploring various experiments with Julia fractals through the month of July 2020