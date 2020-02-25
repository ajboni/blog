---
title: Fedora 30 - Fix  YouTube not playing HTML5 videos.
slug: fedora-30-fix-error-html5-youtube
date_published: 2019-08-10T17:19:00.000Z
date_updated: 2019-08-24T16:31:22.000Z
tags: 
   - Linux 
   - Fedora
---

After a clean install of Fedora 30 KDE Spin, youtube cannot play html5 content.

The fix is quite easy:
<!-- more -->
```shell
    sudo dnf install https://download1.rpmfusion.org/free/fedora/rpmfusion-free-release-$(rpm -E %fedora).noarch.rpm https://download1.rpmfusion.org/nonfree/fedora/rpmfusion-nonfree-release-$(rpm -E %fedora).noarch.rpm  
```

And then

```
   sudo dnf install ffmpeg-libs
```
    
Restart firefox and it all should work again.

Easy fix but I always forget about it.
