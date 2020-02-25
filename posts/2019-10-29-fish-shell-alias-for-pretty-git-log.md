---
title: "Fish Shell: Abbreviation for '	pretty' git log"
slug: fish-shell-alias-for-pretty-git-log
date_published: 2019-10-29T12:30:14.000Z
date_updated: 2019-10-29T12:30:14.000Z
tags: 
   - Linux
   - Fish
---

[Fish shell](http://fishshell.com/) is awesome! Unfortunately alias need a little bit of rewrite to work via the UI.I was trying to add this alias but it failed to save in fish-config web.

<!-- more -->
```shell
$ git log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit
``` 

The error I was getting via console:

```shell
$ git log --graph --pretty=format:%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset --abbrev-commit                                                             Tue 29 Oct 2019 09:23:40 AM -03
yellow: command not found
in command substitution
called on standard input

Command '%cr' not found, did you mean:

command 'acr' from deb acr
command 'ccr' from deb codecrypt

Try: sudo apt install <deb name>

in command substitution
called on standard input


Command 'bold' not found, did you mean:

command 'bld' from deb bld
command 'gold' from deb binutils
command 'fold' from deb coreutils

Try: sudo apt install <deb name>

in command substitution
called on standard input

An error occurred while redirecting file '%an'
open: No such file or directory
```
    

The solution seems to be enclosing the command into double quotes

```shell
$ abbr --add gl "git log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
```


On the web-ui of fish-config it will translate to:
![](/content/images/2019/10/image.png)
