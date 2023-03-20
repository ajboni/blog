---
title: No devices Fix in MS Teams in Citrix Workspace APP 
slug: 2022-02-15-no-devices-fix-in-ms-teams-in-citrix-workspace-app

date_published: 2022-02-15
date_updated: 2022-02-15
tags:
  - Ubuntu
  - Linux
  - Citrix
---

Citrix Workspace App for Linux now works great on ubuntu 20.04. The only issue I was having was that the app was not able to detect the audio devices connected to the computer.
<!-- more -->

The strange bit is that the audio devices are not detected by the app but they work just fine in the rest of the system.

On further inspection we notice that MS Teams do not show as HDX Optimized status in MS Teams-> About-Version. 

The answer is [in the docs](https://docs.citrix.com/en-us/citrix-workspace-app-for-linux/configure-xenapp.html):

```
# Get  ubuntu base version (I'm on Mint)
$ cat /etc/upstream-release/

   DISTRIB_ID=Ubuntu
   DISTRIB_RELEASE=20.04
   DISTRIB_CODENAME=focal
   DISTRIB_DESCRIPTION="Ubuntu Focal Fossa"
  
$ curl -fsSL https://apt.llvm.org/llvm-snapshot.gpg.key | sudo apt-key add 
$ sudo add-apt-repository "deb http://apt.llvm.org/focal/ llvm-toolchain-focal-12 main"
$ sudo apt-get update
$ sudo apt-get install libc++1-12 libunwind-12  
```

After that, relaunch session and everything works ! Except for clipboard (someday I'll find the issue!)