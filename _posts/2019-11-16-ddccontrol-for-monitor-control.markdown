---
layout: post
title: "DDCControl for monitor control"
date: "2019-11-16 11:35:26 +0530"
last-updated: "2021-08-13 15:35:26 +0530"
tags: [nvidia, jetson, nano, embedded, linux, monitor, i2c]
---

> DDCcontrol is a software used to control monitor parameters, like brightness, contrast, RGB color levels and others.

I have done this a few times on my various SBCs, so I thought I might as well document the process to install this utility that I end up using all the time.

DDCControl is quite useful for controlling displays connected through HDMI specially when you switch between computers all the time, and probably also when the display controls are not readily available within reach.

The best scenario would be to get a simple

```
sudo apt-get install ddccontrol ddccontrol-db
```

but that has almost never worked for me, wether using on MacOs, RPis (pretty much all distros out there), or on T4L (for the Nvidia Jetson Nano).

The next best step, install from source. The repo is called [DDCcontrol](https://github.com/ddccontrol/ddccontrol)

If you are on Ubuntu/Debian first let's install some dependencies (you can easily find equivalent commands for your own distribution)

```
sudo apt install intltool libtool m4 automake autopoint i2c-tools libxml2-dev libpci-dev libgtk2.0-dev liblzma-dev
```

And now for building and installing

```
git clone https://github.com/ddccontrol/ddccontrol.git
cd ddccontrol
./autogen.sh
./configure --prefix=/usr/ --sysconfdir=/etc --libexecdir=/usr/lib
make
sudo make install
```

You'll also need to install `ddccontrol-db` to get a database of all the compatible displays

```
git clone https://github.com/ddccontrol/ddccontrol-db.git
cd ddccontrol-db
./autogen.sh 
./configure --prefix=/usr/
make
sudo make install
```

I've ~~still not been able to make it work~~ managed to build and install it on the Jetson Nano (updated August 2021). From what I understand there is a bug/incompatibility with Nvidia's drivers which seems to keep breaking access to the i2c bus. If you have any ideas please get in touch on any of my [socials](https://twitter.com/khoparzi)
