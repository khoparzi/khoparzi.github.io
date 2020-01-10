---
layout: post
title: "Lighting up the Jetson Nano with Cinder"
date: "2020-01-09 19:54:32 +0530"
---

I've been on a Openframeworks trip for the past eight years or so and have wondered about starting up with Cinder lib at some point of time. I'm trying to see if 2020 is the year it'll finally happen.

Following some helpful instructions from [Kousaka Kazuma](https://note.com/kousaka_kazuma/n/n144e1fa4a1a8):

Make sure cmake is installed
```sudo apt install cmake```

and Gstreamer and associated libraries

```
sudo apt-get install libxcursor-dev libxrandr-dev libxinerama-dev libxi-dev libgl1-mesa-dev libgles2-mesa-dev zlib1g-dev libfontconfig1-dev libsndfile1 libsndfile1-dev libpulse-dev libasound2-dev libcurl4-gnutls-dev libgstreamer1.0-dev libgstreamer-plugins-base1.0-dev gstreamer1.0-libav gstreamer1.0-alsa gstreamer1.0-pulseaudio libboost-filesystem-dev
```

I've tried installing libmpg through apt but that doesn't seem to work yet, so let's build from source.

```
wget https: //www.mpg123.de/download/mpg123-1.24.0.tar.bz2
tar -xvf mpg123-1.24.0.tar.bz2
cd mpg123-1.24.0
./configure --prefix=/opt/local
make && sudo make install
```

Now to get Cinder from the GitHub repo

```
git clone --recursive https: //github.com/cinder/Cinder.git
cd Cinder
mkdir build && cd build
cmake ..
make -j 4
```

We can test this by going into the BasicApp sample project, and running it

```
cd samples/BasicApp/proj/cmake
mkdir build && cd build
cmake .. && make
./Debug/BasicApp/BasicApp
```

If this starts up a new window with a blank screen, we are golden. Hey, that's what the link in the start did to prove it works, I'm still starting out.

Because I usually use my Jetson through SSH I have to specify the display to be used to run visual apps. I use the same system for my Openframeworks apps.

```
export DISPLAY=:0 && ./Debug/BasicApp/BasicApp
```

To make things even easier I've added some aliases to my .bash_aliases and a cinderRun.sh shell script.

contents of cinderRun.sh

```
#!/bin/bash

CURRENT=`pwd`
BASENAME=`basename "$CURRENT"`
./proj/cmake/build/Debug/"$BASENAME"/"$BASENAME"

exit;
```

and this is added to .bash_aliases

```
alias extrun="export DISPLAY=:0 &&"
alias maker="make && make run"
alias cinderbuild="cd ./proj/cmake && mkdir build && cd build && cmake .. && make && cd ../../../"
alias cinderrun="{PATH-TO}/cinderRun.sh"
alias cinderclean="rm -rf ./proj/cmake/build"
```

Now we can build our app with ```cinderbuild``` and then either run ```cinderrun``` if you are working directly on the Jetson or ```extrun cinderrun``` if you are connecting through SSH. Also the build folder can be cleaned up with ```cinderclean```.
