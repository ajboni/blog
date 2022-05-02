---
title: How to make Huion h950p work under linux.
slug: 2020-03-30-huion-h950p-linux-working
date_published: 2020-03-30
date_updated: 2020-03-30
tags:
  - Linux
  - Art
---

I recently acquired a Huion Tablet, precisely the model h950p.The tablet works fine out the box but the buttons don't get recognized.

Thanks to the wonderful [DIGImend](https://github.com/DIGImend/digimend-kernel-drivers project and [this](https://github.com/DIGImend/digimend-kernel-drivers/issues/308#issuecomment-586072412) issue on github the solution is quite simple.

<!-- more -->

- First, clone the github repo. (the .deb file do not work at the moment of this writing)

```bash
$ git clone https://github.com/DIGImend/digimend-kernel-drivers.git
```

- Follow the instructions [here](https://github.com/DIGImend/digimend-kernel-drivers#installing) for your distribution. I had to do the install from source procedure in order to make it work.
- Install `xsetwacom` to handle the button mappings.
- Draw!

### Handling multiple monitors.

If you have more than one monitor, it might be convenient to 'lock' the tablet cursor to a specific monitor. This way the drawing area corresponds more or less 1 to 1 to the screen.

To make this work the answer is again in the README of the repo:

```
Another example: if xrandr output has this line:

HDMI-3 connected 1440x900+0+0 (normal left inverted right x axis y axis) 408mm x 255mm

you can restrict the tablet input to that display like this:

xsetwacom set "HID 256c:006e Pen stylus" MapToOutput HDMI-3

```
