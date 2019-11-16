---
layout: post
title: "DDCControl for monitor control"
date: "2019-11-16 11:35:26 +0530"
tags: [nvidia, jetson, nano, embedded, linux, monitor, i2c]
---
I have done this a few times on my various SBCs, so I thought I might as well document the process to install this utility that I end up using all the time.

DDCControl is quite useful for controlling displays connected through HDMI specially when you switch between computers all the time, and probably also when the display controls are not readily available within reach.

The best scenario would be to get a simple

```
sudo apt-get install ddccontrol ddccontrol-db
```

but that has almost never worked for me, wether using on MacOs, RPis (pretty much all distros out there), or on T4L (for the Nvidia Jetson Nano).

The next best step, install from source. The repo is called [DDCcontrol](https://github.com/ddccontrol/ddccontrol)

```
git clone https://github.com/ddccontrol/ddccontrol.git
cd ddccontrol
./autogen.sh
./configure --prefix=/usr/ --sysconfdir=/etc --libexecdir=/usr/lib
make
sudo make install
```

I've still not been able to make it work on the Jetson Nano. From what I understand there is a bug/incompatibility with Nvidia's drivers which seems to keep breaking access to the i2c bus. If you have any ideas please get in touch on any of my [socials](https://twitter.com/khoparzi)
