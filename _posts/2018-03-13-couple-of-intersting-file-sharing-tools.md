---
layout: post
published: true
title: Couple of intersting file sharing tools
tags:
  - file sharing - tools - productivity - zeroconf - workflow
---
## Why bother with another file sharing tool?

These seem like a great idea when you are sending a one off file to someone when you don't want to use a service like dropbox or wetransfer. zget even works on the local network, for when you don't want to configure smb servers and airdrop is refusing to work between laptops (which it often does).

### [Magic wormhole](https://github.com/warner/magic-wormhole)

From their own [docs](magic-wormhole.readthedocs.io) - 
> This package provides a library and a command-line tool named wormhole, which makes it possible to get arbitrary-sized files and directories (or short pieces of text) from one computer to another. The two endpoints are identified by using identical "wormhole codes": in general, the sending machine generates and displays the code, which must then be typed into the receiving machine.

> The codes are short and human-pronounceable, using a phonetically-distinct wordlist. The receiving side offers tab-completion on the codewords, so usually only a few characters must be typed. Wormhole codes are single-use and do not need to be memorized.

Installation on osx is ultra simple with homebrew

	brew install magic-wormhole
    
If you use a pretty linux distro like Elementary OS, just go to the App Center and download a well made gui based app called Transporter. Developer bleak_grey has made it dead simple to use.

Wonder if I can find something similar for OSX.

### [Zget](https://github.com/nils-werner/zget)

> A simple, Zeroconf-based, peer to peer file transfer utility, for situations where you and your peer are sitting next to each other and want to transfer a file quickly (and can shout the filename across the room).

Installation for this one seems a bit more involved (dealing with pip is not for the faint of heart if you are not a python dev). The payoff is that it works with Zeroconf (basically you don't have to bother with ips and hostnames and such).

To install

	$ pip install zget
    
To share some pictures do:

	$ zput my_holiday_pictures.zip

The person you are sharing to will then do

	$ zget my_holiday_pictures.zip