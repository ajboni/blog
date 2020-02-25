---
title: Fix Genexus not copying resource files to Tomcat folder.
slug: fix-genexus-not-copying-resource-files-to-tomcat-folder
date_published: 2019-11-15T15:28:29.000Z
date_updated: 2019-11-15T15:28:29.000Z
tags: 
   - Genexus
---

We came across a strange bug where our application wouldn’t show any resources (images, fonts, etc).

We looked at the tomcat target folder and noticed that it was empty!

After a few blind rebuilds we came across a 0KB file in the environment target path directory called “LastTimeCopy”.

Apparently this file indicates Genexus to only copy files that were created (or modified?) after its modified date thus preventing transferring files over and over again.  

<!-- more -->

So, the fix to our problem was to just delete that file and surely enough the next rebuild transferred all of the assets.
![](/content/images/2019/11/image.png)The problematic file
