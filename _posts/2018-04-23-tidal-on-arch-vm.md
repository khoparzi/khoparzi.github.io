# Setting up a TidalCycles VM

I tried poking about with docker based SuperTidebox and variants for a long time but could never become comfortable with the emacs bindings. In the end I decided to setup a little plain and simple VM for myself.

Following instructions from [Installing arch on a Virtualbox vm]
(https://www.howtoforge.com/tutorial/install-arch-linux-on-virtualbox/)

The only change is that I used GPT

which requires additional steps in the form of

> Create a mebibyte partition (+1M with fdisk or gdisk) on the disk with no file system and with partition type GUID 21686148-6449-6E6F-744E-656564454649.

> Select partition type BIOS boot for cfdisk

from https://wiki.archlinux.org/index.php/GRUB

## Installing SC

sudo pacman -S supercollider sc3-plugins git

## Haskell install

http://nanxiao.me/en/set-up-haskell-development-environment-on-arch-linux/

sudo pacman -S cabal-install
