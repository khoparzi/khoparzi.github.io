---
layout: post
title: "Headless Pi setup"
date: "2019-11-30 14:42:45 +0530"
tags: [raspberry-pi, embedded, remote management, linux, supercollider, creative coding, livecoding]
---
I've just finished work on an installation that involved a Kinect with MaxMsp patch (done by someone else) that sent over skeletal tracking data to a SuperCollider composition I wrote. The whole thing was going to run on a couple of windows laptops because MaxMsp doesn't work on linux, and that's what the programmer working on the interaction was working on. It didn't help the fact that the gallery had their systems locked down like crazy and the fact that none of us spoke German (that's what most systems that they had were configured to use).

To sum it up, it was hell to use windows. We had all kinds of issues including the laptops being physically setup in an awkward box for protection from the elements. Add to the fact that I was mostly working back in my studio 600 kms away and had to phone in variations to the code to check interaction errors.

I had been playing with the idea of doing installation work where I just handed off the client/gallery a small preconfigured system (like a ras-pi) that I could update and administer remotely.

Enter the solution you see ahead.

Following instructions from Blokas labs excellent Mode-P and Pi-sound projects.

[Headless Pi start to finish](https://community.blokas.io/t/headless-pi-start-to-finish/612)

[Installing supercollider on RPi](https://community.blokas.io/t/music-software-supercollider/618)

This second post is great as it describes both methods, installing from apt-get as well as building from source (always trips up linux newbies [which I still seem to be even after 12-13 years of using it in some capacity or other]).

Well, between the Jetson and this RPi setup, we should soon have a SBC powered AV setup for performances that can be driven by OSC messages.
