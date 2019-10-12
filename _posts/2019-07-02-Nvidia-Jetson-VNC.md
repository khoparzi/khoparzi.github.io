---
layout: post
title: Setting up vnc on the Nvidia Jetson Nano
tags: [nvidia, jetson, nano, embedded, vnc, remote management, linux]
---
Setting up vnc by fixing Vino

Follow along the guide by hackster io [from here](https://blog.hackster.io/getting-started-with-the-nvidia-jetson-nano-developer-kit-43aa7c298797)

> Enabling Desktop Sharing

> Unfortunately the instructions helpfully left on the Jetson’s desktop on how to enable the installed VNC server from the command line don’t work, and going ahead and opening the Settings application on the desktop and clicking on “Desktop Sharing” also fails as the Settings app silently crashes. A problem that appears to be down to an incompatibility with the older Gnome desktop.

> There are a number of ways you can approach this problem, the easiest route is a mix of command line and graphical fixes. The first thing you need to do is to edit the org.gnome.Vino schema to restore the missing enabled parameter.

We have to edit

```
$ sudo nano /usr/share/glib-2.0/schemas/org.gnome.Vino.gschema.xml
```

and add the following key

```
<key name='enabled' type='b'>
   <summary>Enable remote access to the desktop</summary>
   <description>
   If true, allows remote access to the desktop via the RFB
   protocol. Users on remote machines may then connect to the
   desktop using a VNC viewer.
   </description>
   <default>false</default>
</key>
```

Then compile the Gnome schemas with the glib-compile-schemas command.

```
$ sudo glib-compile-schemas /usr/share/glib-2.0/schemas
```

We can now safely use

```
$ gsettings set org.gnome.Vino enable true
$ gsettings set org.gnome.Vino require-encryption false
$ gsettings set org.gnome.Vino prompt-enabled false
```

And configure Desktop Sharing through the GUI as usual in Ubuntu

There are some more instructions coming up soon about setting up Openframeworks, cross compilation on OSX and a lot of other fun and useful things for creative coding.
