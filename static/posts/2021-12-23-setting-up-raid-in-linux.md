---
title: Setting up RAID In Linux
slug: 2021-07-23-using-citrix-worspace-in-linux
date_published: 2021-12-23
date_updated: 2021-12-23
tags:
  - Ubuntu
  - Linux
  - Raid
---

I had two 120gb drives, unfortunately, some games are bigger than that and will run much better on a local disk rather than via the ISCSI target. So even with the second drive I was running out of space. RAID to the rescue!
<!-- more -->
There are a lot of information available online about RAID, but essentially we will be building a RAID 0, which will unify the two drives into a bigger 240gb drive. This will mean, of course, that no data integrity will be guaranteed, and in case of any disk failure, the entire data (240gb) will be lost.

## Hardware RAID ?
Let's start by checking if our motherboard supports hardware RAID.

### Find out motherboard model.

```
$ sudo dmidecode -t2

# dmidecode 3.2
Getting SMBIOS data from sysfs.
SMBIOS 3.1.1 present.

Handle 0x0002, DMI type 2, 15 bytes
Base Board Information
	Manufacturer: ASUSTeK COMPUTER INC.
	Product Name: PRIME B450M-A
	Version: Rev X.0x
	Serial Number: 180731568108548
	Asset Tag: Default string
	Features:
		Board is a hosting board
		Board is replaceable
	Location In Chassis: Default string
	Chassis Handle: 0x0003
	Type: Motherboard
	Contained Object Handles: 0

```

### Check specs for Hardware RAID support:
```
$ lynx https://www.asus.com/us/Motherboards-Components/Motherboards/PRIME/PRIME-B450M-A/techspec/ -dump | grep -C 2 Raid

   AMD B450 chipset :
   4 x SATA 6Gb/s port(s),
   Support Raid 0, 1, 10
   ...
```

Onboard hardware RAID! ...wait a minute... no, it's not hardware RAID nor its not fully compatible with linux. It's whats ofter referred as "fake RAID"

## Software RAID
We will use `mdadm` to create a RAID 0.


### Find disks

```
lsblk -o NAME,SIZE,FSTYPE,TYPE,MOUNTPOINT

(...omitted)
sdb    111,8G          disk 
sdc    111,8G          disk 
(...omitted)
```

### Create the Array

```
$ sudo apt install mdadm
$ sudo mdadm --create --verbose /dev/md0 --level=0 --raid-devices=2 /dev/sdb /dev/sdc

mdadm: chunk size defaults to 512K
mdadm: partition table exists on /dev/sdb
mdadm: partition table exists on /dev/sdb but will be lost or
       meaningless after creating array
mdadm: partition table exists on /dev/sdc
mdadm: partition table exists on /dev/sdc but will be lost or
       meaningless after creating array
Continue creating array? y
mdadm: Defaulting to version 1.2 metadata
mdadm: array /dev/md0 started.

```

### Verify
```
$cat /proc mdstat

Personalities : [raid0] 
md0 : active raid0 sdc[1] sdb[0]
    234307584 blocks super 1.2 512k chunks

unused devices: <none>

```

### Format and Automount
``` 
$ sudo mkfs.ext4 -F /dev/md0
$ sudo mdadm --detail --scan | sudo tee -a /etc/mdadm/mdadm.conf
$ sudo update-initramfs -u
$ mkdir /media/baj0/md0
$ echo '/dev/md0 /media/baj/md0 ext4 defaults,nofail,discard 0 0' | sudo tee -a /etc/fstab

