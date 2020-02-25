---
title: Fedora 30 - Connect to ISCSI target (tgt)
slug: fedora-30-connect-to-iscsi-resource
date_published: 2019-08-10T18:17:58.000Z
date_updated: 2019-08-10T18:17:58.000Z
tags: 
   - Fedora
   - Linux
   - ISCSI
---
How to connect to iscsi resource in Fedora (or any other distro)
<!-- more -->
## Installation

Just in case, install initiator (it comes preinstalled)
```shell
$ sudo dnf install -y iscsi-initiator-utils
```

### (Optional) Add it on the server:

If your target requires to add initiator name get it with:

(On the client)

```shell
$ sudo cat /etc/iscsi/initiatorname.iscsi
InitiatorName=iqn.1994-05.com.redhat:af54e632d6e
```

And add it to the target.

```shell
(On the server)
$ nano /etc/tgt/conf.d/target01.conf

<target iqn.2019-04.baj.home:dlp.target01>
	# provided devicce as a iSCSI target
	backing-store /media/hdd1/iscsi/lun0.img
	# iSCSI Initiator's IQN you allow to connect to this Target
	InitiatorName=iqn.1994-05.com.redhat:af54e632d6e
</target>
```

Restart service

```shell
(On the server)
$ sudo service tgt restart
```

## Find the target
```shell
$ sudo iscsiadm -m discovery -t st -p 192.168.0.110
192.168.0.110:3260,1 iqn.2019-04.baj.home:dlp.target01
```

## Connect to the target
```shell
$ sudo iscsiadm -m node \
		--targetname iqn.2019-04.baj.home:dlp.target01 \
		-p 192.168.0.110:3260 -l
		
Logging in to [iface: default, target: iqn.2019-04.baj.home:dlp.target01, portal: 192.168.0.110,3260] (multiple)
Login to [iface: default, target: iqn.2019-04.baj.home:dlp.target01, portal: 192.168.0.110,3260] successful.
```
    

## Check partitions:
```shell
$ lsblk
NAME                            MAJ:MIN RM   SIZE RO TYPE MOUNTPOINT
sda                               8:0    0 111.8G  0 disk 
├─sda1                            8:1    0    16M  0 part 
└─sda2                            8:2    0 111.8G  0 part 
sdb                               8:16   0 931.5G  0 disk 
├─sdb1                            8:17   0   128M  0 part 
├─sdb2                            8:18   0 443.1G  0 part 
├─sdb3                            8:19   0   293G  0 part 
└─sdb4                            8:20   0 195.3G  0 part 
sdc                               8:32   0 232.9G  0 disk 
├─sdc1                            8:33   0   200M  0 part /boot/efi
├─sdc2                            8:34   0     1G  0 part /boot
└─sdc3                            8:35   0 231.7G  0 part 
	├─fedora_localhost--live-root 253:0    0    70G  0 lvm  /
	├─fedora_localhost--live-swap 253:1    0   7.9G  0 lvm  [SWAP]
	└─fedora_localhost--live-home 253:2    0 153.8G  0 lvm  /home
sdd                               8:48   1   7.2G  0 disk 
├─sdd1                            8:49   1   1.8G  0 part 
├─sdd2                            8:50   1   9.8M  0 part 
└─sdd3                            8:51   1  20.5M  0 part 
---- ISCSI Partitions ----
sde                               8:64   0   500G  0 disk   
├─sde1                            8:65   0    16M  0 part 
└─sde2                            8:66   0   500G  0 part 
```

## Automount it with fstab

Instead of using partition name, we will map it with UUID

Find the UUID with the partition name

```shell
$ cd -f | grep sde
sde                                                                       ├─sde1                                                                   
└─sde2         ntfs        STEAM     C2F4FFA0F4FF953F --> UUID
```

Make folder to mount

```shell
$ sudo mkdir /mnt/iscsi
```

Edit /etc/fstab

```shell
$ sudo nano /etc/fstab
```

Add this line to the bottom:

```
UUID=C2F4FFA0F4FF953F /mnt/iscsi  ntfs  _netdev,uid=1000,gid=100 0  0
```
    

Reboot and it should be mounted!
