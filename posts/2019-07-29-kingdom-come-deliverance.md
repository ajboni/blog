---
title: "Kingdom Come: Deliverance working on Linux @ 60FPS"
slug: kingdom-come-deliverance
date_published: 2019-07-29T14:34:33.000Z
date_updated: 2019-08-10T20:01:47.000Z
tags: 
   - linux
   - gaming
   - proton
---

I recently impulse bought [Kingdom Come: Deliverance](https://store.steampowered.com/app/379430/Kingdom_Come_Deliverance/) in hope that proton would handle it out of the box. I quickly discovered that performance was really bad and a lot of users were having the same issue.

However I managed to get it working thanks to some anonymous user on ProtonDB. I’ve only tried on OpenSUSE so YMMV.

<!-- more -->

### Instructions

1. Install Game as usual
2. Copy all dll files from game folderBin/Win64Shared to Bin/Win64

(NEXTS STEPS ARE PROBABLY NOT NEEDED AFTER PROTON 4.11-2)

1. Download and install [proton-ge-custom](https://github.com/GloriousEggroll/proton-ge-custom/releases) according to instructions
2. Open ~/.steam/root/
3. Create compatibilitytools.d folder
4. Extract archive to ~/.steam/root/compatibilitytools.d/.
5. Close and re-open steam
6. Right click the game and click Properties
7. At the bottom of the General tab, check "Force the use of a specific Steam Play compatibility tool.
8. Then select Proton-4.11-GE-1 from the drop down and click CLOSE.

After these steps my game is running really smooth @ 60fps on medium/high quality.
![](/content/images/2019/07/Screenshot_20190729_225310.png)The machine specs
## Fixing DPMS and Screen Saver Issues

I encountered one problem though, after a few minutes playing with a 360 controller, the screen would go black and I needed to press a key to resume it, alt-tab it and the go back, all this every 15 minutes.

The fix is fairly simple thanks to [this comment](https://github.com/ValveSoftware/Proton/issues/287#issuecomment-426535764) on valve github issues.

### Enter [Joystickwake](https://github.com/foresto/joystickwake)

According to the project’s description: “Linux gamers often find themselves unexpectedly staring at a blank screen, because their display server fails to recognize game controllers as input devices and allows the screen blanker to activate during gameplay. This program attempts to work around the problem by periodically delaying screen blankers when it detects joystick activity.”

Unfortunatelly there is no package for OpenSUSE yet so I just run the bin before launching the game.

```shell
    cd joystickwake
    ./joystickwake
```    

![](/content/images/2019/07/Screenshot_20190729_230235.png)Now go and get some ale!
Happy gaming!
