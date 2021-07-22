---
title: Using Citrix Workspaces in Linux
slug: 2021-07-23-using-citrix-worspace-in-linux
date_published: 2021-07-21
date_updated: 2021-07-21
tags:
  - Ubuntu
  - Linux
  - Citrix
---

Unfortunately The official debian package works really bad on my system (Linux Mint 20.2). The main issues is that performance is __horrible__ and Microsoft Teams can't access audio and camera for some reason. 

I was about to give up but the I reluctantly tried the [chrome extension](https://chrome.google.com/webstore/detail/citrix-workspace/haiffjcadagjlijoggckpgfnoeiflnem)

This works really well and performance is much better but comes with screen shared disabled by default in Microsoft Teams.

To fix it:

1. edit `/home/baj/.config/google-chrome/Default/Extensions/haiffjcadagjlijoggckpgfnoeiflnem/21.6.1.2_0/configuration.js` (note the version folder)
   
2. Locate `msTeamsOptimization` on line 131 and change `screenSharing` to true.
3. Relogin.