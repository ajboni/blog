---
title: Ubuntu - Configure Wake on LAN
slug: 2020-06-08-configuring-wake-on-lan
date_published: 2020-06-08
date_updated: 2020-06-08
tags:
  - Ubuntu
  - Linux
  - WoL
---

I tried to set up WoL on my Linux Mint box. But it wasn't working...

<!-- more -->

First I've checked that Wake on LAN was enabled in the motherboard.
Then I've found out that the driver did not have it enabled by default/

```bash
$ sudo ethtool enp7s0 | grep Wake
	Supports Wake-on: pumbg
	Wake-on: d
```

That `d` on Wake-on: means disabled. To enable:

```bash
$ sudo ethtool -s enp7s0 wol g
```

And it worked!!! The issue is that this setting is lost after reboot. The (Arch Wiki)[https://wiki.archlinux.org/index.php/Wake-on-LAN#Enable_WoL_on_the_network_adapter] to the rescue!

```bash
$ sudo nano /etc/systemd/system/wol@.service
```

Added this content:

```ini
[Unit]
Description=Wake-on-LAN for %i
Requires=network.target
After=network.target

[Service]
ExecStart=/sbin/ethtool -s %i wol g
Type=oneshot

[Install]
WantedBy=multi-user.target
```

And finally:

```bash
$ sudo systemctl enable wol@enp7s0
```

Now power off and it should work.

NOTE: It won't work after hard poweroff or energy loss.
