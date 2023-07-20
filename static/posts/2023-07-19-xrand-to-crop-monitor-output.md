---
title: Using xrandr to crop monitor output
slug: 2023-07-19-xrandr-to-crop-monitor-output
date_published: 2023-07-19
date_updated: 2023-07-19
tags:
  - Linux
  - Steam Deck
---

I broke my shiny new Steam Deck display, it now has 160 pixels from the left which are unusable.
The idea is to create a padding around that space which should be ignored by the OS and use all the remaining space.
Spent a lot of time trying to make `xrandr` work as expected, and the only way to make it work properly was to create a dummy mode and then go back to the original with paddings and transformations.

<!-- more -->

This only works in desktop mode for now.
I know this make no sense but works for me. For some reason if I dont go to another mode in the middle, the transforms are not applied.

```sh
xrandr --newmode SMOL 73.25 1120 1184 1296 1472 800 803 813 831 -hsync +vsync
xrandr --addmode eDP SMOL
sleep 2
xrandr --fb 1120x800 --output eDP --mode 800x1280 --transform 1,0,-160,0,1,0,0,0,1 --panning 1120x800 --fb 1120x800
sleep 2
xrandr --output eDP --fb 1120x800 --panning 1120x800 --mode SMOL
sleep 2
xrandr --output eDP --mode 800x1280
```

## Resources:

- https://unix.stackexchange.com/questions/229643/trim-monitor-output-because-of-dead-pixels
- https://superuser.com/questions/1435053/how-to-use-xrandr-to-crop-part-of-my-monitor
