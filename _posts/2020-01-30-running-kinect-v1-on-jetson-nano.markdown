---
layout: post
title: "Running Kinect v1 on Jetson Nano"
date: "2020-01-30 12:30:26 +0530"
tags: [nvidia, jetson, nano, embedded, linux, openframeworks, creative coding, glsl, kinect, depth-camera]
---
Last year I ended up working on an installation project that used a Kinect v2 camera. Since the pricing of the units are still pretty high in India even after MicroSoft moved on from them I decided to get a v1. The problem with those if you are not on windows, the hardware revision 1473 is hilariously unreliable on MacOS and linux. Also the fact that the libfreenect library  that comes with OpenFrameworks fails to connect made it practically useless to me.

The following steps aim to fix that.

Clone and install from the repository

```
git clone https://github.com/OpenKinect/libfreenect
cd libfreenect
mkdir build
cd build
cmake .. -L -DBUILD_AUDIO=ON
make
make install
```

After a few hours on github and stackoverflow I came to the realisation that Model 1473 uses the audio driver to control its motors and a new firmware is required. Thankfully the `src/` folder has a `fwfetcher.py` file that helps you download and install the firmware that can be loaded on the fly.

AND BAM!

Now you can test the setup by running `sudo ./build/bin/freenect-micview` and `sudo ./build/bin/freenect-glview`

It also helps to copy the udev rules so that you don't have to use sudo all the time.

```
sudo cp libfreenect\platform\linux\udev\51-kinect.rules /etc/udev/rules.d
```
